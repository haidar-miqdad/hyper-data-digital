/**
 * Hero section animations
 */

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

class HeroAnimations {
  constructor() {
    this.heroTitle = document.getElementById("hero-title")
    this.heroSubtitle = document.getElementById("hero-subtitle")
    this.heroButtons = document.getElementById("hero-buttons")

    this.init()
  }

  init() {
    // Start animations when page loads
    window.addEventListener("load", () => {
      this.animateHeroContent()
    })
  }

  /**
   * Animate hero content with staggered timing
   */
  animateHeroContent() {
    if (prefersReducedMotion()) {
      this.showAllContent()
      return
    }

    // Animate title words
    this.animateTitle()

    // Animate subtitle after title
    setTimeout(() => {
      this.animateSubtitle()
    }, 1500)

    // Animate buttons after subtitle
    setTimeout(() => {
      this.animateButtons()
    }, 3000)
  }

  /**
   * Animate title words one by one
   */
  animateTitle() {
    const words = this.heroTitle.querySelectorAll(".hero-word")

    words.forEach((word, index) => {
      setTimeout(() => {
        word.classList.add("animate")
      }, index * 200)
    })

    // Show title container
    setTimeout(() => {
      this.heroTitle.style.opacity = "1"
    }, 100)
  }

  /**
   * Animate subtitle with typewriter effect
   */
  animateSubtitle() {
    this.heroSubtitle.style.opacity = "1"
    const typewriter = this.heroSubtitle.querySelector(".typewriter")

    if (typewriter) {
      typewriter.classList.add("animate")
    }
  }

  /**
   * Animate hero buttons
   */
  animateButtons() {
    this.heroButtons.style.opacity = "1"
    this.heroButtons.style.animation = "fadeUp 0.6s ease-out forwards"
  }

  /**
   * Show all content immediately (for reduced motion)
   */
  showAllContent() {
    this.heroTitle.style.opacity = "1"
    this.heroSubtitle.style.opacity = "1"
    this.heroButtons.style.opacity = "1"

    const words = this.heroTitle.querySelectorAll(".hero-word")
    words.forEach((word) => {
      word.style.opacity = "1"
      word.style.transform = "translateY(0)"
    })

    const typewriter = this.heroSubtitle.querySelector(".typewriter")
    if (typewriter) {
      typewriter.style.width = "100%"
      typewriter.style.borderRight = "none"
    }
  }
}

// Initialize hero animations
document.addEventListener("DOMContentLoaded", () => {
  new HeroAnimations()
})
