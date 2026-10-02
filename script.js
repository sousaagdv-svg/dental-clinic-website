/**
 * EVERMILES DENTAL CLINIC — INTERACTIVE SCRIPTS
 * Refined micro-interactions, GSAP animations & modals
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    initMotion();
  }

  function initMotion() {
/* ---------------------------------------------------------------
     BRAND MOTION IDENTITY
     Archetype: Premium — 350–600ms, expo/power3 easing, zero overshoot
     Signature easing: power3.out  |  Durations: 0.4s / 0.7s / 1.2s
     Entrance pattern: fade + 16–44px rise, never more than 1/3 screen
     --------------------------------------------------------------- */

  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({ ease: "power3.out", duration: 0.7 });

  // 1. HERO — choreographed sequence. Image leads, text follows.
  gsap.timeline({ defaults: { ease: "expo.out" } })
    .from(".hero-bg-image", { scale: 1.12, duration: 2.4, ease: "power2.out" })
    .from(".hero-overlay", { opacity: 0, duration: 1.6 }, 0)
    .from(".site-header", { y: -16, opacity: 0, duration: 1.1 }, 0.35)
    .from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.9 }, 0.55)
    .from(".hero-title", { y: 32, opacity: 0, duration: 1.15 }, 0.72)
    .from(".hero-subtitle", { y: 24, opacity: 0, duration: 1 }, 0.92)
    .from(".hero-cta-group", { y: 18, opacity: 0, duration: 0.9, stagger: 0.12 }, 1.1);

  // 2. HERO — ambient parallax drift (scrubbed, 6% only)
  gsap.to(".hero-bg-image", {
    yPercent: 6,
    ease: "none",
    scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
  });

  // 3. Section headers — one consistent reveal pattern everywhere
  gsap.utils.toArray(
    ".services-intro, .about-content-column, .team-intro, .gallery-intro, .testimonials-header-left"
  ).forEach(header => {
    gsap.from(header.children, {
      scrollTrigger: { trigger: header, start: "top 88%" },
      y: 26,
      opacity: 0,
      stagger: 0.09,
      duration: 0.9
    });
  });

  // 4. Eyebrows — drift in from the left
  gsap.utils.toArray(".section-eyebrow, .cta-eyebrow").forEach(eyebrow => {
    gsap.from(eyebrow, {
      scrollTrigger: { trigger: eyebrow, start: "top 93%" },
      opacity: 0,
      x: -12,
      duration: 0.8
    });
  });

  // 5. Diferenciais bar — lifts in, then items cascade
  gsap.from(".diferenciais-card", {
    scrollTrigger: { trigger: ".diferenciais-section", start: "top 92%" },
    y: 40,
    opacity: 0,
    duration: 1.1,
    ease: "expo.out"
  });

  gsap.from(".diferencial-item", {
    scrollTrigger: { trigger: ".diferenciais-card", start: "top 90%" },
    y: 18,
    opacity: 0,
    stagger: 0.08,
    duration: 0.7
  });

  // 6. Services — batched entrance keeps the stagger budget under 500ms
  ScrollTrigger.batch(".service-card", {
    start: "top 88%",
    interval: 0.12,
    batchMax: 6,
    onEnter: batch => gsap.fromTo(batch,
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.11, duration: 1, ease: "expo.out", overwrite: true }
    )
  });

  // 7. Services imagery — counter-scale settle inside the frame
  gsap.from(".service-img", {
    scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
    scale: 1.06,
    opacity: 0,
    stagger: 0.09,
    duration: 1.2,
    ease: "power2.out"
  });

  // 8. About — frame settles, script badge writes itself in
  gsap.from(".about-image-frame", {
    scrollTrigger: { trigger: ".about-section", start: "top 78%" },
    scale: 0.97,
    opacity: 0,
    duration: 1.3,
    ease: "expo.out"
  });

  gsap.from(".about-script-badge", {
    scrollTrigger: { trigger: ".about-section", start: "top 62%" },
    x: -18,
    rotation: -8,
    opacity: 0,
    duration: 1.6,
    ease: "power2.out"
  });

  // 9. About — stats counter roll-up
  gsap.utils.toArray(".stat-number").forEach(el => {
    const raw = el.textContent.trim();
    const num = parseFloat(raw.replace(/[^\d.]/g, ""));
    if (isNaN(num)) return;
    const suffix = raw.replace(/[\d.,]/g, "");
    const decimals = (raw.split(".")[1] || "").length;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: num,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate() {
        el.textContent = obj.v.toFixed(decimals).replace(".", ",") + suffix;
      }
    });
  });

  // 10. About — ambient parallax depth on the photograph
  gsap.to(".about-img", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: { trigger: ".about-image-frame", start: "top bottom", end: "bottom top", scrub: true }
  });

  // 11. Team — asymmetric stagger preserves the editorial rhythm
  gsap.from(".team-figure", {
    scrollTrigger: { trigger: ".team-composition", start: "top 84%" },
    y: 38,
    opacity: 0,
    stagger: 0.16,
    duration: 1.1,
    ease: "expo.out"
  });

  gsap.from(".team-figure-media img", {
    scrollTrigger: { trigger: ".team-composition", start: "top 84%" },
    scale: 1.07,
    duration: 1.5,
    ease: "power2.out"
  });

  // 12. Gallery — mosaic cascades left to right, top to bottom
  gsap.from(".gallery-item", {
    scrollTrigger: { trigger: ".gallery-mosaic", start: "top 85%" },
    y: 34,
    opacity: 0,
    stagger: { amount: 0.5, grid: "auto", from: "start" },
    duration: 0.95,
    ease: "expo.out"
  });

  // 13. Testimonials — soft cascade
  gsap.from(".testimonial-card", {
    scrollTrigger: { trigger: ".testimonials-grid", start: "top 88%" },
    y: 28,
    opacity: 0,
    stagger: 0.13,
    duration: 0.9
  });

  // 14. Final CTA — banner lifts, contents follow
  gsap.from(".final-cta-banner", {
    scrollTrigger: { trigger: ".final-cta-section", start: "top 90%" },
    y: 36,
    opacity: 0,
    duration: 1.1,
    ease: "expo.out"
  });

  gsap.from(".final-cta-banner .cta-left, .final-cta-banner .cta-center, .final-cta-banner .cta-right", {
    scrollTrigger: { trigger: ".final-cta-section", start: "top 88%" },
    y: 18,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8
  });

  // 15. Footer — quiet fade so the page settles instead of stopping
  gsap.from(".footer-top, .footer-bottom", {
    scrollTrigger: { trigger: ".site-footer", start: "top 95%" },
    opacity: 0,
    y: 14,
    stagger: 0.1,
    duration: 0.8
  });

  // 16. Refresh once fonts and images settle so trigger math is accurate
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener("load", refresh);
  } // end initMotion

  // --- EXISTING LOGIC ENHANCED ---

  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 1b. Microinteractions — arrows, icon badges and social icons
  if (!prefersReducedMotion && typeof gsap !== "undefined") {

    // Arrow nudge on hover for every CTA and card link
    gsap.utils.toArray(
      ".btn-header-cta, .btn-primary-hero, .btn-services-cta, .btn-cta-final, .service-arrow, .social-icon-link, .footer-logo"
    ).forEach(el => {
      const target = el.querySelector(".arrow") || el;
      el.addEventListener("mouseenter", () => {
        gsap.to(target, { x: 3, duration: 0.4, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(target, { x: 0, duration: 0.4, ease: "power2.out" });
      });
    });

    // Service icon badge lifts gently on card hover
    gsap.utils.toArray(".service-card").forEach(card => {
      const badge = card.querySelector(".service-icon-badge");
      if (!badge) return;
      card.addEventListener("mouseenter", () => {
        gsap.to(badge, { scale: 1.12, y: -2, duration: 0.45, ease: "back.out(1.6)" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(badge, { scale: 1, y: 0, duration: 0.45, ease: "power2.out" });
      });
    });

    // Diferencial icons breathe very slightly on hover
    gsap.utils.toArray(".diferencial-item").forEach(item => {
      const icon = item.querySelector(".diferencial-icon-box");
      if (!icon) return;
      item.addEventListener("mouseenter", () => {
        gsap.to(icon, { scale: 1.06, duration: 0.5, ease: "power2.out" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(icon, { scale: 1, duration: 0.5, ease: "power2.out" });
      });
    });

    // Testimonial arrow buttons — nudge in the direction pressed
    const bindArrow = (btnId, dir) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      btn.addEventListener("mouseenter", () => gsap.to(btn, { x: dir * 3, duration: 0.35 }));
      btn.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, duration: 0.35 }));
    };
    bindArrow("prevTestimonial", -1);
    bindArrow("nextTestimonial", 1);

    // Modal open / close animated with GSAP instead of CSS class only
    const animateModal = (modal, boxSelector, open) => {
      if (!modal || typeof gsap === "undefined") return;
      const box = modal.querySelector(boxSelector);
      if (!box) return;

      if (open) {
        gsap.fromTo(modal,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out", onStart: () => modal.classList.add("active") }
        );
        gsap.fromTo(box,
          { y: 28, scale: 0.97, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.55, ease: "expo.out" }
        );
      } else {
        gsap.to(box, { y: 18, scale: 0.98, opacity: 0, duration: 0.28, ease: "power2.in" });
        gsap.to(modal, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            modal.classList.remove("active");
            gsap.set(box, { clearProps: "all" });
          }
        });
      }
    };

    window.__animateModal = animateModal;
  }

  // 3. Booking Modal
  const bookingModal = document.getElementById('bookingModal');
  const openBookingBtns = document.querySelectorAll('[data-open-booking]');
  const closeBookingBtn = document.getElementById('closeBookingBtn');
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccessMsg = document.getElementById('bookingSuccessMsg');
  const serviceSelect = document.getElementById('serviceSelect');

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      if (service && serviceSelect) {
        serviceSelect.value = service;
      }
      if (window.__animateModal) {
        window.__animateModal(bookingModal, ".modal-box", true);
      } else {
        bookingModal.classList.add('active');
      }
      document.body.style.overflow = 'hidden';
    });
  });

  const closeBookingModal = () => {
    if (window.__animateModal) {
      window.__animateModal(bookingModal, ".modal-box", false);
    } else {
      bookingModal.classList.remove('active');
    }
    document.body.style.overflow = '';
  };

  if (closeBookingBtn) {
    closeBookingBtn.addEventListener('click', closeBookingModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeBookingModal();
      }
    });
  }

  // Handle booking form submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('.btn-submit-booking');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Enviando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        bookingForm.style.display = 'none';
        bookingSuccessMsg.style.display = 'block';
        setTimeout(() => {
          closeBookingModal();
          setTimeout(() => {
            bookingForm.reset();
            bookingForm.style.display = 'flex';
            bookingSuccessMsg.style.display = 'none';
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
          }, 400);
        }, 3000);
      }, 900);
    });
  }

  // 4. Depoimentos — carrossel horizontal infinito (CSS Marquee)
  // (A lógica de controle JS foi removida em favor de um sistema CSS de marquee contínuo)

  // 5. Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const closeMobileMenu = document.getElementById('closeMobileMenu');
  const mobileDrawer = document.getElementById('mobileMenuDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeDrawer = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', closeDrawer);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 6. Galeria Editorial — Lightbox minimalista
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const galleryItems = Array.from(document.querySelectorAll('[data-gallery-item]'));

  const gallerySources = galleryItems.map(el => ({
    full: el.dataset.full,
    caption: el.dataset.caption || ''
  }));

  let lightboxIndex = 0;
  let lastFocused = null;

  const renderLightboxImage = () => {
    const entry = gallerySources[lightboxIndex];
    if (!entry) return;
    lightboxImg.src = entry.full;
    lightboxImg.alt = entry.caption;
    if (lightboxCounter) {
      lightboxCounter.textContent =
        `${String(lightboxIndex + 1).padStart(2, '0')} / ${String(gallerySources.length).padStart(2, '0')}`;
    }
  };

  const openLightbox = (index) => {
    if (!gallerySources.length) return;
    lastFocused = document.activeElement;
    lightboxIndex = index;
    renderLightboxImage();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    if (!lightboxModal.classList.contains('active')) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  const stepLightbox = (delta) => {
    lightboxIndex = (lightboxIndex + delta + gallerySources.length) % gallerySources.length;
    renderLightboxImage();
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', () => stepLightbox(1));
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => stepLightbox(-1));

  if (lightboxModal) {
    // Clique no fundo (fora da imagem) fecha
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target === lightboxModal.querySelector('.lightbox-inner')) {
        closeLightbox();
      }
    });
  }

  // 7. Active Nav Link on Scroll (Intersection Observer)
  const navLinks = document.querySelectorAll('.nav-link');
  const navTargets = Array.from(navLinks)
    .map(link => link.getAttribute('href'))
    .filter(href => href && href.startsWith('#'))
    .map(href => document.querySelector(href))
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  if (navTargets.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.getAttribute('id'));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    navTargets.forEach(section => sectionObserver.observe(section));
  }

  // 8. ESC fecha modais / setas navegam no lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closeVideoModal();
      closeDrawer();
      closeLightbox();
      return;
    }

    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'ArrowRight') { e.preventDefault(); stepLightbox(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stepLightbox(-1); }
    }
  });
});
