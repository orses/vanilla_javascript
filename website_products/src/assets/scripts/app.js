import fetchJSONData from './utils/fetch_data.js';

const url = 'https://course-api.com/javascript-store-products';
const elProductStatus = document.querySelector('.product-section__status');

function displayError(errorMessage, alternativeMessage) {
  return `<div class="message message--error"><p>${errorMessage}</p><p>${alternativeMessage}</p></div>`;
}

function renderItems(data) {
  elProductStatus.innerHTML = data
    .map(({ id, fields }) => {
      const { name, colors, company, featured, image, price } = fields;
      const product = `<a href="./pages/product.html" class="product">
      <img class="product__img" src="${image[0].url}" alt="${name}" />
      <h3 class="product__title">${name}</h3>
      <span class="product__price">${price}</span>
    </a>`;
      return product;
    })
    .join('\n');
}

async function initApp() {
  const dataProducts = await fetchJSONData(url);

  if (!dataProducts) {
    const errorMessage = "There was an error, we can't load the products 😢";
    const alternativeMessage = 'Please, try again later';
    elProductStatus.innerHTML = displayError(errorMessage, alternativeMessage);
    return;
  }

  renderItems(dataProducts);
}

window.addEventListener('DOMContentLoaded', initApp);
