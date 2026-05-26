document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMobile.classList.toggle('active');
      document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });
  }

  mobileDropdowns.forEach(function(dropdown) {
    const link = dropdown.querySelector('a');
    if (link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      });
    }
  });

  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
      header.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.7)' : '0 4px 20px rgba(0,0,0,0.5)';
    }
  });

  // ===== Gallery carousel dots (per-game) =====
  document.querySelectorAll('.gallery-dot').forEach(function(dot) {
    dot.addEventListener('click', function() {
      var galleryId = dot.getAttribute('data-gallery');
      var index = parseInt(dot.getAttribute('data-index'));
      var scrollEl = document.getElementById(galleryId);
      if (!scrollEl) return;
      var items = scrollEl.querySelectorAll('.gallery-img-wrap');
      if (!items[index]) return;
      scrollEl.scrollTo({ left: items[index].offsetLeft, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.gallery-scroll').forEach(function(scrollEl) {
    scrollEl.addEventListener('scroll', function() {
      var galleryId = scrollEl.id;
      var items = scrollEl.querySelectorAll('.gallery-img-wrap');
      var closestIndex = 0;
      var closestDist = Infinity;
      items.forEach(function(item, i) {
        var dist = Math.abs(item.offsetLeft - scrollEl.scrollLeft);
        if (dist < closestDist) { closestDist = dist; closestIndex = i; }
      });
      document.querySelectorAll('.gallery-dot[data-gallery="' + galleryId + '"]').forEach(function(dot) {
        dot.classList.toggle('active', parseInt(dot.getAttribute('data-index')) === closestIndex);
      });
    });
  });

  // ===== Unified carousel =====
  (function() {
    var track = document.getElementById('carousel-track');
    var dotsContainer = document.getElementById('carousel-dots');
    var prevBtn = document.getElementById('carousel-prev');
    var nextBtn = document.getElementById('carousel-next');
    if (!track || !dotsContainer) return;

    var items = track.querySelectorAll('.carousel-item');
    var currentIndex = 0;
    var isAutoPlaying = false;
    var autoTimer = null;

    // Build dots
    items.forEach(function(_, i) {
      var dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dot.addEventListener('click', function() { goTo(i); });
      dotsContainer.appendChild(dot);
    });
    var dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateDots() {
      dots.forEach(function(d, i) {
        var isActive = i === currentIndex;
        d.classList.toggle('active', isActive);
        d.style.width = isActive ? '20px' : '8px';
        d.style.borderRadius = isActive ? '4px' : '50%';
      });
    }

    function getItemWidth() {
      var computed = window.getComputedStyle(track);
      var gap = parseFloat(computed.gap) || 0;
      var item = track.querySelector('.carousel-item');
      if (!item) return track.offsetWidth / (window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3);
      return item.offsetWidth + gap;
    }

    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, items.length - 1));
      track.scrollTo({ left: items[currentIndex].offsetLeft - track.offsetLeft, behavior: 'smooth' });
      updateDots();
      resetAutoPlay();
    }

    function resetAutoPlay() {
      if (autoTimer) clearTimeout(autoTimer);
      if (isAutoPlaying) autoTimer = setTimeout(function() { next(); }, 4000);
    }

    function next() {
      goTo((currentIndex + 1) % items.length);
    }
    function prev() {
      goTo((currentIndex - 1 + items.length) % items.length);
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Auto-play
    isAutoPlaying = true;
    resetAutoPlay();

    // Sync on scroll
    track.addEventListener('scroll', function() {
      var closestIndex = 0;
      var closestDist = Infinity;
      items.forEach(function(item, i) {
        var dist = Math.abs(item.offsetLeft - track.scrollLeft);
        if (dist < closestDist) { closestDist = dist; closestIndex = i; }
      });
      currentIndex = closestIndex;
      updateDots();
    });
  })();
});