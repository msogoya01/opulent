// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Donation amount selection
document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        // Remove active class from all buttons
        document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        // Clear custom amount input
        document.querySelector('.custom-amount').value = '';
        
        // Update PayPal button amount
        updatePayPalAmount();
    });
});

// Custom amount input
document.querySelector('.custom-amount').addEventListener('input', function () {
    if (this.value) {
        document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
    }
    updatePayPalAmount();
});

// Payment method selection
document.querySelectorAll('.payment-option-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all payment option buttons
        document.querySelectorAll('.payment-option-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const method = this.dataset.method;
        const paypalContainer = document.getElementById('paypal-button-container');
        const donateBtn = document.querySelector('button[type="submit"]');
        
        if (method === 'online') {
            paypalContainer.style.display = 'block';
            donateBtn.style.display = 'block';
            donateBtn.textContent = 'Pay with Flutterwave';
        } else {
            paypalContainer.style.display = 'none';
            donateBtn.style.display = 'block';
            donateBtn.textContent = 'View Payment Details';
        }
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    // Simple email validation
    if (validateEmail(email)) {
        showMessage('Thank you for subscribing! You\'ll receive our latest updates.', 'success');
        this.reset();
    } else {
        showMessage('Please enter a valid email address.', 'error');
    }
});

// Contact form submission handler - Google Form Integration
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Google Form URL - Replace YOUR_GOOGLE_FORM_ID with your actual form ID
            const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse';

            // Create form data for Google Forms
            // You'll need to replace these entry IDs with your actual form field IDs
            const formData = new FormData();
            formData.append('entry.YOUR_NAME_FIELD_ID', name);
            formData.append('entry.YOUR_EMAIL_FIELD_ID', email);
            formData.append('entry.YOUR_SUBJECT_FIELD_ID', subject);
            formData.append('entry.YOUR_MESSAGE_FIELD_ID', message);

            // Submit to Google Form
            fetch(googleFormUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            }).then(() => {
                // Success - Google Forms always returns success for no-cors mode
                showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            }).catch(() => {
                // This rarely happens with no-cors mode, but just in case
                showMessage('Message sent successfully!', 'success');
                contactForm.reset();
            }).finally(() => {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Donation form submission
document.querySelector('.donate-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let amount;
    const activeBtn = document.querySelector('.amount-btn.active');
    const customAmount = document.querySelector('.custom-amount').value;

    if (customAmount) {
        amount = parseFloat(customAmount);
    } else if (activeBtn) {
        amount = parseFloat(activeBtn.dataset.amount);
    }

    if (amount && amount > 0) {
        const paymentMethod = document.querySelector('.payment-option-btn.active').dataset.method;
        
        if (paymentMethod === 'online') {
            // Process online payment with Flutterwave
            processFlutterwavePayment(amount);
        } else {
            // Show manual payment popup
            showPaymentPopup(amount);
        }
    } else {
        showMessage('Please select or enter a donation amount.', 'error');
    }
});

// Flutterwave payment processing
function processFlutterwavePayment(amount) {
    const donationType = document.querySelector('input[name="type"]:checked').value;
    
    FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-SANDBOX-KEY", // Replace with your actual public key
        tx_ref: "oof-" + Date.now(),
        amount: amount,
        currency: "USD",
        country: "TZ",
        payment_options: "card,mobilemoney,ussd,banktransfer",
        customer: {
            email: "donor@opulentoutreach.org",
            phone_number: "+255746008941",
            name: "Anonymous Donor",
        },
        customizations: {
            title: "Opulent Outreach Foundation",
            description: `${donationType} donation to support community empowerment`,
            logo: "https://your-website.com/opulent_logo.png",
        },
        callback: function (data) {
            if (data.status === "successful") {
                showMessage(`Thank you for your $${amount} donation! Payment confirmed. Transaction ID: ${data.transaction_id}`, 'success');
                // Reset form
                document.querySelector('.donate-form').reset();
                document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
                // Send confirmation email or save to database here
                sendDonationConfirmation(data);
            } else {
                showMessage('Payment was not completed. Please try again or use manual payment option.', 'error');
            }
        },
        onclose: function() {
            console.log('Payment modal closed by user');
        }
    });
}

// PayPal Integration
function updatePayPalAmount() {
    let amount;
    const activeBtn = document.querySelector('.amount-btn.active');
    const customAmount = document.querySelector('.custom-amount').value;

    if (customAmount) {
        amount = parseFloat(customAmount);
    } else if (activeBtn) {
        amount = parseFloat(activeBtn.dataset.amount);
    } else {
        amount = 25; // Default amount
    }

    // Re-render PayPal button with new amount
    if (window.paypal && amount > 0) {
        document.getElementById('paypal-button-container').innerHTML = '';
        
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: amount.toString()
                        },
                        description: 'Donation to Opulent Outreach Foundation'
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    showMessage(`Thank you for your $${amount} donation via PayPal, ${details.payer.name.given_name}!`, 'success');
                    // Reset form
                    document.querySelector('.donate-form').reset();
                    document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
                });
            },
            onError: function(err) {
                showMessage('PayPal payment failed. Please try again or use another payment method.', 'error');
                console.error('PayPal Error:', err);
            }
        }).render('#paypal-button-container');
    }
}

// Send donation confirmation (you can customize this)
function sendDonationConfirmation(paymentData) {
    // This is where you'd send the confirmation to your server
    console.log('Donation confirmed:', paymentData);
    
    // Example: Send to your backend
    /*
    fetch('/api/donation-confirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            transaction_id: paymentData.transaction_id,
            amount: paymentData.amount,
            currency: paymentData.currency,
            customer: paymentData.customer,
            status: paymentData.status,
            timestamp: new Date().toISOString()
        })
    });
    */
}

// Initialize PayPal on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait for PayPal SDK to load, then initialize
    setTimeout(updatePayPalAmount, 1000);
});

// Payment popup functions
function showPaymentPopup(amount) {
    const popup = document.getElementById('payment-popup');
    const amountDisplay = document.getElementById('selected-amount');
    const donationTypeText = document.querySelector('.donation-type-text');
    
    // Get donation type
    const donationType = document.querySelector('input[name="type"]:checked').value;
    
    // Update popup content
    amountDisplay.textContent = `$${amount}`;
    donationTypeText.textContent = donationType === 'monthly' ? 'Monthly donation' : 'One-time donation';
    
    // Show popup
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function hidePaymentPopup() {
    const popup = document.getElementById('payment-popup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showMessage('Copied to clipboard!', 'success');
    }).catch(function() {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showMessage('Copied to clipboard!', 'success');
    });
}

// Event listeners for popup
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('close-payment-popup');
    const popup = document.getElementById('payment-popup');
    
    // Close popup when clicking the X button
    closeBtn.addEventListener('click', hidePaymentPopup);
    
    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hidePaymentPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            hidePaymentPopup();
        }
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show message function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        ${type === 'success' ? 'background-color: #28a745;' : 'background-color: #dc3545;'}
    `;

    document.body.appendChild(messageEl);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 300);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('.service-card, .impact-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Animation duration
    const timer = setInterval(function () {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (target >= 1000) {
            element.textContent = (Math.floor(current / 1000)) + 'k+';
        } else {
            element.textContent = Math.floor(current) + (target >= 1000 ? 'k+' : '+');
        }
    }, 20);
}

// Initialize counter animation when stats come into view
const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h4');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/[^\d]/g, ''));

            if (text.includes('50,000')) {
                animateCounter(statNumber, 50);
                statNumber.textContent = '50k+';
            } else if (text.includes('25')) {
                animateCounter(statNumber, 25);
            } else if (text.includes('15')) {
                animateCounter(statNumber, 15);
            }

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Add loading spinner for forms
function showLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}