// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards and use cases
document.querySelectorAll('.feature-card, .use-case').forEach(el => {
    observer.observe(el);
});

// Modal handling
const slackModal = document.getElementById('slackModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const slackSignupBtn = document.getElementById('slackSignupBtn');

function openModal() {
    slackModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    slackModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Slack authentication handlers
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

slackSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

// Close modal on outside click
slackModal.addEventListener('click', (e) => {
    if (e.target === slackModal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && slackModal.classList.contains('active')) {
        closeModal();
    }
});

// Slack OAuth simulation
function handleSlackAuth() {
    // In production, this would redirect to Slack OAuth
    // const slackClientId = 'YOUR_SLACK_CLIENT_ID';
    // const redirectUri = encodeURIComponent('YOUR_REDIRECT_URI');
    // const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${slackClientId}&scope=identity.basic,identity.email&redirect_uri=${redirectUri}`;
    // window.location.href = slackAuthUrl;
    
    // For demo purposes, simulate authentication
    console.log('Slack authentication initiated...');
    
    // Simulate loading
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span style="font-size: 1.5rem;">⏳</span> Connecting...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Store auth state
        localStorage.setItem('slackAuth', 'true');
        localStorage.setItem('userName', 'Demo User');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Check if user is already authenticated
window.addEventListener('load', () => {
    const isAuthenticated = localStorage.getItem('slackAuth');
    if (isAuthenticated && window.location.pathname.includes('index.html')) {
        // Show a "Go to Dashboard" option
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const dashboardLink = document.createElement('div');
            dashboardLink.style.marginTop = '1rem';
            dashboardLink.innerHTML = '<a href="dashboard.html" class="btn btn-secondary">Go to Dashboard →</a>';
            heroContent.appendChild(dashboardLink);
        }
    }
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animate numbers (if you add stats)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Console welcome message
console.log('%c🚀 Welcome to UltaHost!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with modern web technologies', 'font-size: 12px; color: #8b5cf6;');
