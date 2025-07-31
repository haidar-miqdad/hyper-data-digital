/**
 * Contact form with enhanced UX
 */

class ContactForm {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.submitBtn = this.form?.querySelector(".submit-btn")
    this.btnText = this.submitBtn?.querySelector(".btn-text")
    this.btnSpinner = this.submitBtn?.querySelector(".btn-spinner")

    this.init()
  }

  init() {
    this.setupFormValidation()
    this.setupFloatingLabels()
    this.setupFormSubmission()
  }

  /**
   * Setup floating label animations
   */
  setupFloatingLabels() {
    const inputs = this.form?.querySelectorAll(".form-input")

    inputs?.forEach((input) => {
      // Set initial state
      this.updateLabelState(input)

      // Handle focus/blur events
      input.addEventListener("focus", () => {
        this.updateLabelState(input)
      })

      input.addEventListener("blur-sm", () => {
        this.updateLabelState(input)
      })

      input.addEventListener("input", () => {
        this.updateLabelState(input)
      })
    })
  }

  /**
   * Update floating label state
   * @param {HTMLElement} input - Input element
   */
  updateLabelState(input) {
    const label = input.nextElementSibling
    if (!label || !label.classList.contains("floating-label")) return

    if (input.value || input === document.activeElement) {
      label.classList.add("active")
    } else {
      label.classList.remove("active")
    }
  }

  /**
   * Setup form validation
   */
  setupFormValidation() {
    const inputs = this.form?.querySelectorAll(".form-input")

    inputs?.forEach((input) => {
      input.addEventListener("blur-sm", () => {
        this.validateField(input)
      })

      input.addEventListener("input", () => {
        this.clearFieldError(input)
      })
    })
  }

  /**
   * Validate individual field
   * @param {HTMLElement} field - Field to validate
   * @returns {boolean} Validation result
   */
  validateField(field) {
    const value = field.value.trim()
    let isValid = true
    let errorMessage = ""

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      isValid = false
      errorMessage = "This field is required"
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        errorMessage = "Please enter a valid email address"
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage)
    } else {
      this.clearFieldError(field)
    }

    return isValid
  }

  /**
   * Show field error
   * @param {HTMLElement} field - Field with error
   * @param {string} message - Error message
   */
  showFieldError(field, message) {
    this.clearFieldError(field)

    field.classList.add("border-red-500")

    const errorDiv = document.createElement("div")
    errorDiv.className = "field-error text-red-500 text-sm mt-1"
    errorDiv.textContent = message

    field.parentNode.appendChild(errorDiv)
  }

  /**
   * Clear field error
   * @param {HTMLElement} field - Field to clear error from
   */
  clearFieldError(field) {
    field.classList.remove("border-red-500")

    const errorDiv = field.parentNode.querySelector(".field-error")
    if (errorDiv) {
      errorDiv.remove()
    }
  }

  /**
   * Setup form submission
   */
  setupFormSubmission() {
    this.form?.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleFormSubmit()
    })
  }

  /**
   * Handle form submission
   */
  async handleFormSubmit() {
    // Validate all fields
    const inputs = this.form.querySelectorAll(".form-input[required]")
    let isFormValid = true

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isFormValid = false
      }
    })

    if (!isFormValid) {
      this.showFormMessage("Please correct the errors above.", "error")
      return
    }

    // Show loading state
    this.setLoadingState(true)

    try {
      // Simulate form submission
      await this.submitForm()

      // Show success message
      this.showFormMessage("Thank you! Your message has been sent successfully.", "success")
      this.form.reset()

      // Reset floating labels
      const inputs = this.form.querySelectorAll(".form-input")
      inputs.forEach((input) => {
        this.updateLabelState(input)
      })
    } catch (error) {
      this.showFormMessage("Sorry, there was an error sending your message. Please try again.", "error")
    } finally {
      this.setLoadingState(false)
    }
  }

  /**
   * Simulate form submission
   * @returns {Promise} Promise that resolves after delay
   */
  submitForm() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000) // Simulate network delay
    })
  }

  /**
   * Set loading state
   * @param {boolean} isLoading - Loading state
   */
  setLoadingState(isLoading) {
    if (!this.submitBtn || !this.btnText || !this.btnSpinner) return

    if (isLoading) {
      this.submitBtn.disabled = true
      this.btnText.classList.add("hidden")
      this.btnSpinner.classList.remove("hidden")
      this.submitBtn.classList.add("opacity-75")
    } else {
      this.submitBtn.disabled = false
      this.btnText.classList.remove("hidden")
      this.btnSpinner.classList.add("hidden")
      this.submitBtn.classList.remove("opacity-75")
    }
  }

  /**
   * Show form message
   * @param {string} message - Message to show
   * @param {string} type - Message type (success/error)
   */
  showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = this.form.querySelector(".form-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    // Create new message
    const messageDiv = document.createElement("div")
    messageDiv.className = `form-message p-4 rounded-lg mb-4 ${
      type === "success"
        ? "bg-green-100 text-green-700 border border-green-200"
        : "bg-red-100 text-red-700 border border-red-200"
    }`
    messageDiv.textContent = message

    // Insert message at top of form
    this.form.insertBefore(messageDiv, this.form.firstChild)

    // Auto-remove success messages
    if (type === "success") {
      setTimeout(() => {
        messageDiv.remove()
      }, 5000)
    }
  }
}

// Initialize contact form
document.addEventListener("DOMContentLoaded", () => {
  new ContactForm()
})
