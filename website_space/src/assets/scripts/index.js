<<<<<<< HEAD
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
=======
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
>>>>>>> 8214b560d7a6b0eca37d02a19be1f25d87d015b1
