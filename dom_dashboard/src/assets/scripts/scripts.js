/* eslint-disable import/extensions */
import fetchJsonData from './utils/fetch_data.js';

let dataUser = null;

/* style="--color: var(--color-red, hsl(0, 78%, 62%))"
 */
function renderItems(data, period = 'weekly') {
  const COLORS = [
    '--color-red-light',
    '--color-blue-soft',
    '--color-red',
    '--color-green-light',
    '--color-blue',
    '--color-orange-soft',
  ];

  const items = data.map(
    ({ title, timeframes }, index) => `<div class="card">
    <div class="card__media" style="--color-bg: var(${COLORS[index]})">
      <img
        alt="Image of a briefcase"
        class="card__image"
        height="79"
        src="./assets/images/icon-${title.toLowerCase().replace(' ', '-')}.svg"
        width="79"
      />
    </div>
    <div class="card__main">
      <div class="card__header">
        <h2 class="card__title">${title}</h2>
        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
            fill="#BBC0FF"
            fill-rule="evenodd"
          />
        </svg>
      </div>
      <div class="card__details">
        <p class="card__total">${timeframes[period].current}hrs</p>
        <p class="card__time">Last Week - ${timeframes[period].previous}hrs</p>
      </div>
    </div>
  </div>`
  );

  return items.join('');
}

function displayData(data, timeFrame = 'weekly') {
  const displayItems = document.querySelector('.section__main');
  displayItems.innerHTML = renderItems(data, timeFrame);
}

function handleFilter(e) {
  const periodSelected = e.currentTarget.value;
  displayData(dataUser, periodSelected);
}

function enableFilterPeriod() {
  const periodFilter = document.querySelectorAll(
    'input[type="radio"][name="stats-filter"]'
  );

  periodFilter.forEach(input => input.addEventListener('change', handleFilter));
}

async function handleApp() {
  // setting up the application
  enableFilterPeriod();

  // feching data for the sesion
<<<<<<< HEAD
  dataUser = await fetchJsonData('./data/data.json');
=======
  dataUser = await fetchJsonData('../../data/data.json');
>>>>>>> 48266f3a723c503524c7a26105596934725286f8
  if (!dataUser) return;

  // load and display default data items
  displayData(dataUser);
}

document.addEventListener('DOMContentLoaded', handleApp);
