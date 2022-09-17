import fetchJSONData from './utils/fetch_data.js';

const btn = document.querySelector('.btn');
const displayText = document.querySelector('.display-text');

async function getNewJoke() {
  const init = {
    headers: {
      Accept: 'application/json',
      'User-Agent':
        'learning app (https://github.com/orses/vanilla_javascript/tree/main/fetch_dad_jokes)',
    },
  };

  const URL = 'https://icanhazdadjoke.com/';
  const data = await fetchJSONData(URL, init);
  return data;
}

async function displayJoke() {
  displayText.textContent = 'Loading... ';
  const messageError = `Oh, we don't have any joke at the moment! 😞`;
  const data = await getNewJoke();
  displayText.textContent = !data ? messageError : data.joke;
}

function handleFetchRandomData() {
  displayJoke();
}

function initApp() {
  displayJoke();
}

btn.addEventListener('click', handleFetchRandomData);
window.addEventListener('DOMContentLoaded', initApp);
