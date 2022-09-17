<<<<<<< HEAD
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
=======
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
>>>>>>> 8214b560d7a6b0eca37d02a19be1f25d87d015b1
