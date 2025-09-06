# 🚀 Quick Reference Card
## Obsidian → Jekyll Workflow

## **1. Create New Post**
1. Open `01-Drafts/` folder
2. Create new note (Ctrl+N)
3. Copy template from `00-Templates/`
4. Rename with descriptive title

## **2. Add Images**
- Drag & drop into note
- Use syntax: `![[image-name.png]]`
- Add caption: `![[image.png]]` *Figure 1: Caption*

## **3. Write Content**
- Use headings (H2, H3)
- Add code blocks with language
- Include front matter at top
- Add tags and categories

## **4. Convert for Jekyll**
- Replace `![[image.png]]` with:
  `![Alt text]({{ '/assets/images/folder/image.png' | relative_url }})`
- Update front matter:
  - `{{title}}` → actual title
  - `{{date:YYYY-MM-DD}}` → actual date

## **5. Publish**
- Copy markdown to `_posts/YYYY-MM-DD-title.md`
- Copy images to `assets/images/folder/`
- Test with Jekyll locally

## **6. Archive**
- Move to `02-Published/`
- Keep images in `03-Assets/`

---

## **Common Image Syntax**
```markdown
# Obsidian
![[screenshot1.png]]
*Figure 1: Attack flow diagram*

# Jekyll
![Attack Flow]({{ '/assets/images/post-folder/screenshot1.png' | relative_url }})
*Figure 1: Attack flow diagram*
```

## **Front Matter Template**
```yaml
---
layout: post
title: "Your Title Here"
date: 2025-09-06
categories: [blog]
tags: [cybersecurity, research, tutorial]
excerpt: "Brief description"
---
```

## **File Naming**
- **Drafts:** `draft-title.md`
- **Published:** `YYYY-MM-DD-title.md`
- **Images:** `descriptive-name.png`

---

**Need help? Check the full README.md file!** 📚
