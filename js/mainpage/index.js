// Mute Toggle Script: Toggles background video sound and updates icon
function toggleMute() {
  const video = document.getElementById('bgVideo');
  const icon = document.getElementById('muteIcon');
  video.muted = !video.muted;
  icon.className = video.muted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill';
}

// Password Visibility Toggle: Toggles input type and eye icon for password fields
function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  icon.classList.toggle("bi-eye", !isHidden);
  icon.classList.toggle("bi-eye-slash", isHidden);
}

// Show Login Modal: Displays the login modal and overlay
document.getElementById("showLoginBtn").addEventListener("click", () => {
  document.getElementById("loginContainer").style.display = "flex";
  document.getElementById("overlay").style.display = "block";
  document.body.style.overflow = "hidden"; // Prevents background scrolling

  // Show login box and hide signup box
  document.getElementById("loginBox").classList.add("show");
  document.getElementById("signupBox").classList.remove("show");
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
});

// Switch to Sign Up: Animates to show the sign-up box
document.getElementById("toSignup").addEventListener("click", () => {
  document.getElementById("loginBox").classList.remove("show");
  document.getElementById("signupBox").classList.add("show");
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
});

// Switch to Login: Animates to show the login box
document.getElementById("toLogin").addEventListener("click", () => {
  document.getElementById("signupBox").classList.remove("show");
  document.getElementById("loginBox").classList.add("show");
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
});

// Close Modal: Hides both login and signup modals and the overlay
function closeModal() {
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("loginBox").classList.remove("show");
  document.getElementById("signupBox").classList.remove("show");
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "none";
  document.body.style.overflow = ""; // Restores scroll
}

// DOM Loaded: Runs after HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // SIGNUP FORM VALIDATION
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const birthday = document.getElementById("signupBirthday").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      const passwordInput = document.getElementById("signupPassword");
      const confirmInput = document.getElementById("confirmPassword");

      // Check if any field is empty
      if (!name || !email || !birthday || !password || !confirmPassword) {
        e.preventDefault();
        alert("Please fill in all fields.");
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        e.preventDefault();
        alert("Passwords do not match!");
        passwordInput.classList.add("is-invalid");
        confirmInput.classList.add("is-invalid");
        return;
      }

      // On success, reset error states and close modal
      passwordInput.classList.remove("is-invalid");
      confirmInput.classList.remove("is-invalid");
      alert("Signup successful!");
      closeModal();
    });

    // Remove red border when editing confirm password
    document.getElementById("confirmPassword").addEventListener("input", function () {
      this.classList.remove("is-invalid");
    });
  }

// LOGIN FORM HANDLER
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
    } else {
      // Animate to OTP Box
      document.getElementById("loginBox").classList.remove("show");
      document.getElementById("loginBox").style.display = "none";
      const otpBox = document.getElementById("otpBox");
      otpBox.style.display = "block";
      setTimeout(() => otpBox.classList.add("show"), 50);
    }
  });
}

// OTP FORM HANDLER
const otpForm = document.getElementById("otpForm");
if (otpForm) {
  otpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const otp = document.getElementById("otpCode").value.trim();
    if (otp === "123456") { // replace with backend verification logic later
      alert("Login successful!");
      closeModal();
    } else {
      alert("Invalid OTP. Please try again.");
    }
  });
}

  // LIVE PASSWORD MATCH FEEDBACK
  const confirmInput = document.getElementById('confirmPassword');
  if (confirmInput) {
    confirmInput.addEventListener('input', function () {
      const password = document.getElementById('signupPassword').value;
      // Add red border if mismatch
      if (this.value !== password) {
        this.classList.add('is-invalid');
      } else {
        this.classList.remove('is-invalid');
      }
    });
  }
});
