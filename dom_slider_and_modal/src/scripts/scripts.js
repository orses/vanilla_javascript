(() => {
  const toggleMenuElement = document.querySelector('#toggle');
  const openModalElement = document.querySelector('#open');
  const closeModalElement = document.querySelector('#close');
  const modalElement = document.querySelector('#modal');

  // Toggle navbar
  function handleToggleMenu() {
    document.body.classList.toggle('navbar--visible');
  }

  toggleMenuElement.addEventListener('click', handleToggleMenu);

  // Show modal
  function handleShowModal() {
    modalElement.classList.toggle('show');
  }

  openModalElement.addEventListener('click', handleShowModal);
  closeModalElement.addEventListener('click', handleShowModal);
  window.addEventListener('click', event => {
    return event.target == modalElement ? handleShowModal() : false;
  });
})();
