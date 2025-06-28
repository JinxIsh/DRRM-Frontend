// Mute Toggle Script
function toggleMute() {
  const video = document.getElementById('bgVideo');
  const icon = document.getElementById('muteIcon');
  video.muted = !video.muted;
  icon.className = video.muted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill';
}

const loginBox = document.getElementById('loginBox');
const overlay = document.getElementById('overlay');
const loginContainer = document.getElementById('loginContainer');
const showLoginBtn = document.getElementById('showLoginBtn');
const closeLoginBtn = document.getElementById('closeLoginBtn');

showLoginBtn.addEventListener('click', () => {
  loginContainer.style.display = 'flex';
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

closeLoginBtn.addEventListener('click', () => {
  loginContainer.style.display = 'none';
  overlay.style.display = 'none';
  document.body.style.overflow = '';
});

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.getElementById('togglePasswordIcon');
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleIcon.classList.toggle('bi-eye');
  toggleIcon.classList.toggle('bi-eye-slash');
}
