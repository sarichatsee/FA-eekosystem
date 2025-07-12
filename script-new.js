// Professional Medical Theme - Clean JavaScript
// Mobile menu functionality and smooth animations

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("mobile-open");
      menuToggle.classList.toggle("active");

      // Update aria-expanded
      const isExpanded = nav.classList.contains("mobile-open");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });

    // Close mobile menu when clicking on links
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("mobile-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove("mobile-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Header scroll effect with performance optimization
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// Emergency Functions
function callEmergency() {
  if (confirm("Call emergency services (995) now?")) {
    window.location.href = "tel:995";
  }
}

function callPoisonControl() {
  if (confirm("Call Poison Information Centre (+65 6423 9119) now?")) {
    window.location.href = "tel:+6564239119";
  }
}

function findNearestHospital() {
  // Try to get user's location and redirect to maps
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const mapsUrl = `https://www.google.com/maps/search/hospital+emergency/@${lat},${lng},15z`;
        window.open(mapsUrl, "_blank");
      },
      function () {
        // Fallback if location access is denied
        const mapsUrl =
          "https://www.google.com/maps/search/hospital+emergency+singapore";
        window.open(mapsUrl, "_blank");
      }
    );
  } else {
    // Fallback for browsers without geolocation
    const mapsUrl =
      "https://www.google.com/maps/search/hospital+emergency+singapore";
    window.open(mapsUrl, "_blank");
  }
}
