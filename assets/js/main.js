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
    console.log('Starting callout conversion...');
    convertCallouts();
});

// Function to convert Obsidian callout syntax to HTML
function convertCallouts() {
    const content = document.querySelector('.post-content, .main-content');
    
    if (!content) {
        console.log('No content found for callout conversion');
        return;
    }
    
    console.log('Content found for callout conversion:', content);
    
    // Find all paragraphs that contain callout syntax
    const paragraphs = content.querySelectorAll('p');
    console.log('Found paragraphs:', paragraphs.length);
    
    paragraphs.forEach((paragraph, index) => {
        const text = paragraph.textContent;
        console.log(`Checking paragraph ${index}:`, text.substring(0, 100) + '...');
        
        const calloutMatch = text.match(/^> \[!(\w+)\]\s*(.*?)$/);
        console.log('Callout match result:', calloutMatch);
        
        if (calloutMatch) {
            const calloutType = calloutMatch[1].toLowerCase();
            const calloutTitle = calloutMatch[2] || calloutType.charAt(0).toUpperCase() + calloutType.slice(1);
            
            console.log('Creating callout:', calloutType, calloutTitle);
            
            // Create callout HTML
            const calloutHTML = createCalloutHTML(calloutType, calloutTitle, '');
            
            // Replace the paragraph with callout
            const wrapper = document.createElement('div');
            wrapper.innerHTML = calloutHTML;
            paragraph.parentNode.replaceChild(wrapper, paragraph);
            
            console.log('Callout replaced successfully');
        }
    });
    
    // Also check for multi-line callouts in text nodes
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
        if (text.includes('[!') && text.includes(']') && text.startsWith('> ')) {
            const calloutMatch = text.match(/^> \[!(\w+)\]\s*(.*?)$/);
            
            if (calloutMatch) {
                const calloutType = calloutMatch[1].toLowerCase();
                const calloutTitle = calloutMatch[2] || calloutType.charAt(0).toUpperCase() + calloutType.slice(1);
                
                // Create callout HTML
                const calloutHTML = createCalloutHTML(calloutType, calloutTitle, '');
                
                // Replace the text node with callout
                const wrapper = document.createElement('div');
                wrapper.innerHTML = calloutHTML;
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
