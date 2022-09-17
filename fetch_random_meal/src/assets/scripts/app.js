(() => {
  const getMealButton = document.querySelector('#get_meal');
  const mainSection = document.querySelector('#main_section');

  function getIngredients(data) {
    const ingredients = [];

    // the API returns up to 20 ingredients
    for (let i = 1; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
        ingredients.push(
          `${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`
        );
      } else {
        break; // stop if there are no more ingredients
      }
    }

    return ingredients;
  }

  function makeMainSection(data, ingredients) {
    const {
      strMeal,
      strMealThumb,
      strCategory,
      strArea,
      strTags,
      strInstructions,
      strYoutube,
    } = data;

    const innerElement = `<div class="row">
    <div class="columns five">
      <img src="${strMealThumb}" alt="Meal Image" />
    ${strCategory ? `<p><strong>Category:</strong> ${strCategory}</p>` : ''}
    ${strArea ? `<p><strong>Area:</strong> ${strArea}</p>` : ''}
      ${
        strTags
          ? `<p><strong>Tags:</strong> ${strTags.split(',').join(', ')}</p>`
          : ''
      }
      <h4 class="toc4">Ingredients:</h4>
      <ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
    </div>
    <div class="columns seven">
      <h3 class="toc3">${strMeal}</h3>
      <p>${strInstructions}</p>
    </div>
    </div>
    ${
      strYoutube
        ? `<div class="row">  
            <h4 class="toc4">Video Recipe</h4>
            <div class="video-container">
                <iframe
                  frameborder="0"
                  height="315"
                  src="https://www.youtube.com/embed/${strYoutube.slice(-11)}"
                  width="420"
                ></iframe>
            </div>
          </div>`
        : ''
    }
    `;

    return innerElement;
  }

  function createMeal(data) {
    const ingredients = getIngredients(data);
    mainSection.innerHTML = makeMainSection(data, ingredients);
  }

  function fetchMeal() {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(URL)
      .then(response => response.json())
      .then(data => createMeal(data.meals[0]))
      .catch(() => {
        mainSection.innerHTML = `Unable to connect to API`;
      });
  }

  getMealButton.addEventListener('click', fetchMeal);
})();
