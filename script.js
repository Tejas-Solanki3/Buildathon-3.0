// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Service card hover animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-hover');
        });
    });
});

// Weather API integration (example)
async function getWeatherData() {
    try {
        const response = await fetch('YOUR_WEATHER_API_ENDPOINT');
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Form validation
function validateForm(event) {
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    if (!email || !message) {
        alert('Please fill in all required fields');
        event.preventDefault();
    }
}

function handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Thank you for contacting us!</h3>
            <p>We will get back to you soon.</p>
        </div>
    `;
    document.body.appendChild(successMessage);

    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);

    // Reset form
    event.target.reset();
    return false;
}

// Add floating label functionality
document.querySelectorAll('.form-group input, .form-group textarea').forEach(element => {
    element.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focused');
    });
    
    element.addEventListener('blur', (e) => {
        if (!e.target.value) {
            e.target.parentElement.classList.remove('focused');
        }
    });
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Add animation delay to social icons
document.querySelectorAll('.social-icon').forEach((icon, index) => {
    icon.style.setProperty('--i', index);
});

// Handle active navigation states
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add hover animation class
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            e.target.style.animation = 'none';
            setTimeout(() => {
                e.target.style.animation = '';
            }, 10);
        });
    });
});

// Scroll reveal
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check 