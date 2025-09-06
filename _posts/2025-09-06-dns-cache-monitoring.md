---
layout: post
title: "Monitoring DNS Cache with VirusTotal – Windows VM Threat Watch"
date: 2025-09-06 00:00:00 -0000
categories: [project]
tags: [cybersecurity, research, tutorial, analysis, malware, forensics, network-security, incident-response]
excerpt: "A lightweight monitoring tool that periodically scans a Windows workstation's DNS cache, extracts domains/IPs, checks them against VirusTotal, and alerts/logs on suspicious findings."
---

A lightweight monitoring tool that periodically scans a Windows workstation's DNS cache, extracts domains/IPs, checks them against VirusTotal, and alerts/logs on suspicious findings. I built it to add a simple, host-level tripwire for malware/phishing activity in home-lab and small-biz environments.

## Key Features

1. **DNS Cache Collection**: Periodically collects DNS cache entries using the `ipconfig /displaydns` command on a Windows workstation.
2. **Malicious IP/Domain Detection**: Integrates with the VirusTotal API to check cached IPs and domains against a vast database of known malicious entities.
3. **Automated Alerts**: Sends real-time alerts via email (or other notification systems) when a malicious entry is detected.
4. **Logging and Reporting**: Maintains a log file for all DNS cache scans, including details of detected threats, for future analysis and auditing.
5. **Task Automation**: Uses Windows Task Scheduler to run the monitoring script at regular intervals, ensuring continuous protection.

## Technologies Used

- **Python**: For automating DNS cache extraction, API integration, and alert generation.
- **VirusTotal API**: To verify IP addresses and domains against a database of known malicious entities.
- **Windows Task Scheduler**: To automate periodic script execution.
- **Proxmox**: Hosting the Windows VM for running the monitoring system.

## Project Workflow

1. **Data Collection**: The script runs the `ipconfig /displaydns` command to extract DNS cache entries from the Windows system.
2. **Data Parsing**: Parses the output to extract relevant IP addresses and domain names.
3. **Threat Analysis**: Queries each IP/domain through the VirusTotal API to check for malicious activity.
4. **Alert Mechanism**: If a malicious entity is detected, an alert is triggered via email or logged for review.
5. **Continuous Monitoring**: Automates the process with Task Scheduler to ensure regular scans.

## Use Cases

- **Network Security**: Helps identify potential cyber threats at the DNS level within a local network.
- **Cybersecurity Research**: Assists researchers in monitoring and analyzing DNS activity.
- **Personal or Small Business Protection**: Provides an additional layer of defense for individuals or small organizations against cyber threats.

This project demonstrates practical skills in cybersecurity, Python scripting, API integration, and automation. It can be expanded with additional features such as Slack/Telegram notifications, data visualization dashboards, or integration with SIEM systems for enterprise-level monitoring.

## Let's dig in, shall we?

Our first step in this project is creating a windows VM that will act as our DNS catcher. This can be done in many ways, but for my case we will be using a VM within my Proxmox cluster I have set up on my local network. Feel free to use any hypervisor you have available to you.

![VM Resource Allocation]({{ '/assets/images/dns-cache-monitoring/Pasted image 20250208133932.png' | relative_url }})
*Figure 1: VM resource allocation showing minimal requirements*

As you can see, this VM does not have to be heavily resourced.

Next, let get python installed on our VM,

![Python Installation]({{ '/assets/images/dns-cache-monitoring/Pasted image 20250208135950.png' | relative_url }})
*Figure 2: Installing Python on the Windows VM*

Once python is installed, let get any required dependencies installed as well. In this project, we need to install the requests dependency. this can be done with `pip install requests`

![Installing Dependencies]({{ '/assets/images/dns-cache-monitoring/Pasted image 20250208140650.png' | relative_url }})
*Figure 3: Installing the requests dependency*

Next we need to create a script in python for extracting DNS cache using `ipconfig /displaydns`

```python
import subprocess

def get_dns_cache():
    result = subprocess.run(["ipconfig", "/displaydns"], capture_output=True, text=True, shell=True)
    return result.stdout

def parse_dns_cache(dns_data):
    entries = []
    current_entry = {}

    for line in dns_data.splitlines():
        if "Record Name" in line:
            current_entry["record_name"] = line.split(":")[1].strip()
        elif "Record Type" in line:
            current_entry["record_type"] = line.split(":")[1].strip()
        elif "Time To Live" in line:
            current_entry["ttl"] = line.split(":")[1].strip()
        elif "Data" in line:
            current_entry["data"] = line.split(":")[1].strip()
        if current_entry.get("record_name") and current_entry.get("data"):
            entries.append(current_entry)
            current_entry = {}
    
    return entries

# Test the DNS cache extraction
dns_data = get_dns_cache()
dns_entries = parse_dns_cache(dns_data)

for entry in dns_entries:
    print(entry)
```

What does this code do?
- Fetches cache using the `ipconfig /displaydns` command
- Parses the data to extract IP addresses or domains for analysis

Next we want to create a script for the VirusTotal API integration:

```python
import requests

VIRUSTOTAL_API_KEY = "your_virustotal_api_key"
VIRUSTOTAL_BASE_URL = "https://www.virustotal.com/api/v3"

def check_ip_virustotal(ip_address):
    url = f"{VIRUSTOTAL_BASE_URL}/ip_addresses/{ip_address}"
    headers = {
        "x-apikey": VIRUSTOTAL_API_KEY
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return None

# Test the VirusTotal API with an example IP
result = check_ip_virustotal("8.8.8.8")  # Replace with a real IP from your DNS cache
if result:
    print(result)
```