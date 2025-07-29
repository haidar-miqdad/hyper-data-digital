/**
 * Skills section with animated progress bars
 */

class SkillBars {
  constructor() {
    this.skillItems = document.querySelectorAll(".skill-item")
    this.animated = false

    this.init()
  }

  init() {
    this.setupScrollObserver()
  }

  /**
   * Setup intersection observer for skill bars
   */
  setupScrollObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated) {
            this.animateSkillBars()
            this.animated = true
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.5,
      },
    )

    const skillsSection = document.getElementById("expertise")
    if (skillsSection) {
      observer.observe(skillsSection)
    }
  }

  /**
   * Animate all skill bars
   */
  animateSkillBars() {
    this.skillItems.forEach((item, index) => {
      setTimeout(() => {
        this.animateSkillBar(item)
      }, index * 200)
    })
  }

  /**
   * Animate individual skill bar
   * @param {HTMLElement} skillItem - Skill item element
   */
  animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector(".skill-progress")
    const percentage = skillItem.querySelector(".skill-percentage")
    const targetWidth = progressBar.dataset.width
    const targetValue = percentage.dataset.target

    if (!progressBar || !percentage) return

    // Animate progress bar width
    progressBar.classList.add("animate")
    progressBar.style.width = targetWidth + "%"

    // Animate counter
    window.animateCounter(percentage, Number.parseInt(targetValue))
  }
}

// Initialize skill bars
document.addEventListener("DOMContentLoaded", () => {
  new SkillBars()
})

// Declare animateCounter function
function animateCounter(element, targetValue) {
  let current = 0
  const interval = setInterval(() => {
    if (current >= targetValue) {
      clearInterval(interval)
    } else {
      current++
      element.textContent = current + "%"
    }
  }, 10)
}
