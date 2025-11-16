document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('#mobileNav a');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    mobileLinks.forEach(link => link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    }));
  }

  // Mega menu toggles for mobile
  document.querySelectorAll('.mobile-nav .has-sub').forEach(button => {
    button.addEventListener('click', () => {
      button.nextElementSibling.classList.toggle('open');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  // Testimonials slider (home page)
  const testimonials = document.querySelectorAll('.testimonial-card');
  let testimonialIndex = 0;

  const showTestimonial = index => {
    testimonials.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
  };

  document.querySelectorAll('[data-slider="prev"]').forEach(btn =>
    btn.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(testimonialIndex);
    })
  );

  document.querySelectorAll('[data-slider="next"]').forEach(btn =>
    btn.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    })
  );

  if (testimonials.length) {
    showTestimonial(0);
  }

  // Insights filters
  const filterButtons = document.querySelectorAll('[data-filter]');
  const insightCards = document.querySelectorAll('.insight-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      insightCards.forEach(card => {
        const matches = category === 'all' || card.dataset.category === category;
        card.style.display = matches ? 'block' : 'none';
      });
    });
  });

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  const contactMessage = document.getElementById('contactMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const requiredFields = ['name', 'email', 'phone', 'audience'];
      const isValid = requiredFields.every(id => contactForm[id].value.trim() !== '');

      if (!isValid) {
        contactMessage.textContent = 'Please complete all required fields.';
        contactMessage.className = 'form-message error';
        contactMessage.style.display = 'block';
        return;
      }

      contactMessage.textContent = 'Thank you. Our advisors will contact you shortly.';
      contactMessage.className = 'form-message success';
      contactMessage.style.display = 'block';
      contactForm.reset();
    });
  }

  // Agent form
  const agentForm = document.getElementById('agentForm');
  const agentMessage = document.getElementById('agentMessage');

  if (agentForm) {
    agentForm.addEventListener('submit', e => {
      e.preventDefault();
      if (agentForm.name.value.trim() === '' || agentForm.email.value.trim() === '') {
        agentMessage.textContent = 'Please add your name and email to proceed.';
        agentMessage.className = 'form-message error';
        agentMessage.style.display = 'block';
        return;
      }

      agentMessage.textContent = 'Application received. The agency team will reach you within 2 business days.';
      agentMessage.className = 'form-message success';
      agentMessage.style.display = 'block';
      agentForm.reset();
    });
  }
});
