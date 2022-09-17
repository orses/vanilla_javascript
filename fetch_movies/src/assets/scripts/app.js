/* eslint-disable import/extensions */
import fetchShowsData from './utils/fetch_data.js';
import { removeHtmlTags, sanitize } from './utils/sanitize.js';
/* eslint-disable import/extensions */

(async () => {
  const API_URL = 'https://api.tvmaze.com/';

  const main = document.querySelector('main');
  const searchForm = document.querySelector('#search-form');
  const searchBox = document.querySelector('.search-box');

  function classColorByRate(rate) {
    if (rate >= 8) return 'green';
    if (rate > 5) return 'orange';
    return 'red';
  }

  function renderShow({ image, name, officialSite, rating, summary }) {
    if (!image) return ''; // if not image, we don't like the item for this list of shows

    const link = !!officialSite && `<a href="${officialSite}" target="_blank">`;
    const imageElement = `<img class="show__image" src="${image.medium}" alt="Poster medium size of the show"/>`;
    let summaryText = summary ? removeHtmlTags(summary) : '';

    summaryText =
      summaryText.length > 400
        ? `${summaryText.substring(0, 400)}...`
        : summaryText;

    return `<article class="show">
    ${link ? `${link + imageElement}</a>` : imageElement}

      <div class="show-info">
        <div class="show__header">
          <h3 class="show__title">${name}</h3>
        </div>
        ${
          rating.average
            ? `<span class="show__rate ${classColorByRate(rating.average)}">${
                rating.average
              }</span>`
            : ''
        }
      </div>
      <div class="show-overview">
        <div class="show-summary">${summaryText}</div>
        <div class="show-externals">
        ${
          link
            ? `<a class="show-button" href="${officialSite}" target="_blank">more</a></button>`
            : ''
        }</div>
      </div>
    </article>`;
  }

  function displayShows(responseData) {
    const resultSearch = 'show' in responseData[0];
    let shows = '';
    responseData.forEach(item => {
      shows += renderShow(resultSearch ? item.show : item);
    });
    main.innerHTML = shows;
  }

  async function handleSearch(e) {
    e.preventDefault();
    const searchTerm = sanitize(searchBox.value);
    if (!searchTerm) {
      searchBox.value = '';
      return false;
    }
    const url = `${API_URL}search/shows?q=${encodeURI(searchTerm)}`;
    const responseData = await fetchShowsData(url);
    if (responseData.length > 0) return displayShows(responseData);

    main.innerHTML =
      '<div class="alert alert-danger">There are no results for the current search</div>';
    return false;
  }

  async function handleLoadPage() {
    const url = `${API_URL}shows?page=1`;
    const responseData = await fetchShowsData(url);
    displayShows(responseData);
  }

  searchForm.addEventListener('submit', handleSearch);
  window.addEventListener('DOMContentLoaded', handleLoadPage);
})();
