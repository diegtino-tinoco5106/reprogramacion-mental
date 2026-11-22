(() => {
  const progress = document.querySelector('.reading-progress');
  if (!progress) return;
  let ticking = false;
  function updateProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progress.style.width = Math.max(0, Math.min(100, pct)) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  updateProgress();
  // La galería se reactivará cuando se incorporen las fotografías nuevas.
  const dialog = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const close = document.getElementById('lightbox-close');
  if (dialog && img && caption && close) {
    document.querySelectorAll('.gallery-tile').forEach(button => {
      button.addEventListener('click', () => {
        img.src = button.dataset.full;
        img.alt = button.querySelector('img')?.alt || 'Fotografía';
        caption.textContent = button.dataset.caption || '';
        if (typeof dialog.showModal === 'function') dialog.showModal();
      });
    });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }
})();