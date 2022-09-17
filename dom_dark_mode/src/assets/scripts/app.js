import data from '../data/data.js';

function renderArticles(dataArticles) {
  const articlesEl = document.querySelector('.articles');

  const articles = dataArticles.map(article => {
    const { id, title, date, length, snippet } = article;
    const dateFormat = date.toLocaleDateString('en-EN', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return `<article class="post" data-article="${id}">
      <h2 class="post__title">${title}</h2>
      <div class="post__info">
      <span>${dateFormat}</span>
      <span>${length} min read</span>
      </div>
      <p class="post__text">${snippet}</p>
      </article>`;
  });

  articlesEl.innerHTML = `<h1 class="main__title">Latest Posts</h1> ${articles.join(
    ''
  )}`;
}

function handleToggle() {
  const documentEl = document.documentElement;
  documentEl.classList.toggle('dark-theme');
}

function enableToggleButton() {
  const toggleBtn = document.querySelector('.btn--toggle');
  toggleBtn.addEventListener('click', handleToggle);
}

function handleApp() {
  enableToggleButton();
  renderArticles(data);
}

window.addEventListener('DOMContentLoaded', handleApp);
