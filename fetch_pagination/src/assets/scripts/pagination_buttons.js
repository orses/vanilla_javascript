const displayNavigationButtons = (numberOfButtons, activeIndex) => {
  const buttons = Array.from(
    { length: numberOfButtons },
    (_, pageIndex) =>
      `<button class="btn-pagination${
        pageIndex === activeIndex ? ' btn--active' : ''
      }" data-index="${pageIndex}">${pageIndex + 1}</button>`
  );

  buttons.unshift('<button class="btn-previous">⬅️ Previous</button>');
  buttons.push('<button class="btn-next">Next ➡️</button>');

  return buttons.join('');
};

export default displayNavigationButtons;
