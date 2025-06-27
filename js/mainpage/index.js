// Mute Toggle Script
function toggleMute() {
  const video = document.getElementById('bgVideo');
  const icon = document.getElementById('muteIcon');
  video.muted = !video.muted;
  icon.className = video.muted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill';
}
