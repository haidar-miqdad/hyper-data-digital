// Hero Slider Functionality - Optimized Version
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".slide-indicator");
  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;
  let isHovering = false;

  // Simple preload images
  function preloadImages() {
    slides.forEach((slide) => {
      const imgSrc = slide.style.backgroundImage.replace(
        /^url\(['"](.+)['"]\)/,
        "$1"
      );
      const img = new Image();
      img.src = imgSrc;
    });
  }

  // Initialize slider
  function initSlider() {
    // Show first slide immediately
    slides[0].classList.add("active");
    indicators[0].classList.add("active");

    // Preload all images
    preloadImages();

    // Start auto-rotation
    startSlider();
  }

  // Show slide with transition
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Show new slide
    slides[index].classList.add("active");
    indicators[index].classList.add("active");
    currentSlide = index;
  }

  // Next slide function
  function nextSlide() {
    if (!isHovering) {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }
  }

  // Start slider
  function startSlider() {
    if (!slideInterval) {
      slideInterval = setInterval(nextSlide, 8000); // 5 seconds interval
    }
  }

  // Stop slider
  function stopSlider() {
    clearInterval(slideInterval);
    slideInterval = null;
  }

  // Initialize
  initSlider();

  // Pause on hover
  const heroSection =
    document.querySelector(".hero-section") ||
    document.querySelector(".relative.h-screen");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", () => {
      isHovering = true;
      stopSlider();
    });

    heroSection.addEventListener("mouseleave", () => {
      isHovering = false;
      startSlider();
    });
  }

  // Click indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      stopSlider();
      showSlide(index);
      startSlider();
    });
  });

  // Cleanup on page hide
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSlider();
    } else {
      startSlider();
    }
  });
});

// klik burger menu untuk tampilan mobile
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    document.getElementById("mobile-menu-button").classList.remove("active");
    document.getElementById("mobile-menu").classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});
