# 🚀 GitHub Pages Deployment Guide
## Deploy Your Jekyll Portfolio to GitHub Pages

This guide will walk you through deploying your Jekyll portfolio to GitHub Pages with automatic deployment and custom domain support.

## 🎯 Why GitHub Pages?

- **✅ FREE hosting** - No monthly costs
- **✅ Automatic deployment** - Push code, site updates automatically
- **✅ Built for Jekyll** - Native support, no manual building
- **✅ Custom domains** - Easy to connect your domain
- **✅ SSL certificates** - Automatic HTTPS
- **✅ CDN** - Fast loading worldwide
- **✅ Version control** - Track all changes
- **✅ No server management** - GitHub handles everything

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Git installed on your computer
- ✅ Your domain name (optional, but recommended)

## 🏗️ Step 1: Create GitHub Repository

### **Create New Repository:**
1. **Go to GitHub.com** and sign in
2. **Click "New repository"** (green button)
3. **Repository name:** `yourusername.github.io` (replace with your GitHub username)
4. **Description:** "Cybersecurity Portfolio Website"
5. **Set to Public** (required for free GitHub Pages)
6. **Don't initialize** with README (we'll upload our files)
7. **Click "Create repository"**

### **Important:** The repository name must be `yourusername.github.io` for GitHub Pages to work automatically.

## 📁 Step 2: Upload Your Code

### **Method A: Using GitHub Desktop (Easiest)**

1. **Download GitHub Desktop** from desktop.github.com
2. **Clone your repository** to your computer
3. **Copy all files** from your Jekyll project to the cloned folder
4. **Commit and push** your changes

### **Method B: Using Git Command Line**

1. **Open terminal** in your project directory
2. **Initialize git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Jekyll portfolio"
   ```

3. **Add remote repository:**
   ```bash
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   ```

4. **Push to GitHub:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

## ⚙️ Step 3: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** section
4. **Source:** Select "GitHub Actions"
5. **Save** the settings

## 🔧 Step 4: Configure Custom Domain (Optional)

### **If you have a custom domain:**

1. **In your repository Settings > Pages:**
   - **Custom domain:** Enter your domain (e.g., `yourdomain.com`)
   - **Enforce HTTPS:** Check this box
   - **Save**

2. **Update your DNS settings** with your domain provider:
   - **A records:** Point to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME record:** `www` → `yourusername.github.io`

3. **Update `_config.yml`:**
   ```yaml
   url: "https://yourdomain.com"  # Replace with your actual domain
   ```

## 🚀 Step 5: Automatic Deployment

### **Your site will automatically deploy when:**
- You push changes to the `main` branch
- GitHub Actions builds and deploys your site
- Usually takes 2-5 minutes to go live

### **Check deployment status:**
1. **Go to "Actions" tab** in your repository
2. **See deployment progress** and any errors
3. **Green checkmark** = successful deployment

## 📝 Step 6: Update Your Workflow

### **For Future Updates:**

1. **Make changes** to your local Jekyll site
2. **Test locally:** `.\start-website.bat`
3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update: Added new blog post"
   git push
   ```
4. **Site updates automatically** - no manual building needed!

## 🎨 Step 7: Customize Your Site

### **Update Site Information:**
Edit `_config.yml`:
```yaml
title: "Your Name - Cybersecurity Portfolio"
email: "your.email@example.com"
description: "Your professional description"
url: "https://yourdomain.com"  # or https://yourusername.github.io
```

### **Add Your Content:**
- **Blog posts:** Add to `_posts/` folder
- **Projects:** Add to `_posts/` with `categories: [project]`
- **Images:** Add to `assets/images/`
- **Pages:** Create new `.md` files in root directory

## 🔍 Step 8: SEO & Analytics

### **Google Search Console:**
1. **Verify your domain** in Google Search Console
2. **Submit your sitemap:** `yoursite.com/sitemap.xml`
3. **Monitor indexing** and performance

### **Google Analytics:**
1. **Add tracking code** to `_layouts/default.html`
2. **Set up goals** and conversions
3. **Monitor traffic** and user behavior

## ✅ Step 9: Final Checklist

- [ ] Repository created with correct name (`yourusername.github.io`)
- [ ] All files uploaded to GitHub
- [ ] GitHub Pages enabled with GitHub Actions
- [ ] Custom domain configured (if applicable)
- [ ] DNS settings updated (if using custom domain)
- [ ] Site accessible at your URL
- [ ] All pages working correctly
- [ ] Images loading properly
- [ ] Mobile responsive
- [ ] SSL certificate active (https://)

## 🆘 Troubleshooting

### **Site not updating:**
- Check GitHub Actions for errors
- Ensure you're pushing to the `main` branch
- Wait 5-10 minutes for deployment

### **Custom domain not working:**
- Verify DNS settings are correct
- Wait up to 24 hours for DNS propagation
- Check domain is set in repository settings

### **Images not loading:**
- Ensure images are in `assets/images/` folder
- Check image paths in your markdown files
- Verify images are committed to git

### **404 errors:**
- Check file names and paths
- Ensure all files are committed to git
- Verify Jekyll build is successful

## 🎉 Success!

Your Jekyll portfolio is now live on GitHub Pages!

### **Your site URLs:**
- **GitHub Pages:** `https://yourusername.github.io`
- **Custom domain:** `https://yourdomain.com` (if configured)

### **Next steps:**
- Share your portfolio URL
- Set up Google Analytics
- Monitor performance
- Plan regular content updates
- Consider adding a contact form

## 🔄 Maintenance

### **Regular Updates:**
- **Weekly:** Add new blog posts or projects
- **Monthly:** Review and update content
- **Quarterly:** Check for Jekyll/GitHub Pages updates

### **Backup:**
- Your code is automatically backed up on GitHub
- Consider cloning to multiple computers
- Export important content regularly

---

**Need help?** Check the GitHub Actions logs in your repository or visit GitHub Pages documentation for more details.
