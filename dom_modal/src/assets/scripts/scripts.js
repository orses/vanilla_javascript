(() => {
  const modalEl = document.querySelector('.modal');
  const btnCloseModal = document.querySelector('.btn--close');
  const headerActionEl = document.querySelector('.header__action');

  function handleCloseModal() {
    modalEl.classList.add('hidden');
  }

  function handleKeyCloseModal(event) {
    if (event.keyCode === 27 && !modalEl.classList.contains('hidden'))
      handleCloseModal();
  }

  function handleShowModal(event) {
    const button = event.target;
    if (!button.classList.contains('btn--show')) return false;

    // button.blur();
    modalEl.classList.toggle('hidden');
    modalEl.querySelector('.btn--close').focus();
  }

  btnCloseModal.addEventListener('click', handleCloseModal);
  headerActionEl.addEventListener('click', handleShowModal);
  document.addEventListener('keydown', handleKeyCloseModal);
})();
