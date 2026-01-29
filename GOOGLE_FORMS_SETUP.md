# Google Forms Setup Guide for Contact Form

This guide will walk you through setting up Google Forms to receive messages from your website contact form and automatically email them to info@opulentoutreach.org.

## 🚀 **Step 1: Create Your Google Form**

1. **Go to [Google Forms](https://forms.google.com/)**
2. **Click "Create a new form" (+ icon)**
3. **Name your form**: "Opulent Outreach Contact Form"

## 📝 **Step 2: Add Form Fields**

Add these exact fields in this order:

### Field 1: Name
- **Question**: "Your Name"
- **Type**: Short answer
- **Required**: Yes

### Field 2: Email
- **Question**: "Your Email"
- **Type**: Short answer
- **Required**: Yes
- **Validation**: Go to Advanced → Response validation → Regular expression → Email address

### Field 3: Subject
- **Question**: "Subject"
- **Type**: Short answer
- **Required**: Yes

### Field 4: Message
- **Question**: "Your Message"
- **Type**: Paragraph
- **Required**: Yes

## ⚙️ **Step 3: Configure Form Settings**

1. **Click the Settings gear icon**
2. **General tab**:
   - ✅ Check "Collect email addresses"
   - ✅ Check "Limit to 1 response" (optional)
3. **Presentation tab**:
   - **Confirmation message**: "Thank you! We'll get back to you soon."

## 📧 **Step 4: Set Up Email Notifications**

1. **Click "Responses" tab**
2. **Click the 3 dots menu** → "Get email notifications for new responses"
3. **Enter**: info@opulentoutreach.org
4. **Click "Send"**

## 🔗 **Step 5: Get Form Integration Code**

### Method A: Get Entry IDs (for seamless integration)

1. **Click "Send" button** in your form
2. **Copy the shareable link**
3. **Open the link in a new tab**
4. **Right-click** → "View page source"
5. **Search for** `entry.` in the source code
6. **Find these patterns**:
   ```
   entry.123456789 (for Name field)
   entry.987654321 (for Email field)
   entry.555666777 (for Subject field)
   entry.111222333 (for Message field)
   ```

### Method B: Simple Redirect (easier setup)

If the above seems complex, you can simply redirect users to your Google Form.

## 🛠️ **Step 6: Update Your Website Code**

### Option A: Seamless Integration (Recommended)

1. **Open your `script.js` file**
2. **Find this line**:
   ```javascript
   const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse';
   ```
3. **Replace `YOUR_GOOGLE_FORM_ID`** with your actual form ID from the URL
4. **Replace the entry IDs** with the ones you found:
   ```javascript
   formData.append('entry.123456789', name);  // Replace with your Name field ID
   formData.append('entry.987654321', email); // Replace with your Email field ID
   formData.append('entry.555666777', subject); // Replace with your Subject field ID
   formData.append('entry.111222333', message); // Replace with your Message field ID
   ```

### Option B: Simple Redirect

Replace the contact form JavaScript with:

```javascript
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create pre-filled Google Form URL
            const baseUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform';
            const params = new URLSearchParams({
                'entry.NAME_FIELD_ID': name,
                'entry.EMAIL_FIELD_ID': email,
                'entry.SUBJECT_FIELD_ID': subject,
                'entry.MESSAGE_FIELD_ID': message
            });
            
            // Open Google Form in new tab
            window.open(`${baseUrl}?${params.toString()}`, '_blank');
            
            // Show success message
            showMessage('Redirecting to send your message...', 'success');
            contactForm.reset();
        });
    }
});
```

## 🔍 **Step 7: Find Your Form ID**

Your Google Form URL looks like:
```
https://docs.google.com/forms/d/1ABC123DEF456GHI789JKL/edit
```

Your Form ID is: `1ABC123DEF456GHI789JKL`

## ✅ **Step 8: Test Your Form**

1. **Fill out your website contact form**
2. **Submit it**
3. **Check**:
   - Google Form responses in your Google Drive
   - Email notification at info@opulentoutreach.org
   - Form works without errors

## 📊 **Benefits of Google Forms**

- ✅ **Completely free** and unlimited submissions
- ✅ **Automatic email notifications** to info@opulentoutreach.org
- ✅ **Response management** in Google Sheets
- ✅ **Spam protection** built-in
- ✅ **No monthly limits**
- ✅ **Professional and reliable**

## 🔧 **Troubleshooting**

### Common Issues:

1. **Form not submitting**:
   - Check that form ID and entry IDs are correct
   - Verify the Google Form is public

2. **Not receiving emails**:
   - Check spam folder
   - Verify email notification is set up correctly
   - Check Google Form responses tab

3. **Entry IDs not working**:
   - Use Method B (redirect) instead
   - Double-check the entry IDs in page source

## 🎯 **Quick Setup Summary**

1. Create Google Form with 4 fields (Name, Email, Subject, Message)
2. Set email notifications to info@opulentoutreach.org
3. Get form ID from URL
4. Update JavaScript with your form ID
5. Test and enjoy unlimited free contact form submissions!

## 💡 **Pro Tips**

- **Organize responses**: Link your form to a Google Sheet for better organization
- **Custom styling**: The current setup keeps your beautiful contact form design
- **Analytics**: Use Google Forms analytics to track submission patterns
- **Follow-up**: Set up auto-responders in Google Forms for immediate acknowledgment

Your contact form is now powered by Google Forms with unlimited free submissions! 🎉