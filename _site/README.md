# 🛡️ Jase Jourdain - Cybersecurity Portfolio

A professional cybersecurity portfolio website built with Jekyll, featuring a terminal-inspired design and streamlined content management workflow.

## 🚀 Quick Start

### **Local Development:**
1. **Start the website:**
   ```bash
   .\start-website.bat
   ```

2. **Visit:** `http://127.0.0.1:4000/`

### **Deploy to GitHub Pages:**
1. **Run setup script:**
   ```bash
   .\setup-github.bat
   ```

2. **Follow the prompts** to create GitHub repository and deploy

## 📝 Adding New Content

See **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)** for complete instructions on creating blog posts and project write-ups.

### Quick Workflow:
1. Write in Obsidian (`obsidian-vault/01-Drafts/`)
2. Run `simple-convert.bat` to convert
3. Copy to `_posts/` and add images to `assets/images/`

## 🏗️ Project Structure

```
Portfolio website/
├── _posts/                    # Published blog posts & projects
├── _layouts/                  # Jekyll page templates
├── assets/                    # CSS, JS, and images
├── obsidian-vault/           # Writing workspace
├── simple-convert.bat         # Content conversion script
└── start-website.bat         # Development server
```

## 🎨 Features

- **Terminal-inspired design** with dark theme
- **Syntax highlighting** for code blocks with language labels
- **Responsive layout** for all devices
- **Streamlined workflow** from Obsidian to Jekyll
- **Professional navigation** and filtering
- **SEO optimized** with proper meta tags

## 🛠️ Technical Stack

- **Jekyll** - Static site generator
- **Rouge** - Syntax highlighting
- **SCSS** - CSS preprocessing
- **Liquid** - Templating
- **Obsidian** - Content creation

## 📋 Content Types

- **Blog Posts** - Cybersecurity insights and research
- **Project Write-ups** - Technical projects and analysis
- **Code Snippets** - With syntax highlighting and language labels
- **Images** - Organized by post with automatic conversion

## 🔧 Development

- **Local server:** `.\start-website.bat`
- **Build site:** `bundle exec jekyll build`
- **Serve locally:** `bundle exec jekyll serve`

## 📚 Documentation

- **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)** - Complete content creation guide
- **[GITHUB-PAGES-DEPLOYMENT.md](GITHUB-PAGES-DEPLOYMENT.md)** - Deploy to GitHub Pages
- **[obsidian-vault/README.md](obsidian-vault/README.md)** - Writing workspace guide

## 🎯 License

© 2025 Jase Jourdain - Cybersecurity Portfolio. All rights reserved.