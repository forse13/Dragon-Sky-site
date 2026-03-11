(() => {
  const bg = document.querySelector('.main-bg');
  if (!bg) return;

  const type = (bg.dataset.bgType || 'image').toLowerCase();
  const imageUrl = bg.dataset.bgImage;
  const videoUrl = bg.dataset.bgVideo;

  if (type === 'video' && videoUrl) {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    bg.appendChild(video);
  } else if (imageUrl) {
    bg.style.backgroundImage = `url("${imageUrl}")`;
    if (imageUrl.toLowerCase().includes('logo_main.svg')) {
      bg.classList.add('main-bg-logo');
    }
  }

  document.body.classList.add('has-custom-main-bg');
})();
