/* eslint-disable import/extensions */
import dataProducts from '../../data/products.js';

const companyContainer = document.querySelector('.company');
const productList = document.querySelector('.product__list');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');

function displayMessage(message) {
  return `<div class="alert alert-danger">${message}</div>`;
}

function filterData(values, category, search) {
  return values.filter(product =>
    product[category].toLowerCase().includes(search)
  );
}

function renderFiltersButtons(categories, label) {
  return categories
    .map(
      category =>
        `<button class="${label}__btn" data-filter="${category}">${category}</button>`
    )
    .join('');
}

function renderProducts(products) {
  return products
    .map(
      ({ id, title, company, image, price }) =>
        `<li>
    <article  class="product">
    <img
    class="product__image"
    src="${image}"
    alt=""
    data-id="${id}"
    />
    <footer>
    <h2 class="product__name">${title} <span>(${company})</span></h2>
    <span class="product__price">$${price}</span>
      </footer>
      </article>
      </li>`
    )
    .join('');
}

function handleSearchForm(event) {
  event.preventDefault();

  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = filterData(dataProducts, 'title', searchTerm);

  productList.innerHTML =
    filteredProducts.length === 0
      ? displayMessage('😞 Sorry, no products matched your search')
      : renderProducts(filteredProducts);
}

function handleFilterButtons(event) {
  const button = event.target;
  searchInput.value = '';

  if (button.classList.contains('company__btn')) {
    const filterText = button.textContent.toLowerCase();

    const filteredProducts = filterData(dataProducts, 'company', filterText);
    productList.innerHTML =
      filterText === 'all'
        ? renderProducts(dataProducts)
        : renderProducts(filteredProducts);
  }
}

function initApp() {
  productList.innerHTML = renderProducts(dataProducts);

  const categories = [
    'all',
    ...new Set(dataProducts.map(product => product.company)),
  ];
  companyContainer.innerHTML = renderFiltersButtons(categories, 'company');
}

companyContainer.addEventListener('click', handleFilterButtons);
searchForm.addEventListener('keyup', handleSearchForm);
searchForm.addEventListener('submit', handleSearchForm);
window.addEventListener('DOMContentLoaded', initApp);
