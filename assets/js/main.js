/**
 * Main JavaScript functionality for {StartupName} website
 * Handles navigation, modals, form validation, and interactive components
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFAQ();
    initializeContactForm();
    initializeFileUpload();
    initializeNewsletterForm();
    initializeScrollEffects();
    initializeModals();
});

/**
 * Navigation functionality
 */
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle dropdown menus on desktop
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
        const submenu = dropdown.querySelector('.nav-submenu');
        if (!submenu) return;
        
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 1024) {
                submenu.style.display = 'flex';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 1024) {
                submenu.style.display = 'none';
            }
        });
    });
}

/**
 * FAQ accordion functionality
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', function() {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
                    if (otherQuestion && otherAnswer) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.classList.remove('active');
                    }
                }
            });
            
            // Toggle current item
            question.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('active', !isExpanded);
        });
    });
}

/**
 * Contact form validation and submission
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const requiredFields = contactForm.querySelectorAll('[required]');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Real-time validation
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(field);
        });
        
        field.addEventListener('input', function() {
            clearFieldError(field);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        
        // Validate all required fields
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate email format
        const emailField = contactForm.querySelector('#email');
        if (emailField && !validateEmail(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (isValid) {
            submitContactForm(contactForm, submitButton);
        }
    });
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    if (!value) {
        showFieldError(field, `${getFieldLabel(field)} is required`);
        return false;
    }
    
    // Special validation for specific fields
    if (fieldName === 'email' && !validateEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (fieldName === 'phone' && value && !validatePhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

/**
 * Show field error message
 */
function showFieldError(field, message) {
    const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
}

/**
 * Clear field error message
 */
function clearFieldError(field) {
    const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
}

/**
 * Get field label text
 */
function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : field.getAttribute('name');
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format
 */
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Submit contact form
 */
async function submitContactForm(form, submitButton) {
    const originalText = submitButton.textContent;
    
    try {
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate API call (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showFormSuccess('Thank you for your inquiry! We\'ll respond within 24 hours.');
        form.reset();
        
        // Clear file list
        const fileList = document.getElementById('file-list');
        if (fileList) {
            fileList.innerHTML = '';
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormError('Sorry, there was an error sending your message. Please try again or call us directly.');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

/**
 * Show form success message
 */
function showFormSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div class="success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        </div>
        <p>${message}</p>
    `;
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove after 10 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 10000);
}

/**
 * Show form error message
 */
function showFormError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.innerHTML = `
        <div class="error-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
        </div>
        <p>${message}</p>
    `;
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Remove after 10 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 10000);
}

/**
 * File upload functionality
 */
function initializeFileUpload() {
    const fileInput = document.getElementById('file-upload');
    const fileList = document.getElementById('file-list');
    const uploadArea = document.querySelector('.file-upload-area');
    
    if (!fileInput || !fileList || !uploadArea) return;
    
    // Handle file selection
    fileInput.addEventListener('change', function(event) {
        handleFileSelection(event.target.files);
    });
    
    // Handle drag and drop
    uploadArea.addEventListener('dragover', function(event) {
        event.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(event) {
        event.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(event) {
        event.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFileSelection(event.dataTransfer.files);
    });
    
    // Click to upload
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
}

/**
 * Handle file selection
 */
function handleFileSelection(files) {
    const fileList = document.getElementById('file-list');
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    
    Array.from(files).forEach(file => {
        // Validate file size
        if (file.size > maxSize) {
            showFileError(`${file.name} is too large. Maximum size is 10MB.`);
            return;
        }
        
        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            showFileError(`${file.name} is not a supported file type.`);
            return;
        }
        
        // Add file to list
        addFileToList(file);
    });
}

/**
 * Add file to upload list
 */
function addFileToList(file) {
    const fileList = document.getElementById('file-list');
    
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <div class="file-info">
            <span class="file-name">${file.name}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
        </div>
        <button type="button" class="file-remove" aria-label="Remove ${file.name}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>
    `;
    
    // Add remove functionality
    const removeButton = fileItem.querySelector('.file-remove');
    removeButton.addEventListener('click', function() {
        fileItem.remove();
    });
    
    fileList.appendChild(fileItem);
}

/**
 * Format file size for display
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Show file error message
 */
function showFileError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'file-error';
    errorDiv.textContent = message;
    
    const fileList = document.getElementById('file-list');
    fileList.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

/**
 * Newsletter form functionality
 */
function initializeNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const submitButton = form.querySelector('button[type="submit"]');
            
            if (!emailInput || !submitButton) return;
            
            const email = emailInput.value.trim();
            
            if (!validateEmail(email)) {
                showNewsletterError(form, 'Please enter a valid email address');
                return;
            }
            
            const originalText = submitButton.textContent;
            
            try {
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showNewsletterSuccess(form, 'Thank you for subscribing!');
                emailInput.value = '';
                
            } catch (error) {
                showNewsletterError(form, 'Subscription failed. Please try again.');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    });
}

/**
 * Show newsletter success message
 */
function showNewsletterSuccess(form, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'newsletter-message newsletter-success';
    messageDiv.textContent = message;
    
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

/**
 * Show newsletter error message
 */
function showNewsletterError(form, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'newsletter-message newsletter-error';
    messageDiv.textContent = message;
    
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

/**
 * Scroll effects and animations
 */
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .metric-card, .step-item, .advantage-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Modal functionality
 */
function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    modals.forEach(modal => {
        const closeButtons = modal.querySelectorAll('.modal-close');
        const modalOverlay = modal.querySelector('.modal-overlay');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                closeModal(modal);
            });
        });
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function() {
                closeModal(modal);
            });
        }
        
        // Close on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                closeModal(modal);
            }
        });
    });
}

/**
 * Open modal
 */
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus first focusable element
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

/**
 * Close modal
 */
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Utility function to debounce events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility function to throttle events
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePhone,
        formatFileSize,
        debounce,
        throttle
    };
}

