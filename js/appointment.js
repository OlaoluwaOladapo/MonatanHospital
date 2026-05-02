// =============================================
//  MONATAN CENTRAL — appointment.js
//  Multi-step form logic + validation + submit
// =============================================

// ===== ELEMENTS =====
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

const toStep2Btn = document.getElementById('toStep2');
const toStep3Btn = document.getElementById('toStep3');
const backToStep1Btn = document.getElementById('backToStep1');
const backToStep2Btn = document.getElementById('backToStep2');

const stepIndicators = document.querySelectorAll('.appt-step');
const form = document.getElementById('appointmentForm');
const submitBtn = document.getElementById('submitBtn');
const successBlock = document.getElementById('apptSuccess');
const errorBlock = document.getElementById('apptError');
const reviewBlock = document.getElementById('reviewBlock');

// Set minimum date to today for the date picker
const dateInput = document.getElementById('prefDate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// ===== STEP NAVIGATION =====
function goToStep(stepNum) {
  // Hide all steps
  [step1, step2, step3].forEach(s => s.classList.add('hidden'));

  // Show target step
  if (stepNum === 1) step1.classList.remove('hidden');
  if (stepNum === 2) step2.classList.remove('hidden');
  if (stepNum === 3) {
    step3.classList.remove('hidden');
    buildReview();
  }

  // Update step indicators
  stepIndicators.forEach((indicator, index) => {
    indicator.classList.remove('active', 'completed');
    if (index + 1 === stepNum) indicator.classList.add('active');
    if (index + 1 < stepNum) indicator.classList.add('completed');
  });

  // Scroll to top of form
  document.querySelector('.appt-form-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== VALIDATION =====
function validateStep1() {
  let valid = true;

  const fields = [
    { id: 'firstName', msg: 'Please enter your first name' },
    { id: 'lastName', msg: 'Please enter your last name' },
    { id: 'phone', msg: 'Please enter your phone number' },
    { id: 'age', msg: 'Please enter your age' },
  ];

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const errorMsg = input.parentElement.querySelector('.form-error-msg');
    if (!input.value.trim()) {
      input.classList.add('invalid');
      if (errorMsg) errorMsg.classList.add('show');
      valid = false;
    } else {
      input.classList.remove('invalid');
      if (errorMsg) errorMsg.classList.remove('show');
    }
  });

  // Check gender radio
  const genderSelected = document.querySelector('input[name="gender"]:checked');
  if (!genderSelected) {
    valid = false;
  }

  return valid;
}

function validateStep2() {
  let valid = true;

  const fields = [
    { id: 'service', msg: 'Please select a service' },
    { id: 'prefDate', msg: 'Please select a date' },
    { id: 'prefTime', msg: 'Please select a time' },
  ];

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const errorMsg = input.parentElement.querySelector('.form-error-msg');
    if (!input.value) {
      input.classList.add('invalid');
      if (errorMsg) errorMsg.classList.add('show');
      valid = false;
    } else {
      input.classList.remove('invalid');
      if (errorMsg) errorMsg.classList.remove('show');
    }
  });

  // Check visit type radio
  const visitSelected = document.querySelector('input[name="visitType"]:checked');
  if (!visitSelected) {
    valid = false;
  }

  return valid;
}

// ===== BUILD REVIEW BLOCK =====
function buildReview() {
  const fields = [
    { label: 'First Name', value: document.getElementById('firstName').value },
    { label: 'Last Name', value: document.getElementById('lastName').value },
    { label: 'Phone', value: document.getElementById('phone').value },
    { label: 'Email', value: document.getElementById('email').value || 'Not provided' },
    { label: 'Age', value: document.getElementById('age').value },
    { label: 'Gender', value: document.querySelector('input[name="gender"]:checked')?.value || '—' },
    { label: 'Service', value: document.getElementById('service').value },
    { label: 'Preferred Date', value: document.getElementById('prefDate').value },
    { label: 'Preferred Time', value: document.getElementById('prefTime').value },
    { label: 'Visit Type', value: document.querySelector('input[name="visitType"]:checked')?.value || '—' },
    { label: 'Concern', value: document.getElementById('symptoms').value || 'Not provided' },
  ];

  reviewBlock.innerHTML = fields.map(f => `
    <div class="review-item">
      <span class="review-item__label">${f.label}</span>
      <span class="review-item__value">${f.value}</span>
    </div>
  `).join('');
}

// ===== BUTTON EVENTS =====
if (toStep2Btn) {
  toStep2Btn.addEventListener('click', () => {
    if (validateStep1()) goToStep(2);
  });
}

if (toStep3Btn) {
  toStep3Btn.addEventListener('click', () => {
    if (validateStep2()) goToStep(3);
  });
}

if (backToStep1Btn) {
  backToStep1Btn.addEventListener('click', () => goToStep(1));
}

if (backToStep2Btn) {
  backToStep2Btn.addEventListener('click', () => goToStep(2));
}

// ===== FORM SUBMISSION =====
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    errorBlock.classList.remove('show');

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Hide form steps, show success
        step3.querySelector('.form-step__title').style.display = 'none';
        step3.querySelector('.form-step__sub').style.display = 'none';
        reviewBlock.style.display = 'none';
        step3.querySelector('.appt-notice').style.display = 'none';
        step3.querySelector('.form-nav').style.display = 'none';
        successBlock.classList.add('show');
        // Update step indicator
        stepIndicators.forEach(s => s.classList.remove('active'));
        stepIndicators[2].classList.add('completed');
      } else {
        errorBlock.classList.add('show');
        submitBtn.textContent = 'Confirm Appointment ✅';
        submitBtn.disabled = false;
      }
    } catch (err) {
      errorBlock.classList.add('show');
      submitBtn.textContent = 'Confirm Appointment ✅';
      submitBtn.disabled = false;
    }
  });
}

// ===== CLEAR INVALID ON INPUT =====
document.querySelectorAll('.appt-form input, .appt-form select').forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('invalid');
    const errorMsg = input.parentElement.querySelector('.form-error-msg');
    if (errorMsg) errorMsg.classList.remove('show');
  });
});