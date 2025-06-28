// Mute Toggle Script
function toggleMute() {
  const video = document.getElementById('bgVideo');
  const icon = document.getElementById('muteIcon');
  video.muted = !video.muted;
  icon.className = video.muted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill';
}

document.getElementById("showLoginBtn").addEventListener("click", () => {
  loginContainer.style.display = "flex";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";

  // Show only login box
  loginBox.classList.add("show");
  signupBox.classList.remove("show");
  signupBox.style.display = "none"; // <- force hide
  loginBox.style.display = "block"; // <- show login
});

document.getElementById("toSignup").addEventListener("click", () => {
  loginBox.classList.remove("show");
  signupBox.classList.add("show");
  loginBox.style.display = "none"; // <- hide login
  signupBox.style.display = "block"; // <- show signup
});

document.getElementById("toLogin").addEventListener("click", () => {
  signupBox.classList.remove("show");
  loginBox.classList.add("show");
  signupBox.style.display = "none"; // <- hide signup
  loginBox.style.display = "block"; // <- show login
});

function closeModal() {
  loginContainer.style.display = "none";
  overlay.style.display = "none";
  loginBox.classList.remove("show");
  signupBox.classList.remove("show");
  loginBox.style.display = "none";
  signupBox.style.display = "none";
  document.body.style.overflow = "";
}
// Function to toggle password visibility
function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  icon.classList.toggle("bi-eye");
  icon.classList.toggle("bi-eye-slash");
}
