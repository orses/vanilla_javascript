(() => {
  /**
   * This function take an array and shuffle all his members
   * (randomizes the order of the elements)
   * with the algorithm of Fisher-Yates
   * Source:
   * http://www.frankmitchell.org/2015/01/fisher-yates/
   * https://bost.ocks.org/mike/shuffle/
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
   * @param {Any[]} data - The array to shuffle
   * @returns {Any[]} A shuffled copy of the input data
   */
  const shuffle = data => {
    const shuffledData = [...data];
    let i = data.length;
    let j = 0;

    // Always gets a number between 0 and the last available in each iteration
    // if i = 0 or i = 1 then we get a zero random number
    while (i > 0) {
      j = Math.floor(Math.random() * i--);
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }

    return shuffledData;
  };

  const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page',
  ];

  let dragStartElement = null;

  const handleDragStart = e => {
    if (e.target instanceof HTMLDivElement) {
      const dragElement = e.target;
      dragStartElement = dragElement;

      e.dataTransfer.setData('text/html', dragElement.innerHTML);
      e.dataTransfer.effectAllowed = 'move';
    } else {
      e.preventDefault();
    }
  };

  const handleDragEnd = e => {
    const items = document.querySelectorAll('.over');
    [...items].forEach(item => item.classList.remove('over'));
  };

  const handleDragOver = e => {
    if (e.preventDefault) e.preventDefault();
    let dragElement = e.target;
    if (dragElement.parentElement instanceof HTMLDivElement)
      dragElement = e.target.parentElement;

    dragElement.classList.add('over');

    return false;
  };

  const handleDragEnter = e => {
    let dragElement = e.target;
    if (dragElement.parentElement instanceof HTMLDivElement)
      dragElement = e.target.parentElement;

    dragElement.classList.add('over');
  };

  const handleDragLeave = e => {
    let dragElement = e.target;
    if (dragElement.parentElement instanceof HTMLDivElement)
      dragElement = e.target.parentElement;

    dragElement.classList.remove('over');
  };

  const handleDrop = e => {
    e.stopPropagation();
    let dropElement = e.target;

    if (dropElement.parentElement instanceof HTMLDivElement)
      dropElement = e.target.parentElement;

    dragStartElement.innerHTML = dropElement.innerHTML;
    dropElement.innerHTML = e.dataTransfer.getData('text/html');
  };

  // Insert list items into DOM
  function createList(items) {
    const elements = document.createDocumentFragment();
    [...items].forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-drag', index);
      listItem.innerHTML = `<span class="number">${index + 1}</span> 
        <div class="draggable-item" data-drag=${index} draggable="true">
        <p class="draggable-item-name">${item}</p>
        <span class="material-icons"> drag_handle </span>
        </div>`;

      elements.appendChild(listItem);
    });
    return elements;
  }

  function handleCheckList(items) {
    const userListItems = document.querySelectorAll('.draggable-item');
    [...userListItems].forEach((userItem, i) => {
      const userItemName = userItem.querySelector('.draggable-item-name');
      if (userItemName.textContent.trim() !== items[i]) {
        userItemName.classList.add('wrong');
        userItemName.classList.remove('correct');
      } else {
        userItemName.classList.remove('wrong');
        userItemName.classList.add('correct');
      }
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    const draggableList = document.querySelector('#draggable-list');
    const button = document.querySelector('#check');
    draggableList.appendChild(createList(shuffle(richestPeople)), button);

    draggableList.addEventListener('dragstart', handleDragStart, false);
    draggableList.addEventListener('dragenter', handleDragEnter, false);
    draggableList.addEventListener('dragover', handleDragOver, false);
    draggableList.addEventListener('dragleave', handleDragLeave, false);
    draggableList.addEventListener('drop', handleDrop, false);
    draggableList.addEventListener('dragend', handleDragEnd, false);

    const check = document.querySelector('#check');
    check.addEventListener('click', () => {
      handleCheckList(richestPeople);
    });
  });
})();
