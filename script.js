(() => {
  const progress = document.querySelector('.reading-progress');
  let ticking = false;
  function updateProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll ? (window.scrollY / maxScroll) * 100 : 0;
    progress.style.width = Math.max(0,Math.min(100,pct))+'%';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  updateProgress();
  const dialog = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  document.querySelectorAll('.gallery-tile').forEach(button => {
    button.addEventListener('click', () => {
      img.src = button.dataset.full;
      img.alt = button.querySelector('img').alt;
      caption.textContent = button.dataset.caption;
      if (typeof dialog.showModal === "function") dialog.showModal();
    });
  });
  document.getElementById('lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if(e.target === dialog) dialog.close(); });
})();
