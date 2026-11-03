/* Isolated player. No framework, global variables, or dependency on script.js. */
(() => {
  'use strict';
  const dialog = document.querySelector('#tp-intro');
  const video = dialog?.querySelector('video');
  const skip = dialog?.querySelector('.tp-intro__skip');
  if (!dialog || !video || !skip || typeof dialog.showModal !== 'function') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const sessionKey = 'tp-intro-seen-v1';
  let seen = false;
  try { seen = sessionStorage.getItem(sessionKey) === 'true'; } catch { /* Storage can be unavailable. */ }
  // Avoid a video download on deep links, return visits, and constrained connections.
  if (seen || location.hash || reducedMotion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '')) return;

  const previousFocus = document.activeElement;
  const previousOverflow = document.body.style.overflow;
  const controller = new AbortController();
  const { signal } = controller;
  const timers = new Set();
  let finished = false;
  let fallback = false;
  let loadTimer;
  let stallTimer;
  let finaleTimer;
  const later = (callback, delay) => {
    const id = setTimeout(() => { timers.delete(id); callback(); }, delay);
    timers.add(id);
    return id;
  };
  const cancel = (id) => { clearTimeout(id); timers.delete(id); };
  const stopVideo = () => {
    video.pause();
    video.removeAttribute('src');
    video.load(); // Cancel pending media requests and release decoded frames.
  };
  const cleanup = () => {
    controller.abort();
    timers.forEach(clearTimeout);
    timers.clear();
    stopVideo();
    if (dialog.open) dialog.close();
    document.body.style.overflow = previousOverflow;
    if (previousFocus instanceof HTMLElement && previousFocus !== document.body) {
      previousFocus.focus({ preventScroll: true });
    } else {
      const heading = document.querySelector('#hero-title');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
      }
    }
  };
  const finish = (immediate = false) => {
    if (finished) return;
    finished = true;
    if (immediate) { cleanup(); return; }
    dialog.dataset.state = 'leaving';
    later(cleanup, 650);
  };
  const showFallback = () => {
    if (finished || fallback) return;
    fallback = true;
    cancel(loadTimer);
    cancel(stallTimer);
    cancel(finaleTimer);
    stopVideo();
    dialog.dataset.state = 'fallback';
    dialog.style.setProperty('--intro-progress', '1');
    // Short abstract identity sequence, never a fake human/video scene.
    later(() => finish(), 2400);
  };
  const showFinale = () => {
    if (finished || fallback) return;
    if (dialog.dataset.state !== 'finale') {
      dialog.dataset.state = 'finale';
      finaleTimer = later(() => finish(), 2000);
    }
  };
  const armStallTimer = () => {
    cancel(stallTimer);
    stallTimer = later(showFallback, 1800);
  };

  // Schedule the absolute escape hatch before opening any overlay.
  later(() => finish(true), 12500);
  try {
    dialog.dataset.state = 'loading';
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    skip.focus({ preventScroll: true });
    try { sessionStorage.setItem(sessionKey, 'true'); } catch { /* No persistence required. */ }
    skip.addEventListener('click', () => finish(true), { signal });
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); finish(true); }, { signal });
    window.addEventListener('pagehide', () => finish(true), { signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) finish(true); }, { signal });
    reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) finish(true); }, { signal });
    video.addEventListener('error', showFallback, { signal });
    video.addEventListener('waiting', armStallTimer, { signal });
    video.addEventListener('stalled', armStallTimer, { signal });
    video.addEventListener('playing', () => {
      if (finished || fallback) return;
      cancel(loadTimer);
      cancel(stallTimer);
      if (dialog.dataset.state !== 'finale') dialog.dataset.state = 'playing';
    }, { signal });
    video.addEventListener('timeupdate', () => {
      if (finished || fallback) return;
      cancel(stallTimer);
      dialog.style.setProperty('--intro-progress', String(Math.min(video.currentTime / 10, 1)));
      if (video.currentTime >= 8) showFinale();
      if (video.currentTime >= 10) finish();
    }, { signal });
    video.addEventListener('ended', showFinale, { signal });
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    loadTimer = later(showFallback, 1800);
    video.src = new URL(dialog.dataset.video, document.baseURI).href;
    const playback = video.play();
    if (playback?.catch) playback.catch(showFallback);
  } catch {
    finish(true);
  }
})();
