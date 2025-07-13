// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('checkbox');
    const navLinks = document.querySelectorAll('.nav a');
    
    // Close mobile menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            checkbox.checked = false;
        });
    });
    
    // Emergency action functions
    window.callEmergency = function() {
        window.location.href = 'tel:995';
    };
    
    window.callPoisonControl = function() {
        window.location.href = 'tel:+6564239119';
    };
    
    window.findNearestHospital = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                window.open(`https://www.google.com/maps/search/hospital/@${lat},${lng},15z`, '_blank');
            });
        } else {
            window.open('https://www.google.com/maps/search/hospital+singapore', '_blank');
        }
    };
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
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
});
