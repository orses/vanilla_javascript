/* eslint-disable import/prefer-default-export */
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

function conffetiRain() {
  const conffeti = document.createElement('div');
  conffeti.classList.add('conffeti');
  const emojis = [
    '🎊',
    '✨',
    '🥳',
    '🎉',
    '🪅',
    '👯‍♂️',
    '💃',
    '🕺',
    '👯‍♂️',
    '🧨',
    '❤️‍🔥',
    '👌',
    '😁',
    '🚀',
  ];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  conffeti.innerText = emoji;
  conffeti.style.left = `${Math.random() * 100}vw`;
  conffeti.style.animationDuration = `${Math.random() * 2 + 3}s`;
  document.body.appendChild(conffeti);

  setTimeout(() => conffeti.remove(), 3500);
}

export { shuffle, conffetiRain };
