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
});