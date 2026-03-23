document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileNav();
    initializeCharts();
    initializeSmoothScroll();
    initializeActiveNav();
    initializePrincipleToggles();
});

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    const themeIcon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        if (themeIcon) themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
}

function initializeMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (!navToggle || !navMenu) return;
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        });
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    });
}

function initializePrincipleToggles() {
    window.togglePrinciple = function(principleId) {
        const principle = document.getElementById(principleId);
        if (!principle) return;
        const isExpanded = principle.classList.contains('expanded');
        document.querySelectorAll('.principle-card').forEach(card => {
            card.classList.remove('expanded');
            const cardIcon = card.querySelector('.principle-toggle i');
            if (cardIcon) cardIcon.className = 'fas fa-chevron-down';
        });
        if (!isExpanded) {
            principle.classList.add('expanded');
            const icon = principle.querySelector('.principle-toggle i');
            if (icon) icon.className = 'fas fa-chevron-up';
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

function initializeCharts() {
    if (typeof Chart === 'undefined') return;
    const getTextColor = () => getComputedStyle(document.documentElement).getPropertyValue('--dark-color').trim();
    const integrityCtx = document.getElementById('integrityChart');
    if (integrityCtx) new Chart(integrityCtx, { type: 'doughnut', data: { labels: ['Care about following rules', 'Don\'t really care'], datasets: [{ data: [4, 4], backgroundColor: ['#00B4D8', '#FF9E6D'] }] }, options: { responsive: true, maintainAspectRatio: false } });
    const perceptionCtx = document.getElementById('perceptionChart');
    if (perceptionCtx) new Chart(perceptionCtx, { type: 'bar', data: { labels: ['Positive / Helpful', 'Negative / Anti-AI', 'Mixed / Depends'], datasets: [{ data: [6, 1, 1], backgroundColor: '#0A2472' }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } } });
    const usageCtx = document.getElementById('usageChart');
    if (usageCtx) new Chart(usageCtx, { type: 'pie', data: { labels: ['Frequently (5)', 'Rarely (2)', 'Consistently (1)'], datasets: [{ data: [5, 2, 1], backgroundColor: ['#0A2472', '#00B4D8', '#FF9E6D'] }] }, options: { responsive: true, maintainAspectRatio: false } });
    const relianceCtx = document.getElementById('relianceChart');
    if (relianceCtx) new Chart(relianceCtx, { type: 'doughnut', data: { labels: ['Do not consider themselves reliant', 'Consider themselves reliant'], datasets: [{ data: [6, 2], backgroundColor: ['#0A2472', '#00B4D8'] }] }, options: { responsive: true, maintainAspectRatio: false } });
    const complexityRadar = document.getElementById('complexityRadar');
    if (complexityRadar) new Chart(complexityRadar, { type: 'radar', data: { labels: ['Task 1: Summarize Article', 'Task 2: Grammar & Rewrite', 'Task 3: Creative Writing', 'Task 4: Morning Routine', 'Task 5: Debug HTML'], datasets: [{ label: 'Complexity Score (1-10)', data: [8, 6, 5, 2, 10], backgroundColor: 'rgba(0, 180, 216, 0.2)', borderColor: '#00B4D8', pointBackgroundColor: '#00B4D8' }] }, options: { responsive: true, maintainAspectRatio: false, scales: { r: { beginAtZero: true, max: 10, ticks: { stepSize: 2 } } } } });
    const timeSpentChart = document.getElementById('timeSpentChart');
    if (timeSpentChart) new Chart(timeSpentChart, { type: 'bar', data: { labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'], datasets: [{ label: 'Framework Group (minutes)', data: [14.4, 16.4, 16.2, 1.8, 4.6], backgroundColor: '#0A2472' }, { label: 'No Framework (minutes)', data: [12.75, 7, 9.75, 1.75, 3.5], backgroundColor: '#FF9E6D' }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Minutes' } } } } });
    const aiUsageChart = document.getElementById('aiUsageChart');
    if (aiUsageChart) new Chart(aiUsageChart, { type: 'bar', data: { labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'], datasets: [{ label: 'Framework Group (AI used)', data: [1, 0, 2, 0, 1], backgroundColor: '#0A2472' }, { label: 'No Framework (AI used)', data: [2, 1, 1, 0, 1], backgroundColor: '#FF9E6D' }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } } });
    const gradesChart = document.getElementById('gradesChart');
    if (gradesChart) new Chart(gradesChart, { type: 'bar', data: { labels: ['Task 1 (max 5)', 'Task 2 (max 10)', 'Task 3 (max 9)', 'Task 5 (max 3)'], datasets: [{ label: 'Framework Group Avg', data: [3.375, 6.875, 8.25, 2.5], backgroundColor: '#0A2472' }, { label: 'No Framework Avg', data: [3.125, 7.875, 7.25, 3], backgroundColor: '#FF9E6D' }] }, options: { responsive: true, maintainAspectRatio: false } });
    const task4Order = document.getElementById('task4OrderChart');
    if (task4Order) new Chart(task4Order, { type: 'bar', data: { labels: ['Breakfast before backpack', 'Backpack before breakfast', 'Lock before leave', 'Leave before lock'], datasets: [{ label: 'Framework Group', data: [2, 2, 4, 0], backgroundColor: '#0A2472' }, { label: 'No Framework', data: [1, 3, 3, 1], backgroundColor: '#FF9E6D' }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } } });
}

function initializeSmoothScroll() {
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({ top: targetElement.offsetTop - headerHeight, behavior: 'smooth' });
            }
        });
    });
}

function initializeActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
}
