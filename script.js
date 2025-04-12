document.addEventListener('DOMContentLoaded', function () {
    // ========== Typewriter Effect ==========
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
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && i === 0) {
            isDeleting = false;
            typingSpeed = 500;
        } else {
            typingSpeed = isDeleting ? 75 : 150;
            i = isDeleting ? i - 1 : i + 1;
        }

        setTimeout(typeWriter, typingSpeed);
    }
    if (typewriter) typeWriter();

    // ========== Mobile Menu ==========
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hasAttribute('download')) return;
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
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

    // ========== Form Submission ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const button = this.querySelector('.submit-btn');
            const statusDiv = document.getElementById('formStatus');

            statusDiv.innerHTML = '';
            statusDiv.className = 'form-status';

            try {
                button.disabled = true;
                button.classList.add('loading');

                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusDiv.innerHTML = 'Message sent successfully! I\'ll get back to you soon.';
                    statusDiv.className = 'form-status success';
                    this.reset();

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

    // ========== Project Filter ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;
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

    // ========== Scroll Animation ==========
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
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // ========== Skills Hover Effect ==========
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 5px 15px rgba(110, 142, 251, 0.3)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });

    // ========== Resume Download Tracker ==========
    const resumeLink = document.querySelector('a[download]');
    if (resumeLink) {
        resumeLink.addEventListener('click', function () {
            console.log('Resume downloaded');
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Downloading...';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    }

    // ========== Typing Animation for Multiple Elements ==========
    initTypingAnimations();
    setupAnimationRestart();

    function initTypingAnimations() {
        const typingElements = document.querySelectorAll('.typing-text');
        typingElements.forEach((element, index) => {
            element.style.animationName = `typing-${index}, blink-caret-${index}`;
            createKeyframes(index);
            element.addEventListener('animationend', function () {
                this.style.animation = `blink-caret-${index} 0.75s step-end infinite`;
                this.style.borderRight = '2px solid #4e9af1';
            });
        });
    }

    function createKeyframes(index) {
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

        document.querySelectorAll('.hero, .logo').forEach(section => observer.observe(section));
    }

    function restartAnimation(element) {
        element.style.animation = 'none';
        void element.offsetWidth;
        element.style.animation = '';
    }
});
