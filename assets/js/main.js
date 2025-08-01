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


// toggle faq on contact page
function toggleFAQ(id) {
  const content = document.getElementById(`faq-content-${id}`);
  const icon = document.getElementById(`faq-icon-${id}`);
  
  // Toggle the content visibility
  content.classList.toggle('hidden');
  
  // Toggle the icon rotation
  if (content.classList.contains('hidden')) {
    icon.classList.remove('rotate-180');
    icon.classList.add('text-gray-500');
    icon.classList.remove('text-brand-blue-500');
  } else {
    icon.classList.add('rotate-180');
    icon.classList.remove('text-gray-500');
    icon.classList.add('text-brand-blue-500');
  }
}



