// Toggle mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}

// Change navbar style on scroll
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Set active nav link based on current page
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").endsWith(currentPage)) {
      link.classList.add("active");
    }
  });
});

// Hero Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".slide-indicator");
  let currentSlide = 0;
  const slideCount = slides.length;

  // Function to show a specific slide
  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    slides[index].classList.add("active");
    indicators[index].classList.add("active");
    currentSlide = index;
  }

  // Auto-advance slides every 3 seconds
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
  }

  let slideInterval = setInterval(nextSlide, 3000);

  // Pause on hover
  const heroSection = document.querySelector(".relative.h-screen");
  heroSection.addEventListener("mouseenter", () =>
    clearInterval(slideInterval)
  );
  heroSection.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 3000);
  });

  // Click indicators to navigate
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      clearInterval(slideInterval);
      showSlide(index);
      slideInterval = setInterval(nextSlide, 3000);
    });
  });
});

// Tambahkan di script Anda
document.addEventListener("DOMContentLoaded", function () {
  // Buat elemen transisi
  const transitionEl = document.createElement("div");
  transitionEl.className = "page-transition";
  document.body.appendChild(transitionEl);

  // Tangani semua link internal
  document.querySelectorAll('a[href^="/"], a[href^="http"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      // Skip untuk link yang memiliki class tertentu atau target blank
      if (
        this.classList.contains("no-transition") ||
        this.target === "_blank" ||
        this.href.includes("#")
      ) {
        return;
      }

      e.preventDefault();
      const href = this.href;

      // Aktifkan efek transisi
      transitionEl.classList.add("active");

      // Tunggu sebentar untuk efek visual
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
});
