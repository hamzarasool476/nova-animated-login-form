// NOVA login UI interactions. Authentication is a front-end demo only.
const visibilityToggle = document.querySelector("#visibilityToggle");
const visibilityStatus = document.querySelector("#visibilityStatus");
const loginCard = document.querySelector("#loginCard");
const hiddenState = document.querySelector("#hiddenState");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#passwordToggle");
const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const formMessage = document.querySelector("#formMessage");
const toast = document.querySelector("#toast");

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function setPanelVisible(visible) {
  visibilityToggle.checked = visible;
  loginCard.classList.toggle("is-hidden", !visible);
  hiddenState.classList.toggle("is-hidden", visible);
  loginCard.inert = !visible;
  visibilityStatus.textContent = visible ? "Login panel is visible" : "Login panel is hidden";
  document.body.classList.toggle("panel-on", visible);
  if (visible) {
    // Wait for the entrance transition before moving focus.
    window.setTimeout(() => emailInput.focus({ preventScroll: true }), 240);
  } else {
    passwordInput.value = "";
    formMessage.textContent = "";
    clearErrors();
  }
}
visibilityToggle.addEventListener("change", () => setPanelVisible(visibilityToggle.checked));

passwordToggle.addEventListener("click", () => {
  const isVisible = passwordInput.type === "text";
  passwordInput.type = isVisible ? "password" : "text";
  passwordToggle.setAttribute("aria-label", isVisible ? "Show password" : "Hide password");
  passwordToggle.setAttribute("aria-pressed", String(!isVisible));
});

function clearErrors() {
  emailError.textContent = "";
  passwordError.textContent = "";
  emailInput.closest(".input-wrap").classList.remove("is-valid");
}
function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
emailInput.addEventListener("input", () => {
  emailError.textContent = "";
  if (validEmail(emailInput.value.trim())) emailInput.closest(".input-wrap").classList.add("is-valid");
  else emailInput.closest(".input-wrap").classList.remove("is-valid");
});
passwordInput.addEventListener("input", () => { passwordError.textContent = ""; });

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  formMessage.textContent = "";
  let valid = true;

  if (!validEmail(emailInput.value.trim())) {
    emailError.textContent = "Enter a valid email address.";
    emailInput.focus();
    valid = false;
  }
  if (passwordInput.value.length < 8) {
    passwordError.textContent = "Use at least 8 characters.";
    if (valid) passwordInput.focus();
    valid = false;
  }
  if (!valid) return;

  // Demo response only. Replace this section with a real HTTPS API request.
  formMessage.textContent = "Looks good! Connect your authentication API to sign in.";
  showToast("Demo mode: no account details were sent.");
});

document.querySelector("#forgotLink").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Password reset flow can be connected here.");
});
document.querySelector("#signupLink").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Your account creation screen can be connected here.");
});
document.querySelector("#privacyLink").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Add your privacy policy URL before publishing.");
});
document.querySelectorAll(".social-button").forEach((button) => {
  button.addEventListener("click", () => showToast(`${button.dataset.provider} sign-in needs OAuth setup.`));
});

// Start with the login details fully hidden, as requested.
setPanelVisible(false);
