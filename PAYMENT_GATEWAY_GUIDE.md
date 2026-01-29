# Payment Gateway Integration Guide

## Option 1: Flutterwave Integration (Recommended for Tanzania)

### Step 1: Sign Up for Flutterwave
1. Go to [flutterwave.com](https://flutterwave.com)
2. Sign up for a business account
3. Complete KYC verification
4. Get your API keys (Public and Secret)

### Step 2: Add Flutterwave to Your Website

Add this to your HTML before closing `</body>` tag:

```html
<script src="https://checkout.flutterwave.com/v3.js"></script>
```

### Step 3: Update Your Donation Form JavaScript

Replace the current donation form handler with:

```javascript
// Donation form submission with Flutterwave
document.querySelector('.donate-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let amount;
    const activeBtn = document.querySelector('.amount-btn.active');
    const customAmount = document.querySelector('.custom-amount').value;

    if (customAmount) {
        amount = customAmount;
    } else if (activeBtn) {
        amount = activeBtn.dataset.amount;
    }

    if (amount && amount > 0) {
        // Initialize Flutterwave payment
        FlutterwaveCheckout({
            public_key: "FLWPUBK_TEST-your-public-key-here", // Replace with your public key
            tx_ref: "oof-" + Date.now(),
            amount: amount,
            currency: "USD", // or "TZS" for Tanzanian Shilling
            country: "TZ",
            payment_options: "card,mobilemoney,ussd,banktransfer",
            customer: {
                email: "donor@example.com", // You can make this dynamic
                phone_number: "+255000000000",
                name: "Anonymous Donor",
            },
            customizations: {
                title: "Opulent Outreach Foundation",
                description: "Donation to support community empowerment",
                logo: "https://your-website.com/opulent_logo.png",
            },
            callback: function (data) {
                if (data.status === "successful") {
                    showMessage(`Thank you for your $${amount} donation! Payment confirmed.`, 'success');
                    // You can send confirmation to your server here
                    sendDonationConfirmation(data);
                } else {
                    showMessage('Payment was not completed. Please try again.', 'error');
                }
            },
            onclose: function() {
                // User closed the payment modal
                console.log('Payment modal closed');
            }
        });
    } else {
        showMessage('Please select or enter a donation amount.', 'error');
    }
});

// Function to send donation confirmation to your server
function sendDonationConfirmation(paymentData) {
    // Send payment confirmation to your backend
    fetch('/confirm-donation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            transaction_id: paymentData.transaction_id,
            amount: paymentData.amount,
            currency: paymentData.currency,
            customer: paymentData.customer,
            status: paymentData.status
        })
    });
}
```

## Option 2: Stripe Integration (For International Donations)

### Step 1: Sign Up for Stripe
1. Go to [stripe.com](https://stripe.com)
2. Create account and complete verification
3. Apply for nonprofit rates (if eligible)
4. Get your publishable key

### Step 2: Add Stripe to Your Website

```html
<script src="https://js.stripe.com/v3/"></script>
```

### Step 3: Stripe Implementation

```javascript
// Initialize Stripe
const stripe = Stripe('pk_test_your_publishable_key_here'); // Replace with your key

// Donation form with Stripe
document.querySelector('.donate-form').addEventListener('submit', async function (e) {
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
        // Create payment intent on your server first
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount * 100, // Stripe uses cents
                currency: 'usd'
            })
        });

        const { client_secret } = await response.json();

        // Confirm payment with Stripe
        const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardElement, // You'll need to create card element
                billing_details: {
                    name: 'Anonymous Donor'
                }
            }
        });

        if (result.error) {
            showMessage('Payment failed: ' + result.error.message, 'error');
        } else {
            showMessage(`Thank you for your $${amount} donation!`, 'success');
        }
    }
});
```

## Option 3: Simple PayPal Integration

### PayPal Button (Easiest Implementation)

```html
<!-- PayPal donation button -->
<div id="paypal-button-container"></div>

<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>
<script>
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: document.querySelector('.selected-amount').textContent || '25'
                },
                description: 'Donation to Opulent Outreach Foundation'
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            showMessage('Thank you for your donation, ' + details.payer.name.given_name + '!', 'success');
        });
    }
}).render('#paypal-button-container');
</script>
```

## Comparison Table

| Gateway | Local Payments | International | Setup Difficulty | Fees |
|---------|---------------|---------------|------------------|------|
| **Flutterwave** | ✅ Excellent | ✅ Good | ⭐⭐ Medium | 3.8% |
| **Stripe** | ❌ Limited | ✅ Excellent | ⭐⭐⭐ Hard | 2.9% + $0.30 |
| **PayPal** | ⭐ Basic | ✅ Excellent | ⭐ Easy | 2.9% + fixed |
| **Selcom** | ✅ Excellent | ❌ No | ⭐⭐ Medium | 3-5% |

## Recommended Implementation Steps

1. **Start with Flutterwave** for comprehensive Tanzania coverage
2. **Add PayPal** for easy international donations
3. **Keep manual payment option** as backup
4. **Consider Stripe** later for advanced features

## Security Considerations

- Never store card details on your server
- Use HTTPS for all payment pages
- Implement webhook verification
- Set up fraud detection
- Comply with PCI DSS standards

## Legal Requirements

- Register your business for payment processing
- Set up proper tax documentation
- Ensure compliance with local financial regulations
- Implement proper record keeping for donations

Would you like me to implement any of these payment gateways for your website?