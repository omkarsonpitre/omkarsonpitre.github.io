document.addEventListener('DOMContentLoaded', () => {
  const roles = ['Digital Marketer', 'YouTube SEO Specialist', 'Content Strategist', 'Video Editor', 'Graphic Designer'];
  let roleIndex = 0, charIndex = 0, deleting = false;
  const typewriter = document.getElementById('typewriter');
  function typeEffect() {
    if (!typewriter) return;
    const role = roles[roleIndex];
    typewriter.textContent = deleting ? role.slice(0, --charIndex) : role.slice(0, ++charIndex);
    let delay = deleting ? 50 : 100;
    if (!deleting && charIndex === role.length) { deleting = true; delay = 1600; }
    if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
    setTimeout(typeEffect, delay);
  }
  typeEffect();

  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { toggle?.classList.remove('active'); menu?.classList.remove('active'); }));
  toggle?.addEventListener('click', () => { toggle.classList.toggle('active'); menu.classList.toggle('active'); });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    sections.forEach(section => {
      const link = document.querySelector(`.nav-list a[href="#${section.id}"]`);
      if (link) link.classList.toggle('active', y >= section.offsetTop - 150 && y < section.offsetTop + section.offsetHeight - 150);
    });
    const nav = document.getElementById('navbar');
    if (nav) { nav.style.background = y > 50 ? 'rgba(9, 10, 15, 0.95)' : 'rgba(9, 10, 15, 0.8)'; nav.style.boxShadow = y > 50 ? '0 10px 30px rgba(0,0,0,.5)' : 'none'; }
  });
  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('.work-tab').forEach(tab => tab.addEventListener('click', () => {
    const target = tab.dataset.workTab;
    document.querySelectorAll('.work-tab').forEach(item => item.classList.toggle('active', item === tab));
    document.querySelectorAll('.work-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.workPanel === target));
  }));

  document.querySelectorAll('.short-card').forEach(card => card.addEventListener('click', () => openVideoModal(card.dataset.video, card.dataset.title)));
  document.querySelectorAll('[data-lightbox]').forEach(item => item.addEventListener('click', () => openImageLightbox(item.dataset.lightbox, item.dataset.caption)));
  document.querySelectorAll('[data-resume-open]').forEach(button => button.addEventListener('click', openResumeModal));
  document.querySelectorAll('[data-resume-close]').forEach(button => button.addEventListener('click', closeResumeModal));
  document.querySelector('[data-lightbox-close]')?.addEventListener('click', closeImageLightbox);
  document.getElementById('resume-modal')?.addEventListener('click', e => { if (e.target.id === 'resume-modal') closeResumeModal(); });
  document.getElementById('image-lightbox')?.addEventListener('click', e => { if (e.target.id === 'image-lightbox') closeImageLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeResumeModal(); closeImageLightbox(); closeVideoModal(); } });
});

function openResumeModal() { const modal = document.getElementById('resume-modal'); if (modal) { modal.classList.add('active'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; document.getElementById('resume-name')?.focus(); } }
function closeResumeModal() { const modal = document.getElementById('resume-modal'); if (modal) { modal.classList.remove('active'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; } }
function downloadResume() { const link = document.createElement('a'); link.href = 'assets/Omkar_Sonpitre_Resume.pdf'; link.download = 'Omkar_Sonpitre_Resume.pdf'; document.body.appendChild(link); link.click(); link.remove(); closeResumeModal(); }
function openVideoModal(videoId, title) { let modal = document.getElementById('video-modal'); if (!modal) { modal = document.createElement('div'); modal.id = 'video-modal'; modal.className = 'modal-overlay'; modal.innerHTML = '<div class="video-modal-card"><button class="modal-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button><h3 id="video-modal-title"></h3><div class="video-frame"><iframe id="video-iframe" title="Video player" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div>'; document.body.appendChild(modal); modal.querySelector('.modal-close').addEventListener('click', closeVideoModal); modal.addEventListener('click', e => { if (e.target === modal) closeVideoModal(); }); } modal.querySelector('#video-iframe').src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`; modal.querySelector('#video-modal-title').textContent = title || 'Video'; modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeVideoModal() { const modal = document.getElementById('video-modal'); if (modal) { modal.querySelector('#video-iframe').src = ''; modal.classList.remove('active'); document.body.style.overflow = ''; } }
function openImageLightbox(src, caption) { const modal = document.getElementById('image-lightbox'); if (modal) { document.getElementById('lightbox-img').src = src; document.getElementById('lightbox-caption').textContent = caption || ''; modal.classList.add('active'); document.body.style.overflow = 'hidden'; } }
function closeImageLightbox() { const modal = document.getElementById('image-lightbox'); if (modal) { modal.classList.remove('active'); document.getElementById('lightbox-img').src = ''; document.body.style.overflow = ''; } }


function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const name = document.getElementById('contact-name').value.trim();
  const company = document.getElementById('contact-company').value.trim();
  const service = document.getElementById('contact-service').value;
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const text = `New Portfolio Contact%0A%0AName: ${encodeURIComponent(name)}%0ACompany: ${encodeURIComponent(company)}%0AService: ${encodeURIComponent(service)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/918999667962?text=${text}`, '_blank', 'noopener');
  form.reset();
}



function showWorkPanel(target) {
  document.querySelectorAll('.work-tab').forEach(tab => {
    const active = tab.dataset.workTab === target;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.work-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.workPanel === target));
}


async function handleResumeSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const replyTo = form.querySelector('[name="_replyto"]');
  const email = form.querySelector('[name="email"]');
  if (replyTo && email) replyTo.value = email.value;
  if (button) { button.disabled = true; button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending details...'; }
  try {
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false || result.success === 'false') {
      throw new Error(result.message || 'Email service error');
    }
    if (button) button.innerHTML = '<i class="fa-solid fa-check"></i> Details Sent — Downloading...';
    downloadResume();
  } catch (error) {
    // Keep the requested download usable even when the external email service is not activated.
    downloadResume();
    const status = document.getElementById('resume-status');
    if (status) status.textContent = 'Resume downloaded. Details email is pending FormSubmit activation for omkarsonpitre07@gmail.com.';
  }
}
