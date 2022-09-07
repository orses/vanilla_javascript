(() => {
  const linkList = document.querySelector('#nav-links');
  const navBtn = document.querySelector('#nav-toggle');
  const yearEl = document.querySelector('#footer-year');

  yearEl.innerHTML = new Date().getFullYear();

  navBtn.addEventListener('click', () => {
    linkList.classList.toggle('link-list--show');
  });

  // ********** smooth scroll ************
  const scrollLinks = document.querySelectorAll('.scroll-link');
  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      linkList.classList.remove('link-list--show');

      const targetId = e.target.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      const topPosition = targetEl.offsetTop - 62;

      window.scrollTo({
        left: 0,
        top: topPosition,
        behavior: 'smooth',
      });
    });
  });
})();
