/* eslint-disable import/extensions */
import fetchFollowers from './fetch_followers.js';
import renderFollowers from './render_followers.js';
import paginate from './paginate.js';
import renderPaginationButtons from './pagination_buttons.js';

const titleEl = document.querySelector('.section__title');
const containerEl = document.querySelector('.section__container');
const paginationToolbar = document.querySelector(
  '.section__pagination-toolbar'
);

let activeIndexButton = 0;
let pages = [];
const itemsPerPage = 10;

function setupUI() {
  containerEl.innerHTML = renderFollowers(pages[activeIndexButton]);

  const numberOfButtons = pages.length;
  paginationToolbar.innerHTML = renderPaginationButtons(
    numberOfButtons,
    activeIndexButton
  );
}

function nextPage() {
  activeIndexButton++;
  if (activeIndexButton > pages.length - 1) activeIndexButton = 0;
}

function previousPage() {
  activeIndexButton--;
  if (activeIndexButton < 0) activeIndexButton = pages.length - 1;
}

function handlePagination(event) {
  const element = event.target;
  if (element.classList.contains('section__pagination-toolbar')) return false;

  if (element.classList.contains('btn-pagination'))
    activeIndexButton = Number(element.dataset.index);
  if (element.classList.contains('btn-next')) nextPage();
  if (element.classList.contains('btn-previous')) previousPage();

  setupUI();
}

async function init() {
  const followers = await fetchFollowers();
  titleEl.textContent = 'Pagination';
  pages = paginate(followers, itemsPerPage);
  setupUI();
}

paginationToolbar.addEventListener('click', handlePagination);
window.addEventListener('DOMContentLoaded', init);
