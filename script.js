document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle with animation
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Enhanced smooth scrolling with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.hasAttribute('download')) return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });

    // Form submission with better UX
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const button = this.querySelector('.submit-btn');
            const statusDiv = document.getElementById('formStatus');
            
            // Reset status
            statusDiv.innerHTML = '';
            statusDiv.className = 'form-status';
            
            try {
                // Show loading state
                button.disabled = true;
                button.classList.add('loading');
                
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    statusDiv.innerHTML = 'Message sent successfully! I\'ll get back to you soon.';
                    statusDiv.className = 'form-status success';
                    this.reset();
                    
                    // Add celebration effect
                    setTimeout(() => {
                        button.classList.add('success');
                        setTimeout(() => button.classList.remove('success'), 2000);
                    }, 300);
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Form submission failed');
                }
            } catch (error) {
                statusDiv.innerHTML = `Error: ${error.message}. Please try again or email me directly at ritikrauniyar@gmail.com`;
                statusDiv.className = 'form-status error';
                console.error('Form submission error:', error);
            } finally {
                button.disabled = false;
                button.classList.remove('loading');
            }
        });
    }

    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animated-card, .tree-node, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial check and add scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Add hover effect to skills
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 5px 15px rgba(110, 142, 251, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });

    // Resume download tracking
    const resumeLink = document.querySelector('a[download]');
    if (resumeLink) {
        resumeLink.addEventListener('click', function() {
            // You can add Google Analytics or other tracking here
            console.log('Resume downloaded');
            
            // Optional: Show a brief confirmation
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Downloading...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Continuous Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    const text = "Ritik Rauniyar";
    let i = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeWriter() {
        const currentText = text.substring(0, i);
        typewriter.innerHTML = currentText;
        typewriter.classList.add('typing');

        if (!isDeleting && i === text.length) {
            // Pause at end of typing
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && i === 0) {
            // Pause at start after deleting
            isDeleting = false;
            typingSpeed = 500;
        } else {
            // Continue typing or deleting
            typingSpeed = isDeleting ? 75 : 150;
            i = isDeleting ? i - 1 : i + 1;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Enhanced smooth scrolling with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.hasAttribute('download')) return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });

    // Form submission with better UX
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const button = this.querySelector('.submit-btn');
            const statusDiv = document.getElementById('formStatus');
            
            // Reset status
            statusDiv.innerHTML = '';
            statusDiv.className = 'form-status';
            
            try {
                // Show loading state
                button.disabled = true;
                button.classList.add('loading');
                
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData
                    // Typing animation controller
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all typing animations
    initTypingAnimations();
    
    // Restart animations when they complete
    setupAnimationRestart();
  });
  
  function initTypingAnimations() {
    // Get all elements with typing animation
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((element, index) => {
      // Set unique animation names to prevent conflicts
      element.style.animationName = `typing-${index}, blink-caret-${index}`;
      
      // Create dynamic keyframes
      createKeyframes(index);
      
      // Add event listener for animation end
      element.addEventListener('animationend', function() {
        // Keep the cursor blinking after typing completes
        this.style.animation = `blink-caret-${index} 0.75s step-end infinite`;
        this.style.borderRight = '2px solid #4e9af1';
      });
    });
  }
  
  function createKeyframes(index) {
    // Create style element for dynamic keyframes
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes typing-${index} {
        from { width: 0 }
        to { width: 100% }
      }
      @keyframes blink-caret-${index} {
        from, to { border-color: transparent }
        50% { border-color: #4e9af1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  function setupAnimationRestart() {
    // Restart animation when user scrolls to element
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const typingElement = entry.target.querySelector('.typing-text') || entry.target;
          if (typingElement.classList.contains('typing-text')) {
            restartAnimation(typingElement);
          }
        }
      });
    }, { threshold: 0.1 });
  
    // Observe all sections with typing animations
    document.querySelectorAll('.hero, .logo').forEach(section => {
      observer.observe(section);
    });
  }
  
  function restartAnimation(element) {
    // Reset animation
    element.style.animation = 'none';
    void element.offsetWidth; // Trigger reflow
    const index = Array.from(document.querySelectorAll('.typing-text')).indexOf(element);
    element.style.animation = `typing-${index} 3s steps(30, end) forwards, blink-caret-${index} 0.75s step-end infinite`;
  }