'use strict';

// DATOS PÚBLICOS DE CONTACTO. Completá estos campos antes de publicar.
// WhatsApp: código de país + número internacional, solo dígitos, sin + ni espacios.
// Ejemplo de formato únicamente: '54911XXXXXXXX'. No uses ese ejemplo como número real.
const CONTACT = Object.freeze({
  whatsapp: '',
  email: '',
  message: '¡Hola! Me gustaría conversar sobre un proyecto con Tithomas Programming.'
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacion');
if (menuButton && navigation) {
  document.documentElement.classList.add('js-nav');
  menuButton.hidden = false;
  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(max-width: 760px)').addEventListener('change', () => setMenu(false));
}

const phone = CONTACT.whatsapp.trim();
const email = CONTACT.email.trim();
const channels = {
  whatsapp: /^\d{8,15}$/.test(phone) ? `https://wa.me/${phone}?text=${encodeURIComponent(CONTACT.message)}` : null,
  email: /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email) ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Consulta de proyecto — Tithomas Programming')}` : null
};

document.querySelectorAll('[data-contact]').forEach((link) => {
  const url = channels[link.dataset.contact];
  if (url) {
    link.href = url;
    link.removeAttribute('aria-disabled');
    link.removeAttribute('tabindex');
    link.removeAttribute('role');
    link.removeAttribute('aria-describedby');
    if (link.dataset.contact === 'whatsapp') {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  } else {
    link.addEventListener('click', (event) => event.preventDefault());
  }
});
const contactStatus = document.querySelector('#contact-status');
if (contactStatus) {
  const pending = [];
  if (!channels.whatsapp) pending.push('WhatsApp');
  if (!channels.email) pending.push('email');
  contactStatus.textContent = pending.length ? `Pendiente de configurar: ${pending.join(' y ')}.` : 'Elegí el canal que prefieras para contarnos tu idea.';
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// El contenido permanece visible sin JavaScript o sin IntersectionObserver.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('is-pending');
      observer.observe(element);
    }
  });
}
