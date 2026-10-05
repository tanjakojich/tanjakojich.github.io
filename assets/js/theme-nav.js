/* ==========================================================================
   Theme toggle, mobile menu, header scroll state and scroll reveal
   ========================================================================== */

(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Theme
     ========================================================================== */

  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var themeToggles = document.querySelectorAll('[data-theme-toggle]');

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return systemDark.matches ? 'dark' : 'light';
  }

  function syncToggles() {
    var isDark = currentTheme() === 'dark';
    themeToggles.forEach(function (btn) {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });
  }

  function setTheme(theme) {
    // Animate colours only while switching, so page loads never fade in
    if (!reduceMotion.matches) {
      root.classList.add('theme-transition');
      window.setTimeout(function () { root.classList.remove('theme-transition'); }, 350);
    }
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    syncToggles();
  }

  themeToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  });

  // Follow OS changes as long as the visitor has not picked a theme
  systemDark.addEventListener('change', syncToggles);
  syncToggles();

  /* Header scroll state
     ========================================================================== */

  var ticking = false;

  function updateScrolled() {
    root.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateScrolled);
      ticking = true;
    }
  }, { passive: true });
  updateScrolled();

  /* Mobile menu
     ========================================================================== */

  var navToggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');

  if (navToggle && menu) {
    var focusables = function () {
      return [navToggle].concat(Array.prototype.slice.call(menu.querySelectorAll('a, button')));
    };

    var openMenu = function () {
      menu.removeAttribute('inert');
      menu.classList.add('is-open');
      root.classList.add('menu-open');
      document.body.classList.add('overflow--hidden');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close menu');
    };

    var closeMenu = function (returnFocus) {
      menu.setAttribute('inert', '');
      menu.classList.remove('is-open');
      root.classList.remove('menu-open');
      document.body.classList.remove('overflow--hidden');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      if (returnFocus) navToggle.focus();
    };

    var isOpen = function () {
      return navToggle.getAttribute('aria-expanded') === 'true';
    };

    navToggle.addEventListener('click', function () {
      if (isOpen()) closeMenu(false); else openMenu();
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { closeMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;

      if (e.key === 'Escape') {
        closeMenu(true);
        return;
      }

      // Keep keyboard focus inside the open menu
      if (e.key === 'Tab') {
        var items = focusables();
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (items.indexOf(document.activeElement) === -1) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Close the menu if the window grows past the mobile breakpoint
    window.matchMedia('(min-width: 48em)').addEventListener('change', function (mq) {
      if (mq.matches && isOpen()) closeMenu(false);
    });
  }

  /* Scroll reveal
     ========================================================================== */

  var revealSelector = [
    '[data-reveal]',
    '.page__content > h2',
    '.pub-card',
    '.talk-card',
    '.course-card',
    '.supervision-card',
    '.cv-download-card'
  ].join(',');

  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var targets = document.querySelectorAll(revealSelector);

    var observer = new IntersectionObserver(function (entries) {
      var batch = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Small stagger for elements that appear together
        el.style.transitionDelay = Math.min(batch, 4) * 60 + 'ms';
        el.classList.add('is-visible');
        el.addEventListener('transitionend', function () { el.style.transitionDelay = ''; }, { once: true });
        batch++;
        observer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
})();
