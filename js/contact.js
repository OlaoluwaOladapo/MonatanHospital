// =============================================
//  MONATAN CENTRAL — contact.js
//  Contact form submission via Formspree
// =============================================

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('formSuccess');
const errorMsg = document.getElementById('formError');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Update button state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Hide any previous messages
    successMsg.classList.remove('show');
    errorMsg.classList.remove('show');

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Success
        successMsg.classList.add('show');
        form.reset();
        submitBtn.textContent = 'Message Sent ✅';
      } else {
        // Server error
        errorMsg.classList.add('show');
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      }
    } catch (error) {
      // Network error
      errorMsg.classList.add('show');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });
}