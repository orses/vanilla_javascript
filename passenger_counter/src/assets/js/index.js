(() => {
  const countElement = document.querySelector('#count-el');
  const incrementBtn = document.querySelector('#increment-btn');
  const saveBtn = document.querySelector('#save-btn');
  const countDisplayElement = document.querySelector('#countDisplay');
  const totalDisplayElement = document.querySelector('#totalDisplay');

  let count = 0;
  let total = 0;

  const displayCount = () => {
    countElement.textContent = count;
  };

  const displayTotal = () => {
    totalDisplayElement.textContent = total;
  };

  const displaySaved = () => {
    const currentDisplay = countDisplayElement.textContent;
    countDisplayElement.textContent = `${
      currentDisplay === '0' ? '' : `${currentDisplay} - `
    }${count}`;
  };

  const resetCount = () => {
    count = 0;
  };

  const incrementCount = () => {
    count++;
    displayCount();
    saveBtn.disabled = false;
  };

  const saveCounts = () => {
    total += count;
    saveBtn.disabled = true;
    displaySaved();
    displayTotal();
    resetCount();
    displayCount();
  };

  incrementBtn.addEventListener('click', incrementCount);
  saveBtn.addEventListener('click', saveCounts);
})();
