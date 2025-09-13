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
    const content = document.querySelector('.post-content');
    
    if (!content) {
        return;
    }
    
    // Process the entire content as HTML
    let html = content.innerHTML;
    
    // Replace callout syntax with HTML
    html = html.replace(/^> \[!(\w+)\]\s*(.*?)$/gm, (match, type, title) => {
        const calloutType = type.toLowerCase();
        const calloutTitle = title.trim() || calloutType.charAt(0).toUpperCase() + calloutType.slice(1);
        
        return `<div class="callout callout-${calloutType}">
            <div class="callout-title">
                <span class="callout-icon"></span>
                ${calloutTitle}
            </div>
            <div class="callout-content"></div>
        </div>`;
    });
    
    content.innerHTML = html;
}
