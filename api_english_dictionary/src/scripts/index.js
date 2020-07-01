/* eslint-disable indent */
import 'babel-polyfill';

import getWord from './api_request';
import sanitize from './utils';
import { displayError, displayWord } from './dom_manipulation';
import '../scss/styles.scss';

const formWord = document.querySelector('#word-form');

async function startSearch(e) {
  e.preventDefault();

  console.log('dale');

  const wordQuery = sanitize(e.target.word.value);

  if (!wordQuery) return;

  const word = await getWord(wordQuery);
  const wordContainer = document.querySelector('.word-container');
  wordContainer.innerHTML = '';
  console.log(word);

  if (!word) {
    wordContainer.classList.remove('show');
    displayError('Word not found!', '.error');
  } else {
    displayWord(word, '.word-container');
    wordContainer.classList.add('show');
  }
}

formWord.addEventListener('submit', startSearch);
