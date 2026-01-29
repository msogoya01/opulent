# Payment Gateway Setup Instructions

Your website now supports **three payment methods**:

1. **Flutterwave** (Online payments - Cards, Mobile Money)
2. **PayPal** (International credit cards)
3. **Manual Transfer** (Bank/Mobile Money details popup)

## 🚀 **Quick Setup (15 minutes)**

### **Step 1: Set up PayPal (Easiest - 5 minutes)**

1. **Go to [PayPal Developer](https://developer.paypal.com/)**
2. **Log in** with your PayPal business account
3. **Create a new app**:
   - App Name: "Opulent Outreach Donations"
   - Merchant ID: (will be generated)
4. **Copy your Client ID**
5. **Replace in your HTML**:
   ```html
   <!-- Find this line in index.html -->
   <script src="https://www.paypal.com/sdk/js?client-id=AQlW8kYiP7WwLrV9RdT3HK-VHy6V_yU_ZZy7s_Cz_y_y_example&currency=USD"></script>
   
   <!-- Replace the client-id with your actual Client ID -->
   <script src="https://www.paypal.com/sdk/js?client-id=YOUR_ACTUAL_CLIENT_ID&currency=USD"></script>
   ```

**That's it! PayPal donations will work immediately.**

### **Step 2: Set up Flutterwave (10 minutes)**

1. **Go to [Flutterwave.com](https://flutterwave.com/)**
2. **Sign up** for a business account
3. **Complete KYC verification** (may take 1-2 days)
4. **Get your API keys**:
   - Go to Settings → API Keys
   - Copy your **Public Key** (starts with FLWPUBK_)
5. **Replace in your JavaScript**:
   ```javascript
   // Find this line in script.js
   public_key: "FLWPUBK_TEST-SANDBOX-KEY",
   
   // Replace with your actual public key
   public_key: "FLWPUBK_LIVE-your-actual-key-here",
   ```

**Flutterwave will then handle:**
- Credit/Debit cards
- M-Pesa, Tigo Pesa, Airtel Money
- Bank transfers
- USSD payments

## 🎯 **How It Works Now**

### **User Experience:**
1. **User selects amount** ($25, $50, $100, $250, or custom)
2. **User chooses payment method**:
   - **Online Payment**: Cards, Mobile Money via Flutterwave
   - **Manual Transfer**: Shows bank/mobile money details
3. **User completes payment**:
   - **Online**: Secure payment forms
   - **Manual**: Copy payment details and transfer manually

### **For Online Payments:**
- **PayPal Button**: For international donors with PayPal accounts
- **Flutterwave Button**: For local and international card/mobile money payments
- **Instant confirmation** and receipt

### **For Manual Payments:**
- **Bank details popup** with copy-to-clipboard functionality
- **Mobile money numbers** for M-Pesa, Tigo Pesa, Airtel Money
- **Payment instructions** and contact information

## 💰 **Fee Comparison**

| Payment Method | Transaction Fee | Best For |
|---------------|----------------|----------|
| **PayPal** | 2.9% + $0.30 | International donors |
| **Flutterwave** | 3.8% | Local Tanzanian payments |
| **Manual Transfer** | Free* | Cost-conscious donors |

*Bank/mobile money may charge their own fees

## 🔧 **Advanced Configuration**

### **Customize Flutterwave Settings:**

In `script.js`, you can modify:

```javascript
FlutterwaveCheckout({
    public_key: "YOUR_PUBLIC_KEY",
    tx_ref: "oof-" + Date.now(),
    amount: amount,
    currency: "USD", // Change to "TZS" for Tanzanian Shilling
    country: "TZ",
    payment_options: "card,mobilemoney,ussd,banktransfer", // Remove options you don't want
    customer: {
        email: "donor@opulentoutreach.org",
        phone_number: "+255746008941",
        name: "Anonymous Donor",
    },
    customizations: {
        title: "Opulent Outreach Foundation",
        description: "Donation to support community empowerment",
        logo: "https://your-website.com/opulent_logo.png", // Update with your logo URL
    },
    // ... rest of configuration
});
```

### **Test Mode vs Live Mode:**

- **Test Mode**: Use sandbox keys for testing
- **Live Mode**: Use live keys for real payments
- Always test thoroughly before going live!

## 📊 **Payment Analytics**

Both Flutterwave and PayPal provide dashboards where you can:
- Track all donations
- Generate reports
- Download transaction data
- Set up automatic bank transfers

## 🛡️ **Security Features**

✅ **PCI DSS Compliant**: Both gateways handle card security
✅ **Fraud Protection**: Built-in fraud detection
✅ **HTTPS Required**: Secure transmission
✅ **No Sensitive Data Storage**: Card details never touch your server
✅ **3D Secure**: Additional authentication for cards

## 🚨 **Important Notes**

1. **Test thoroughly** before going live
2. **Keep API keys secure** - never commit them to public repositories
3. **Set up webhooks** for payment confirmations (advanced)
4. **Monitor transactions** regularly
5. **Comply with local regulations** for nonprofit donations

## 📞 **Support Contacts**

- **Flutterwave Support**: support@flutterwave.com
- **PayPal Support**: developer.paypal.com/support
- **Technical Issues**: Check browser console for error messages

## 🎉 **You're Ready!**

Your donation system now supports:
- ✅ International credit card donations (PayPal)
- ✅ Local Tanzanian mobile money and cards (Flutterwave)
- ✅ Manual bank transfers (existing popup system)
- ✅ Professional payment flow
- ✅ Instant payment confirmation
- ✅ Mobile-responsive design

**Total setup time: ~15 minutes for basic functionality**

Start with PayPal (easiest), then add Flutterwave when ready. Your donors now have multiple convenient ways to support the Opulent Outreach Foundation! 🌟