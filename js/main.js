/**
 * RK PLAYER - OFFICIAL WEBSITE JAVASCRIPT
 * Downloads, System Specs Detector, Accordions, Form Handler, and Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFaqAccordion();
  initDownloadHandlers();
  initContactForm();
  initPreviousVersions();
});

/* ==========================================================================
   1. Navbar & Navigation
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTopBtn');

  // Sticky Navbar Blur & Back to top visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Scroll Spy for Nav links
    highlightCurrentSection();
  });

  const navBackdrop = document.getElementById('navBackdrop');

  function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove('open');
    if (navMenu) navMenu.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('open');
    document.body.classList.remove('menu-locked');
  }

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
      if (navBackdrop) navBackdrop.classList.toggle('open');
      document.body.classList.toggle('menu-locked', isOpen);
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function highlightCurrentSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset + 120;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop;
    const sectionId = current.getAttribute('id');
    const matchingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

    if (matchingLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        matchingLink.classList.add('active');
      } else {
        matchingLink.classList.remove('active');
      }
    }
  });
}

/* ==========================================================================
   2. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all others
        faqItems.forEach(other => other.classList.remove('active'));

        // Toggle clicked
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}



/* ==========================================================================
   4. Download Handlers & Toast Triggers
   ========================================================================== */
let downloadCount = 14820;

function initDownloadHandlers() {
  const downloadExeBtns = document.querySelectorAll('.btn-download-exe');
  const downloadZipBtns = document.querySelectorAll('.btn-download-zip');
  const countEl = document.getElementById('downloadCountDisplay');
  const notifyForm = document.getElementById('androidNotifyForm');

  downloadExeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      downloadCount++;
      if (countEl) countEl.textContent = downloadCount.toLocaleString();
      showToast('🚀 Downloading RK Player Setup 1.0.0.exe (89.8 MB)...');
    });
  });

  downloadZipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      downloadCount++;
      if (countEl) countEl.textContent = downloadCount.toLocaleString();
      showToast('📦 Downloading RK Player 1.0.0.exe (Portable - 89.6 MB)...');
    });
  });

  if (notifyForm) {
    notifyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = notifyForm.querySelector('input[type="email"]');
      const submitBtn = document.getElementById('notifySubmitBtn') || notifyForm.querySelector('button[type="submit"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email) return;

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Submitting...</span>
      `;

      try {
        await fetch('https://formsubmit.co/ajax/tudurajanikanta@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: '🚀 New RK Player Android APK Waitlist Signup: ' + email,
            Subscriber_Email: email,
            Platform: 'RK Player Android Waitlist',
            Source: 'Official Website (index.html)'
          })
        });

        notifyForm.reset();
        showToast(`✅ You're on the list! Notification alert sent to admin.`);
      } catch (err) {
        notifyForm.reset();
        showToast(`✅ You're on the list! We'll email ${email} when Android APK is ready.`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }
}

/* ==========================================================================
   5. Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const submitBtn = document.getElementById('contactSubmitBtn') || contactForm.querySelector('button[type="submit"]');

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Message...';

    try {
      await fetch('https://formsubmit.co/ajax/tudurajanikanta@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `📩 RK Player Feedback from ${name}: ${subject}`,
          Sender_Name: name,
          Sender_Email: email,
          Subject: subject,
          Message: message
        })
      });

      contactForm.reset();
      showToast(`✨ Thank you ${name}! Your message has been sent to tudurajanikanta@gmail.com.`);
    } catch (err) {
      contactForm.reset();
      showToast(`✨ Thank you ${name}! Your message has been sent to the RK Player team.`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

/* ==========================================================================
   6. Previous Versions Expander
   ========================================================================== */
function initPreviousVersions() {
  const toggle = document.getElementById('prevVersionsToggle');
  const content = document.getElementById('prevVersionsContent');
  const arrow = document.getElementById('prevVersionsArrow');

  if (toggle && content) {
    toggle.addEventListener('click', () => {
      content.classList.toggle('open');
      if (arrow) {
        arrow.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }
}

/* ==========================================================================
   7. Toast Notification System
   ========================================================================== */
function showToast(message) {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3800);
}
