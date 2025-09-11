// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe portfolio items and post cards
    const animatedElements = document.querySelectorAll('.portfolio-item, .post-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Convert Obsidian callouts to HTML
    convertCallouts();
});

// Function to convert Obsidian callout syntax to HTML
function convertCallouts() {
    const calloutRegex = /^> \[!(\w+)\]\s*(.*?)$/gm;
    const content = document.querySelector('.post-content, .main-content');
    
    if (!content) return;
    
    // Find all callout blocks
    const walker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        if (text.includes('[!') && text.includes(']')) {
            const lines = text.split('\n');
            let newHTML = '';
            let inCallout = false;
            let calloutType = '';
            let calloutTitle = '';
            let calloutContent = '';
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const calloutMatch = line.match(/^> \[!(\w+)\]\s*(.*?)$/);
                
                if (calloutMatch) {
                    // Close previous callout if open
                    if (inCallout) {
                        newHTML += createCalloutHTML(calloutType, calloutTitle, calloutContent);
                    }
                    
                    // Start new callout
                    inCallout = true;
                    calloutType = calloutMatch[1].toLowerCase();
                    calloutTitle = calloutMatch[2] || calloutType.charAt(0).toUpperCase() + calloutType.slice(1);
                    calloutContent = '';
                } else if (inCallout && line.startsWith('> ')) {
                    // Add content to current callout
                    calloutContent += (calloutContent ? '\n' : '') + line.substring(2);
                } else if (inCallout && !line.startsWith('>')) {
                    // End of callout
                    newHTML += createCalloutHTML(calloutType, calloutTitle, calloutContent);
                    inCallout = false;
                    newHTML += line + '\n';
                } else {
                    newHTML += line + '\n';
                }
            }
            
            // Close final callout if open
            if (inCallout) {
                newHTML += createCalloutHTML(calloutType, calloutTitle, calloutContent);
            }
            
            if (newHTML !== text) {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = newHTML;
                textNode.parentNode.replaceChild(wrapper, textNode);
            }
        }
    });
}

// Function to create HTML for callout
function createCalloutHTML(type, title, content) {
    const calloutClass = `callout callout-${type}`;
    const iconClass = 'callout-icon';
    
    return `<div class="${calloutClass}">
        <div class="callout-title">
            <span class="${iconClass}"></span>
            <span>${title}</span>
        </div>
        <div class="callout-content">${content.replace(/\n/g, '<br>')}</div>
    </div>`;
}
