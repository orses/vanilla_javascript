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
  const pronunciationCharacters = pronunciation ? `/${pronunciation}/` : '';

  wordDOM.innerHTML = ` 
  <div class="word">
    <h2 class="word__text">${term}</h2>
    <span class="word__pronunciation"> <span class="word__pronunciation">${pronunciationCharacters}</span> 
  </div>
  <ul class="word__definitions"></ul>`;

  const displayDefinitions = document.createDocumentFragment();

  for (let i = 0, len = definitions.length; i < len; i++) {
    const definition = definitions[i];
    const definitionDOM = document.createElement('li');
    definitionDOM.classList.add('word__definition');
    const definitionExample = definition.example
      ? `"${definition.example}"`
      : '';
    const definitionImage = definition.image_url
      ? `
    <div class="definition__image-container">
      <img
        alt=""
        class="definition__image"
        src="${definition.image_url}"
      />
    </div>`
      : '';

    definitionDOM.innerHTML = `<div class="definition__text-container">
      <span class="definition__type">${
        definition.type ? definition.type : ''
      }</span>
      <p class="definition__text">${definition.definition} ${
      definition.emoji ? definition.emoji : ''
    }</p>
      <span class="definition__example">${definitionExample}</span>
    </div>
    ${definitionImage}`;
    displayDefinitions.appendChild(definitionDOM);
  }

  document.querySelector('.word__definitions').appendChild(displayDefinitions);
};
