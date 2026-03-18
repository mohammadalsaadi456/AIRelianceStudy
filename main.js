// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI Reliance Study website loaded');
    
    initializeTheme();
    initializeMobileNav();
    initializePrincipleToggles();
    initializeCharts(); // Updated the demographics
    initializeForms();
    initializeSmoothScroll();
    initializeActiveNav();
    initializeDownloadButtons();
});

// ===== THEME TOGGLE =====
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
        themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (themeIcon) {
            themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

// ===== MOBILE NAVIGATION =====
function initializeMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
            document.body.style.overflow = 'hidden';
        } else {
            icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    });
    
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        });
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    });
}

// ===== PRINCIPLE TOGGLES =====
function initializePrincipleToggles() {
    window.togglePrinciple = function(principleId) {
        const principle = document.getElementById(principleId);
        if (!principle) return;
        
        const isExpanded = principle.classList.contains('expanded');
        const icon = principle.querySelector('.principle-toggle i');
        
        document.querySelectorAll('.principle-card').forEach(card => {
            if (card.id !== principleId && card.classList.contains('expanded')) {
                card.classList.remove('expanded');
                const cardIcon = card.querySelector('.principle-toggle i');
                if (cardIcon) cardIcon.className = 'fas fa-chevron-down';
            }
        });
        
        if (!isExpanded) {
            principle.classList.add('expanded');
            if (icon) icon.className = 'fas fa-chevron-up';
        } else {
            principle.classList.remove('expanded');
            if (icon) icon.className = 'fas fa-chevron-down';
        }
    };
    
    setTimeout(() => {
        const firstPrinciple = document.getElementById('principle1');
        if (firstPrinciple) {
            firstPrinciple.classList.add('expanded');
            const icon = firstPrinciple.querySelector('.principle-toggle i');
            if (icon) icon.className = 'fas fa-chevron-up';
        }
    }, 500);
}

// ===== CHARTS INITIALIZATION =====
function initializeCharts() {
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded yet');
        return;
    }

    function getTextColor() {
        return getComputedStyle(document.documentElement).getPropertyValue('--dark-color').trim();
    }
    
    // 1. Academic Integrity (4 care, 4 don't)
    const integrityCtx = document.getElementById('integrityChart');
    if (integrityCtx) {
        new Chart(integrityCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Care about following rules', 'Don\'t really care'],
                datasets: [{
                    data: [4, 4],
                    backgroundColor: ['#00B4D8', '#FF9E6D'],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { color: getTextColor() }
                    }
                }
            }
        });
    }
    
    // 2. Perception (6 Positive, 1 Negative, 1 Mixed)
    const perceptionCtx = document.getElementById('perceptionChart');
    if (perceptionCtx) {
        new Chart(perceptionCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Positive / Helpful', 'Negative / Anti-AI', 'Mixed / Depends'],
                datasets: [{
                    data: [6, 1, 1],
                    backgroundColor: '#0A2472',
                    borderRadius: 8,
                    hoverBackgroundColor: '#00B4D8'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1, color: getTextColor() },
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    },
                    x: {
                        ticks: { color: getTextColor() }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 3. Usage frequency (Excel: 5 Frequent, 2 Rare, 1 Consistent)
    const usageCtx = document.getElementById('usageChart');
    if (usageCtx) {
        new Chart(usageCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Frequently (5)', 'Rarely (2)', 'Consistently (1)'],
                datasets: [{
                    data: [5, 2, 1],
                    backgroundColor: ['#0A2472', '#00B4D8', '#FF9E6D'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { color: getTextColor() }
                    }
                }
            }
        });
    }

    // 4. Self-reported reliance (2 Yes, 6 No)
    const relianceCtx = document.getElementById('relianceChart');
    if (relianceCtx) {
        new Chart(relianceCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Do not consider themselves reliant', 'Consider themselves reliant'],
                datasets: [{
                    data: [6, 2],
                    backgroundColor: ['#0A2472', '#00B4D8'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { color: getTextColor() }
                    }
                }
            }
        });
    }
    
    // 5. Experiment radar chart (framework comparison)
    const experimentCtx = document.getElementById('experimentChart');
    if (experimentCtx) {
        new Chart(experimentCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Work Quality', 'Thoughtful AI Use', 'Followed Guidelines'],
                datasets: [{
                    label: 'Group with Framework (4 students)',
                    data: [85, 90, 88],
                    backgroundColor: 'rgba(0, 180, 216, 0.2)',
                    borderColor: '#00B4D8',
                    borderWidth: 2,
                    pointBackgroundColor: '#00B4D8',
                }, {
                    label: 'Group without Framework (4 students)',
                    data: [65, 45, 30],
                    backgroundColor: 'rgba(255, 158, 109, 0.2)',
                    borderColor: '#FF9E6D',
                    borderWidth: 2,
                    pointBackgroundColor: '#FF9E6D',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 20, color: getTextColor() },
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        pointLabels: { color: getTextColor() }
                    }
                },
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { color: getTextColor() }
                    }
                }
            }
        });
    }
}

// ===== FORM HANDLING =====
function initializeForms() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const message = document.getElementById('message')?.value;
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        alert(`Thanks ${name}! We'll get back to you soon.`);
        this.reset();
    });
}

// ===== DOWNLOAD BUTTONS =====
function initializeDownloadButtons() {
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Thanks for your interest! This is a demo version. The full PDF would download here.');
        });
    });
}

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ACTIVE NAVIGATION ON SCROLL =====
function initializeActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
