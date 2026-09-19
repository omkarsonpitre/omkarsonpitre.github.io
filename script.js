/**
 * Omkar Sonpitre Portfolio - Interactive Scripts
 * Features: Typewriter, In-Site YouTube Shorts Player, Image Lightbox, Mobile Nav, WhatsApp Form
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typewriter Effect - Digital Marketing Primary
  const roles = [
    'Digital Marketer 📈',
    'YouTube SEO Specialist 🚀',
    'Content Strategist 💡',
    'Video Editor 🎬',
    'Graphic Designer 🎨'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById('typewriter');
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseEnd = 1800;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Active Nav Item Spy on Scroll & Navbar Background
  const sections = document.querySelectorAll('section[id]');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-list a[href*='${sectionId}']`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });

    if (navbar) {
      if (scrollY > 50) {
        navbar.style.background = 'rgba(9, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      } else {
        navbar.style.background = 'rgba(9, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
      }
    }
  });

  // 4. Dynamic Footer Year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// 5. In-Site YouTube Shorts Player Modal
function openVideoModal(videoId, title) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  const modalTitle = document.getElementById('modal-video-title');

  if (modal && iframe) {
    // Using youtube-nocookie and autoplay
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    if (modalTitle && title) {
      modalTitle.textContent = title;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');

  if (modal && iframe) {
    // Resetting iframe src stops the audio and video immediately
    iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// 6. Image Lightbox Modal (Thumbnails & Social Media Creatives)
function openImageLightbox(imgSrc, caption) {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (lightbox && lightboxImg) {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = caption || 'Portfolio Image Preview';
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || '';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeImageLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (lightbox) {
    lightbox.classList.remove('active');
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = 'auto';
  }
}

// 7. Global Keyboard Handler (Escape Key closes any open modal)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeVideoModal();
    closeImageLightbox();
  }
});

// 8. Interactive WhatsApp Contact Form Handler
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const contact = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  const whatsappNumber = '918999667962';
  const text = `*New Portfolio Inquiry - Omkar Sonpitre*%0A%0A` +
               `*Name:* ${encodeURIComponent(name)}%0A` +
               `*Contact:* ${encodeURIComponent(contact)}%0A` +
               `*Area of Interest:* ${encodeURIComponent(service)}%0A` +
               `*Message Details:* ${encodeURIComponent(message)}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
  window.open(whatsappUrl, '_blank');
}
