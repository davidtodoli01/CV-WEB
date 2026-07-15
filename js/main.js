document.addEventListener('DOMContentLoaded', () => {

  // --- 0. Opening Introduction Sequencer (Typographic Kinetic Slide) ---
  const introContainer = document.getElementById('intro-container');
  const items = [
    document.getElementById('item-1'),
    document.getElementById('item-2'),
    document.getElementById('item-3'),
    document.getElementById('item-4')
  ];
  
  if (introContainer && items.every(el => el !== null)) {
    // Lock scroll immediately
    document.body.classList.add('intro-lock');
    
    // Cycle focused states sequentially
    // Step 1: ANALIZAR (At 0.1s)
    setTimeout(() => {
      items[0].classList.add('active');
    }, 100);
    
    // Step 2: DISEÑAR (At 0.6s)
    setTimeout(() => {
      items[0].classList.remove('active');
      items[1].classList.add('active');
    }, 600);
    
    // Step 3: CONSTRUIR (At 1.1s)
    setTimeout(() => {
      items[1].classList.remove('active');
      items[2].classList.add('active');
    }, 1100);
    
    // Step 4: OPTIMIZAR (At 1.6s)
    setTimeout(() => {
      items[2].classList.remove('active');
      items[3].classList.add('active');
    }, 1600);
    
    // Slide Up Curtain Wipe (At 2.1s)
    setTimeout(() => {
      introContainer.classList.add('finished');
      document.body.classList.remove('intro-lock');
      
      // Trigger Hero active animations
      const hero = document.getElementById('hero');
      if (hero) {
        hero.classList.add('active');
      }
    }, 2100);
    
    // Completely destroy DOM container node (At 2.9s)
    setTimeout(() => {
      introContainer.remove();
    }, 2900);
  }

  // --- 1. Custom Interactive Cursor ---
  const cursor = document.getElementById('custom-cursor');
  
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    const hoverables = document.querySelectorAll('a, button, .btn-view-doc, .selector-btn, .scroll-indicator');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  // --- 2. Dynamic Live Date Widget ---
  const dateEl = document.getElementById('live-date');
  if (dateEl) {
    const updateDate = () => {
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      const formatter = new Intl.DateTimeFormat('es-ES', options);
      const dateStr = formatter.format(new Date());
      // Capitalize first letter
      dateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    };
    updateDate();
  }

  // --- 3. Hamburger Mobile Menu Menu ---
  const burgerBtn = document.getElementById('burger-btn');
  const siteHeader = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');

  if (burgerBtn && siteHeader) {
    burgerBtn.addEventListener('click', () => {
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      burgerBtn.setAttribute('aria-expanded', !isExpanded);
      siteHeader.classList.toggle('active');
    });

    // Close mobile menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        siteHeader.classList.remove('active');
        burgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 4. Reveal on Scroll Animation (Staggered Grid Entry) ---
  // Iterate grids to inject individual stagger delays to their child cards
  const grids = document.querySelectorAll('.aportar-editorial-grid, .evidence-grid, .skills-tools-grid, .extra-exp-grid');
  grids.forEach(grid => {
    const children = grid.querySelectorAll('.aportar-block, .evidence-card, .skills-cajon, .extra-exp-card');
    children.forEach((child, index) => {
      child.classList.add('reveal');
      child.style.setProperty('--reveal-delay', `${index * 85}ms`);
    });
  });

  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // --- Spotlight Hover Effect for Cards (Bento, Case & Evidences) ---
  const spotlightCards = document.querySelectorAll('.aportar-block, .evidence-card, .tuateam-case, .extra-exp-card, .skills-cajon');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });


  // --- 2. Other Cases Tab Selector ---
  const tabButtons = document.querySelectorAll('.selector-btn');
  const caseContents = document.querySelectorAll('.case-study-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Deactivate all buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      // Hide all cases
      caseContents.forEach(content => {
        content.classList.remove('active');
      });

      // Activate clicked tab
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      
      const targetId = button.getAttribute('aria-controls');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });





  // --- 5. Smooth Scroll Header Effects ---
  const headerEl = document.getElementById('site-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerEl.style.backgroundColor = 'rgba(250, 249, 245, 0.96)';
      headerEl.style.boxShadow = '0 10px 30px rgba(18, 18, 18, 0.04)';
    } else {
      headerEl.style.backgroundColor = 'var(--bg-glass)';
      headerEl.style.boxShadow = 'none';
    }
  });

  // --- 6. Email Auto-Copy & Toast Notification ---
  const allLinks = document.querySelectorAll('a');
  let emailCount = 0;
  allLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.toLowerCase().startsWith('mailto:')) {
      emailCount++;
      link.addEventListener('click', (e) => {
        const email = href.replace(/mailto:/i, '');
        console.log('Email link clicked:', email);
        
        // Attempt to copy to clipboard (may reject in headless or without document focus)
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email)
            .then(() => console.log('Email copied to clipboard:', email))
            .catch(err => {
              console.warn('Clipboard write fallback: ', err);
            });
        }
        
        // Create and show toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = `Email copiado al portapapeles: ${email}`;
        document.body.appendChild(toast);
        console.log('Toast created and appended to DOM');
        
        // Trigger slide-up animation
        setTimeout(() => {
          toast.classList.add('show');
          console.log('Toast show class added');
        }, 50);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => {
            toast.remove();
            console.log('Toast removed from DOM');
          }, 400);
        }, 3000);

        // Fallback to Gmail Web client if native mail client doesn't open (window remains focused)
        let blurred = false;
        const onBlur = () => {
          blurred = true;
        };
        window.addEventListener('blur', onBlur);
        
        setTimeout(() => {
          window.removeEventListener('blur', onBlur);
          if (!blurred) {
            console.log('No native mail client opened, opening Gmail Web compose as fallback...');
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
          }
        }, 1000);
      });
    }
  });
  console.log('Registered email handlers for', emailCount, 'links');

});
