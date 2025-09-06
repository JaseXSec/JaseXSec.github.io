# 📝 Content Creation Guide
## Complete Guide for Adding New Blog Posts & Project Write-ups

This guide covers everything you need to know to create and publish content on your cybersecurity portfolio website.

## 🚀 Quick Start (3 Steps)

1. **Write in Obsidian** - Create your post in `obsidian-vault/01-Drafts/`
2. **Convert & Copy** - Run `simple-convert.bat` and copy the output to `_posts/`
3. **Add Images** - Copy images to `assets/images/your-post-name/`

## 📋 Detailed Workflow

### **Step 1: Create Your Post in Obsidian**

1. **Create new note** in `obsidian-vault/01-Drafts/`
2. **Name it:** `YYYY-MM-DD-Your-Post-Title.md`
3. **Add front matter** at the top:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
categories: [blog]  # or [project]
tags: [tag1, tag2, tag3]
excerpt: "Brief description of your post"
---
```

4. **Write your content** using `![[image.png]]` for images
5. **Save the file**

### **Step 2: Convert to Jekyll Format**

1. **Run** `simple-convert.bat`
2. **Enter** the path to your `.md` file
3. **Enter** a folder name for images (e.g., `my-post`)
4. **Copy** the generated `-jekyll.md` file to `_posts/`

### **Step 3: Add Images**

1. **Create folder:** `assets/images/your-post-name/`
2. **Copy all images** from your Obsidian vault to this folder
3. **Images will display automatically** with the converted syntax

## 🎨 Front Matter Templates

### **Blog Post Template:**
```yaml
---
layout: post
title: "Your Blog Title"
date: 2025-01-15
categories: [blog]
tags: [cybersecurity, research, tutorial]
excerpt: "Brief description of your blog post"
---
```

### **Project Write-up Template:**
```yaml
---
layout: post
title: "Your Project Title"
date: 2025-01-15
categories: [project]
tags: [cybersecurity, project, analysis]
excerpt: "Brief description of your project"
---
```

## 📝 Code Block Formatting

Use triple backticks with language names for syntax highlighting:

````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

Supported languages: `python`, `javascript`, `bash`, `json`, `yaml`, `html`, `css`, `sql`, and many more!

## 🖼️ Image Handling

### **In Obsidian:**
```markdown
![[image-name.png]]
![[image.png]] *Figure 1: Caption*
```

### **After Conversion:**
```markdown
![Image Description]({% raw %}{{ '/assets/images/your-post-name/image-name.png' | relative_url }}{% endraw %})
![Figure 1: Caption]({% raw %}{{ '/assets/images/your-post-name/image.png' | relative_url }}{% endraw %}) *Figure 1: Caption*
```

## 🔧 Manual Conversion (If Script Fails)

If the conversion script doesn't work:

1. **Copy** your `.md` file to `_posts/YYYY-MM-DD-title.md`
2. **Create folder** `assets/images/your-post-name/`
3. **Copy images** to that folder
4. **Find & Replace** in your markdown:
   - Find: `![[`
   - Replace: `![Image Description]({% raw %}{{ '/assets/images/your-post-name/{% endraw %}`
   - Find: `]]`
   - Replace: `{% raw %}' | relative_url }}{% endraw %})`

## ✅ Final Checklist

- [ ] Post copied to `_posts/` with proper naming
- [ ] Image folder created in `assets/images/`
- [ ] All images copied to the folder
- [ ] Image syntax converted in markdown
- [ ] Front matter is correct
- [ ] Test the post on your website

## 🚀 Publishing

1. **Start your website:** `.\start-website.bat`
2. **Visit:** `http://127.0.0.1:4000/`
3. **Check:** Your new post appears on "Projects & Blogs" page
4. **Verify:** Images display correctly

## 📁 File Structure

```
Portfolio website/
├── _posts/                    # Your published posts
├── assets/images/            # All post images
│   └── your-post-name/       # Images for specific posts
├── obsidian-vault/           # Your writing workspace
│   ├── 01-Drafts/           # Work in progress
│   ├── 02-Published/        # Completed posts
│   └── 03-Assets/           # Image assets
└── simple-convert.bat        # Conversion script
```

## 🆘 Troubleshooting

**Images not displaying?**
- Check the image folder exists in `assets/images/`
- Verify the image syntax uses `{% raw %}{{ '/assets/images/...' | relative_url }}{% endraw %}`

**Code blocks not highlighting?**
- Make sure you're using triple backticks with language names
- Check the language is supported (see list above)

**Post not appearing?**
- Verify the filename follows `YYYY-MM-DD-title.md` format
- Check the front matter is correct
- Restart the Jekyll server

## 🎯 That's It!

Your content creation workflow is now streamlined and simple. Write in Obsidian, convert with one click, and publish to your professional cybersecurity portfolio!
