/**
 * Testimonials carousel component
 */

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

class TestimonialCarousel {
  constructor() {
    this.carousel = document.getElementById("testimonial-carousel")
    this.slides = document.querySelectorAll(".testimonial-slide")
    this.indicators = document.querySelectorAll(".carousel-indicator")
    this.currentSlide = 0
    this.isPlaying = true
    this.interval = null

    this.init()
  }

  init() {
    this.setupIndicators()
    this.setupAutoPlay()
    this.setupHoverPause()
  }

  /**
   * Setup indicator click handlers
   */
  setupIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index)
      })
    })
  }

  /**
   * Setup auto-play functionality
   */
  setupAutoPlay() {
    this.startAutoPlay()
  }

  /**
   * Start auto-play
   */
  startAutoPlay() {
    if (prefersReducedMotion()) return

    this.interval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  /**
   * Stop auto-play
   */
  stopAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  /**
   * Setup hover pause functionality
   */
  setupHoverPause() {
    if (this.carousel) {
      this.carousel.addEventListener("mouseenter", () => {
        this.stopAutoPlay()
      })

      this.carousel.addEventListener("mouseleave", () => {
        if (this.isPlaying) {
          this.startAutoPlay()
        }
      })
    }
  }

  /**
   * Go to specific slide
   * @param {number} slideIndex - Index of slide to show
   */
  goToSlide(slideIndex) {
    // Remove active class from current slide and indicator
    this.slides[this.currentSlide].classList.remove("active")
    this.indicators[this.currentSlide].classList.remove("active")

    // Update current slide
    this.currentSlide = slideIndex

    // Add active class to new slide and indicator
    this.slides[this.currentSlide].classList.add("active")
    this.indicators[this.currentSlide].classList.add("active")
  }

  /**
   * Go to next slide
   */
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(nextIndex)
  }

  /**
   * Go to previous slide
   */
  prevSlide() {
    const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1
    this.goToSlide(prevIndex)
  }
}

// Initialize carousel
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialCarousel()
})
