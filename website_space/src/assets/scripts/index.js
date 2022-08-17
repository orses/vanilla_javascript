(() => {
  const navPrimary = document.querySelector('#primary-nav');
  const navTogglebutton = document.querySelector('.nav-toggle-button');

  function handleToggleNav() {
    const { visible } = navPrimary.dataset;

    if (visible === 'true') {
      navPrimary.dataset.visible = false;
      navTogglebutton.ariaExpanded = false;
      return;
    }

    navPrimary.dataset.visible = true;
    navTogglebutton.ariaExpanded = true;
  }

  navTogglebutton.addEventListener('click', handleToggleNav);
})();
