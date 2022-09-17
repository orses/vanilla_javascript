import { getColors, getColor } from './colors.js';

const button = document.querySelector('.btn');
const color = document.querySelector('.color');

const getRandomNumber = limit => {
  return Math.floor(Math.random() * limit);
};

const changeColor = e => {
  const randomNumber = getRandomNumber(getColors().length);
  const colorText = getColor(randomNumber);
  document.body.style.backgroundColor = colorText;
  color.textContent = colorText;
};

button.addEventListener('click', changeColor);
