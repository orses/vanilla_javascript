const button = document.querySelector('.btn');
const colorElement = document.querySelector('.color');

const getRandomNumber = limit => {
  return Math.floor(Math.random() * limit);
};

const getHexadecimalColor = () => {
  const HEXADECIMAL = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];

  let color = '#';

  for (let digit = 0; digit < 6; digit++) {
    color += HEXADECIMAL[getRandomNumber(16)];
  }

  return color;
};

const changeColor = e => {
  const hexadecimalColor = getHexadecimalColor();
  document.body.style.backgroundColor = hexadecimalColor;
  colorElement.textContent = hexadecimalColor;
};

button.addEventListener('click', changeColor);
