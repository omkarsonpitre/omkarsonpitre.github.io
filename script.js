/**
 * Omkar Sonpitre Portfolio - Interactive Scripts
 * Features: Typewriter, Filtering, Mobile Drawer, Modals, WhatsApp Form
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typewriter Effect
  const words = [
    'Video Editor 🎬',
    'Graphic Designer 🎨',
    'Digital Marketer 📈',
    'Founder of omiii.studio ✨'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById('typewriter');
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseEnd = 1800;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
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

  // 3. Portfolio Tab Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // 4. Active Nav Item Spy on Scroll
  const sections = document.querySelectorAll('section[id]');
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

    // Navbar background blur intensity on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (scrollY > 50) {
        navbar.style.background = 'rgba(9, 10, 15, 0.92)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
      } else {
        navbar.style.background = 'rgba(9, 10, 15, 0.75)';
        navbar.style.boxShadow = 'none';
      }
    }
  });

  // 5. Dynamic Footer Year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// 6. Project Modal Handlers
function openModal(title, description, linkUrl) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalLink = document.getElementById('modal-link');

  if (modal && modalTitle && modalDescription && modalLink) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalLink.href = linkUrl;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// 7. Interactive WhatsApp Form Handler
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const contact = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  // Create formatted WhatsApp message
  const whatsappNumber = '918999667962';
  const text = `*New Portfolio Inquiry - omiii.studio*%0A%0A` +
               `*Name:* ${encodeURIComponent(name)}%0A` +
               `*Contact:* ${encodeURIComponent(contact)}%0A` +
               `*Service Required:* ${encodeURIComponent(service)}%0A` +
               `*Project Details:* ${encodeURIComponent(message)}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
}
