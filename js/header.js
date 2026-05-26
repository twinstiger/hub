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

  // Gallery carousel dots
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

  // Update active dot on scroll
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
});