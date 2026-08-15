// Announcement Banner Close
document.getElementById('closeBannerBtn').addEventListener('click', function () {
    document.getElementById('announcementBanner').style.display = 'none';
});

// Mobile Hamburger Menu Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

hamburgerBtn.addEventListener('click', function () {
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Scroll Detection
let isScrollingTimeout;
window.addEventListener('scroll', function () {
    document.body.classList.add('is-scrolling');
    clearTimeout(isScrollingTimeout);
    isScrollingTimeout = setTimeout(function () {
        document.body.classList.remove('is-scrolling');
    }, 500);
});

// Gallery Queue Script
let currentQueue = [];
let currentDescriptions = [];
let currentIndex = 0;
let currentCategory = '';

function openGallery(category, photos, descriptions) {
    currentCategory = category;
    currentQueue = photos;
    currentDescriptions = descriptions;
    currentIndex = 0;
    updateModalContent();
    
    // Open Modal and Freeze Page Background Scrolling
    document.getElementById('imageModal').classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function updateModalContent() {
    document.getElementById('modalTitle').innerText = currentCategory;
    
    // Set both main portrait/landscape image and ambient background blur image
    const photoUrl = currentQueue[currentIndex];
    document.getElementById('modalImageSrc').src = photoUrl;
    document.getElementById('modalBgBlur').src = photoUrl;
    
    document.getElementById('modalDesc').innerText = `${currentDescriptions[currentIndex]} (Photo ${currentIndex + 1} of ${currentQueue.length})`;
}

function nextPhoto() {
    if (currentQueue.length > 0) {
        currentIndex = (currentIndex + 1) % currentQueue.length;
        updateModalContent();
    }
}

function prevPhoto() {
    if (currentQueue.length > 0) {
        currentIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length;
        updateModalContent();
    }
}

function closeModal() {
    // Close Modal and Restore Background Page Scrolling
    document.getElementById('imageModal').classList.remove('active');
    document.body.style.overflow = ''; 
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll Fade Observer
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(section => {
    fadeObserver.observe(section);
});