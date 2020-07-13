const button = document.querySelector('.btn');
const color = document.querySelector('.color');

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

  for (let i = 0; i < 6; i++) {
    color += HEXADECIMAL[getRandomNumber(16)];
  }

  return color;
};

const changeColor = e => {
  let hexadecimalColor = getHexadecimalColor();
  document.body.style.backgroundColor = hexadecimalColor;
  color.textContent = hexadecimalColor;
};

button.addEventListener('click', changeColor);
