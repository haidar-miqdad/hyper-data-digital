/**
 * Navigation component functionality
 */

import { debounce } from "lodash"
import { smoothScrollTo } from "./utils/smoothScroll"

class Navbar {
  constructor() {
    this.navbar = document.getElementById("navbar")
    this.mobileMenuButton = document.getElementById("mobile-menu-button")
    this.mobileMenu = document.getElementById("mobile-menu")
    this.hamburger = this.mobileMenuButton?.querySelector(".hamburger")
    this.isMenuOpen = false

    this.init()
  }

  init() {
    this.setupScrollEffect()
    this.setupMobileMenu()
    this.setupSmoothScrolling()
    this.setupDropdowns()
  }

  /**
   * Setup navbar scroll effect
   */
  setupScrollEffect() {
    const handleScroll = debounce(() => {
      if (window.scrollY > 50) {
        this.navbar.classList.add("navbar-solid")
      } else {
        this.navbar.classList.remove("navbar-solid")
      }
    }, 10)

    window.addEventListener("scroll", handleScroll)
  }

  /**
   * Setup mobile menu functionality
   */
  setupMobileMenu() {
    if (!this.mobileMenuButton || !this.mobileMenu) return

    this.mobileMenuButton.addEventListener("click", () => {
      this.toggleMobileMenu()
    })

    // Close menu when clicking on links
    this.mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu()
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isMenuOpen && !this.navbar.contains(e.target)) {
        this.closeMobileMenu()
      }
    })
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen

    if (this.isMenuOpen) {
      this.openMobileMenu()
    } else {
      this.closeMobileMenu()
    }
  }

  /**
   * Open mobile menu
   */
  openMobileMenu() {
    this.mobileMenu.classList.add("active")
    this.hamburger.classList.add("active")
    this.isMenuOpen = true

    // Prevent body scroll
    document.body.style.overflow = "hidden"
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    this.mobileMenu.classList.remove("active")
    this.hamburger.classList.remove("active")
    this.isMenuOpen = false

    // Restore body scroll
    document.body.style.overflow = ""
  }

  /**
   * Setup smooth scrolling for navigation links
   */
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href").substring(1)
        smoothScrollTo(targetId)
      })
    })
  }

  /**
   * Setup dropdown menus
   */
  setupDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown")

    dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector("button")
      const menu = dropdown.querySelector(".dropdown-menu")

      if (!button || !menu) return

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          menu.classList.remove("opacity-100", "visible", "scale-y-100")
          menu.classList.add("opacity-0", "invisible", "scale-y-90")
        }
      })
    })
  }
}

// Initialize navbar when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Navbar()
})
