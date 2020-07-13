/* eslint-disable indent */
export const displayError = (message, target) => {
  const errorDOM = document.querySelector(target);
  errorDOM.classList.toggle('show');
  errorDOM.textContent = message;

  setTimeout(() => {
    errorDOM.classList.toggle('show');
  }, 2000);
};

export const displayWord = (word, target) => {
  const { word: term, pronunciation, definitions } = word;
  const wordDOM = document.querySelector(target);
  wordDOM.innerHTML = '';

  wordDOM.innerHTML = ` 
  <div class="word">
    <h2 class="word__text">${term}</h2>
    <span class="word__pronunciation"> <span class="word__pronunciation">${
      pronunciation ? `/${pronunciation}/` : ''
    }</span> 
  </div>
  <ul class="word__definitions"></ul>`;

  const displayDefinitions = document.createDocumentFragment();

  for (let i = 0, len = definitions.length; i < len; i++) {
    const definition = definitions[i];
    const definitionDOM = document.createElement('li');
    definitionDOM.classList.add('word__definition');

    definitionDOM.innerHTML = `<div class="definition__text-container">
      <span class="definition__type">${
        definition.type ? definition.type : ''
      }</span>
      <p class="definition__text">${definition.definition} ${
      definition.emoji ? definition.emoji : ''
    }</p>
      <span class="definition__example">${
        definition.example ? `"${definition.example}"` : ''
      }</span>
    </div>
    <div class="definition__image-container">
      ${
        definition.image_url
          ? `
          <img
            alt=""
            class="definition__image"
            src="${definition.image_url}"
          />`
          : ''
      }
    </div>`;
    displayDefinitions.appendChild(definitionDOM);
  }

  document.querySelector('.word__definitions').appendChild(displayDefinitions);
};
