// Mobile Menu Toggle
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    this.classList.toggle("active");
    document.getElementById("mobile-menu").classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

// Close menu when clicking on a link
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("mobile-menu-button").classList.remove("active");
    document.getElementById("mobile-menu").classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
});

// Close menu when clicking outside
document.getElementById("mobile-menu").addEventListener("click", function (e) {
  if (e.target === this) {
    document.getElementById("mobile-menu-button").classList.remove("active");
    this.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 10) {
    navbar.classList.add("navbar-solid");
  } else {
    navbar.classList.remove("navbar-solid");
  }
});

// Auto-close mobile menu on resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    document.getElementById("mobile-menu-button").classList.remove("active");
    document.getElementById("mobile-menu").classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});
