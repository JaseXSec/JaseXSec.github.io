---
layout: default
title: Projects & Blogs
---

<section class="section">
    <div class="container">
        <h2 class="section-title">Projects & Blogs</h2>
        
        <!-- Filter Buttons -->
        <div class="filter-controls">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="project">Projects</button>
            <button class="filter-btn" data-filter="blog">Blogs</button>
        </div>
        
        <!-- Posts Grid -->
        <div class="all-posts" id="posts-container">
            {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
            {% for post in sorted_posts %}
            <div class="post-item" data-category="{{ post.categories | first }}">
                <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
                <p class="post-meta">
                    {{ post.date | date: "%B %d, %Y" }} | 
                    <span class="category-tag">{{ post.categories | first }}</span>
                    {% for tag in post.tags %}
                        <span class="tag">{{ tag }}</span>{% unless forloop.last %}, {% endunless %}
                    {% endfor %}
                </p>
                <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 200 }}</p>
            </div>
            {% endfor %}
        </div>
        
        <!-- No Results Message -->
        <div class="no-results" id="no-results" style="display: none;">
            <p>No posts found for the selected filter.</p>
        </div>
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postItems = document.querySelectorAll('.post-item');
    const noResults = document.getElementById('no-results');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            let visibleCount = 0;
            
            postItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease-in';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        });
    });
});
</script>