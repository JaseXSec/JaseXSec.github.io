---
layout: post
title: I Audited Security Headers on Real Websites with HeaderHawk — Here's What I Found
date: 2025-05-28
categories:
  - project
tags:
  - cybersecurity
  - tool
  - automation
  - python
  - security-assessment
excerpt: A Python CLI tool for analyzing HTTP security headers across multiple URLs.
---
Security headers are one of the easiest ways to harden a web application against common attacks like XSS, clickjacking, and data leakage. But how well are they actually used in the real world?

When in the process of building my own website, I got really curious in finding out. Thus, a Python CLI tool called **HeaderHawk** was created. This tool scans websites for key HTTP security headers, which I then used on 10 popular websites — from news media to tech giants — and uncovered some surprising results.


**HeaderHawk** is a command-line tool that checks four key security headers on any website:

- **Content-Security-Policy** — helps block malicious scripts

- **X-Frame-Options** — prevents the site from being embedded by attackers

- **Strict-Transport-Security** — ensures connections are always secure (HTTPS)

- **Referrer-Policy** — controls how much data your browser shares when clicking links

It accepts up to 20 URLs, displays the results in a table, and can export them to a CSV file. You can run it interactively or from the command line.

![Image Description]({{ '/assets/images/header-hawk/Pasted image 20250528204455.png' | relative_url }})

I scanned 9 popular web apps and tools using **HeaderHawk** — these aren't banks or government sites, but tools many people use every day, like Notion, Medium, and Trello. These sites were selected by none other than ChatGPT, so if you don't like it, take it up with the AI gods.
![Image Description]({{ '/assets/images/header-hawk/Pasted image 20250528204815.png' | relative_url }})
### Here’s what surprised me:

| Website        | Content-Security-Policy | X-Frame-Options | HSTS                  | Referrer-Policy |
| -------------- | ----------------------- | --------------- | --------------------- | --------------- |
| notion.so      | Missing                 | Missing         | Present               | Missing         |
| intercom.com   | Missing                 | Missing         | Present               | Missing         |
| calendly.com   | Missing                 | Missing         | Missing               | Missing         |
| techcrunch.com | Partial CSP             | SAMEORIGIN      | Very short lifespan   | Present (basic) |
| replit.com     | Missing                 | Missing         | Present               | Missing         |
| stackshare.io  | Missing                 | SAMEORIGIN      | HSTS with `max-age=0` | Good            |
| npmjs.com      | Limited CSP             | DENY            | Present               | Missing         |
| medium.com     | Frame restriction only  | Missing         | Present               | Missing         |
| trello.com     | Missing                 | SAMEORIGIN      | Present               | Good            |
|                |                         |                 |                       |                 |
![Image Description]({{ '/assets/images/header-hawk/Pasted image 20250528204908.png' | relative_url }})
doesn't that cli tool just look so good? 😉


#### So... What does this even mean?

- **Only 1 out of 9** had _all_ 4 security headers configured reasonably well.

- **Calendly** had **none** of the recommended headers at all.

- **Many headers were partially implemented**, but not enough to be protective.

- Even security-sensitive sites like **npmjs.com** and **Intercom** were missing key protections like `Referrer-Policy` or `Content-Security-Policy`.


In layman's terms, **most sites do not use all the tools available to protect you**.
- Headers like `Content-Security-Policy` help prevent malicious scripts from running — but many sites skip them entirely.

- `Referrer-Policy` can stop your browser from leaking private URLs — but again, it's often missing.

- Some sites are secure in some ways (like HTTPS enforcement) but lack other protections.

### Why this is so uber-duber important!
These headers are **simple configuration settings** that websites can add to improve security. They're not fancy, but they can stop serious problems like:

- **Clickjacking** — when a site is tricked into loading inside another, hidden page

- **Cross-site scripting (XSS)** — when attackers inject scripts that run in your browser

- **Accidental data leaks** — like sharing private URLs through the referrer


Yet most of the web isn’t using them properly.



# Your Turn!!

Want to try it yourself? [HeaderHawk](https://github.com/JaseXSec/HeaderHawk) is open source and easy to run. Scan your favorite sites, your own projects, or even company web apps. You might be surprised what’s missing.



---

**Tags:** #cybersecurity #tool #automation #python
