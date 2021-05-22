/* eslint-disable indent */
import 'babel-polyfill';

import fetchWord from './fetch-word';
import sanitize from './sanitize';
import { displayError, displayWord } from './dom_manipulation';
import '../scss/styles.scss';

const formWord = document.querySelector('#word-form');

async function startSearch(e) {
  e.preventDefault();

  const wordQuery = sanitize(e.target.word.value);

  if (!wordQuery) return;

  const word = await fetchWord(wordQuery);
  const wordContainer = document.querySelector('.word-container');
  wordContainer.innerHTML = '';

  if (!word) {
    wordContainer.classList.remove('show');
    displayError('Word not found!', '.error');
    // the input field retains the input value. So the user can find out why there's an error in the word
  } else {
    displayWord(word, '.word-container');
    wordContainer.classList.add('show');
    e.target.word.value = '';
  }
}

formWord.addEventListener('submit', startSearch);
