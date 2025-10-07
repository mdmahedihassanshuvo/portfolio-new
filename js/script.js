document.addEventListener("DOMContentLoaded", function () {
    // Initialize all functionality
    initializeNavigation();
    initializeSmoothScrolling();
    initializeDarkMode();
    initializeScrollSpy();
    initializeEnhancedAnimations();
    initializeHeroAnimations();
    initializeScrollIndicator();
    initializeParticles();
    initializeMagneticButtons();
    initializeEnhancedIntersectionObserver();
    
    // Initialize section-specific animations
    setTimeout(() => {
        animateProgressBars();
        animateTimeline();
    }, 1000);
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add backdrop when menu is open
            if (navMenu.classList.contains('active')) {
                createBackdrop();
            } else {
                removeBackdrop();
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                removeBackdrop();
            });
        });
    }
}

// Create backdrop for mobile menu
function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'fixed inset-0 bg-black/50 z-40 backdrop-blur-sm';
    backdrop.id = 'menu-backdrop';
    backdrop.addEventListener('click', () => {
        document.getElementById('hamburger').classList.remove('active');
        document.querySelector('.nav-menu').classList.remove('active');
        removeBackdrop();
    });
    document.body.appendChild(backdrop);
}

function removeBackdrop() {
    const backdrop = document.getElementById('menu-backdrop');
    if (backdrop) {
        backdrop.remove();
    }
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced dark mode with smooth transitions
function initializeDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            enableDarkMode(themeIcon);
        }

        themeToggle.addEventListener('click', () => {
            // Add transition for smooth theme change
            document.documentElement.style.transition = 'all 0.5s ease';
            
            if (document.body.classList.contains('dark-mode')) {
                disableDarkMode(themeIcon);
            } else {
                enableDarkMode(themeIcon);
            }
            
            // Remove transition after animation
            setTimeout(() => {
                document.documentElement.style.transition = '';
            }, 500);
        });
    }
}

function enableDarkMode(themeIcon) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
}

function disableDarkMode(themeIcon) {
    document.body.classList.remove('dark-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
}

// Enhanced scroll spy with section reveal
function initializeScrollSpy() {
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
                // Reveal section when in view
                section.classList.add('visible');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Trigger specific section animations
        if (current === 'about') {
            animateProgressBars();
            animateTimeline();
        }
        if (current === 'skills') {
            animateSkillsSection();
        }
        if (current === 'projects') {
            animateProjectsSection();
        }
        if (current === 'contact') {
            initializeContactSection();
        }
    }

    // Initial reveal for sections in view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            section.classList.add('visible');
        }
    });

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

// Enhanced animations initialization
function initializeEnhancedAnimations() {
    // Add section reveal class to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-reveal');
    });

    // Enhanced card animations
    const cards = document.querySelectorAll('.enhanced-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });

    // Enhanced typing animation
    initializeTypingAnimation();
}

// Enhanced typing animation
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const texts = ['Full Stack Developer', 'Flutter Developer', 'Problem Solver', 'Tech Enthusiast'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 100 : 150);
            }
        }
        
        // Start typing animation
        setTimeout(type, 1000);
    }
}

// Enhanced hero section animations
function initializeHeroAnimations() {
    // Stagger animation for tech badges
    const techBadges = document.querySelectorAll('.flex.flex-wrap.gap-3 span');
    techBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 500 + index * 100);
    });

    // Enhanced avatar entrance animation
    const avatar = document.querySelector('.avatar-container');
    if (avatar) {
        avatar.style.opacity = '0';
        avatar.style.transform = 'scale(0.8) rotate(-5deg)';
        avatar.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        setTimeout(() => {
            avatar.style.opacity = '1';
            avatar.style.transform = 'scale(1) rotate(0deg)';
        }, 800);
    }

    // Enhanced text reveal animation
    const heroText = document.querySelector('.lg\\:w-1\\/2');
    if (heroText) {
        const elements = heroText.querySelectorAll('h1, p, .typing-animation, .flex.flex-col');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-30px)';
            el.style.transition = `all 0.8s ease ${index * 0.2}s`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateX(0)';
            }, 300 + index * 200);
        });
    }
}

// Enhanced scroll indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.absolute.bottom-8');
    if (scrollIndicator) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY) {
                // Scrolling down - hide indicator
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateY(20px)';
            } else {
                // Scrolling up - show indicator
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
        
        // Hide indicator after 3 seconds if user doesn't scroll
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateY(0)';
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateY(20px)';
            }, 3000);
        });
    }
}

// Particle background for hero section
function initializeParticles() {
    const heroSection = document.querySelector('.hero-bg');
    if (heroSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        heroSection.appendChild(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            createParticle(particlesContainer);
        }
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const animationDelay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${animationDuration}s`;
    particle.style.animationDelay = `${animationDelay}s`;
    
    container.appendChild(particle);
    
    // Remove particle after animation and create new one
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, animationDuration * 1000);
}

// Magnetic button effect
function initializeMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Timeline animation on scroll
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => observer.observe(item));
}

// Skills section animations
function animateSkillsSection() {
    const skillCards = document.querySelectorAll('.skill-card');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Animate skill cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate progress bars with delay
                if (entry.target.querySelector('.progress-bar')) {
                    const bars = entry.target.querySelectorAll('.progress-bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.getAttribute('style').match(/width: (\d+)%/)[1];
                            bar.style.width = '0%';
                            setTimeout(() => {
                                bar.style.width = width + '%';
                            }, 100);
                        }, index * 200);
                    });
                }
            }
        });
    }, { threshold: 0.3 });

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Animate mobile development card
    const mobileCard = document.querySelector('.mobile-dev-card');
    if (mobileCard) {
        const mobileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.5 });
        
        mobileCard.style.opacity = '0';
        mobileCard.style.transform = 'scale(0.9)';
        mobileCard.style.transition = 'all 0.8s ease';
        mobileObserver.observe(mobileCard);
    }
}

// Projects section animations
function animateProjectsSection() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state with enhanced animation
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75');
            
            // Simulate API call with enhanced UX
            setTimeout(() => {
                // Show success message with enhanced animation
                formResponse.classList.remove('hidden');
                formResponse.classList.add('success-message');
                
                // Add celebration effect
                celebrateSubmission();
                
                // Reset form
                contactForm.reset();
                
                // Reset button with enhanced transition
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-75');
                }, 1000);
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formResponse.classList.add('hidden');
                }, 5000);
            }, 2000);
        });
    }

    // Add input animations
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('input-focused');
            }
        });
    });
}

// Initialize contact form when section is in view
function initializeContactSection() {
    const contactSection = document.getElementById('contact');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeContactForm();
                
                // Animate contact cards
                const contactCards = document.querySelectorAll('.contact-card');
                contactCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    if (contactSection) {
        // Set initial state for animations
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        sectionObserver.observe(contactSection);
    }
}

// Enhanced resume button with download functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button') || e.target.closest('.cta-button')) {
        e.preventDefault();
        
        // Create a temporary download link
        const link = document.createElement('a');
        link.href = '#'; // Replace with actual resume URL
        link.download = 'Md_Mahedi_Hassan_Shuvo_Resume.pdf';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show download confirmation
        showNotification('Resume download started!', 'success');
    }
});

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Celebration effect for form submission
function celebrateSubmission() {
    const celebration = document.createElement('div');
    celebration.className = 'fixed inset-0 pointer-events-none z-40';
    celebration.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-6xl animate-bounce">🎉</div>
        </div>
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 2000);
}

// Enhanced intersection observer for all animations
function initializeEnhancedIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all animate-able elements
    document.querySelectorAll('.section-reveal, .enhanced-card, .skill-card, .project-card').forEach(el => {
        observer.observe(el);
    });
}