(() => {
  const wordElement = document.querySelector('#word');
  const wrongLettersElement = document.querySelector('#letters');
  const popupElement = document.querySelector('#popup');
  const popupMessageElement = document.querySelector('#popup-message');
  const notificationElement = document.querySelector('#notification');
  const notificationMessageElement = document.querySelector(
    '#notification-message'
  );
  const btnPlayAgain = document.querySelector('#btn-play');
  const figurePartsElement = document.querySelectorAll('.figure__part');

  let wordList = [];
  let selectedWord = '';
  const guessedLetters = [];
  const wrongLetters = [];

  const isTrustedOrigin = origin => {
    // security: origin
    const devURL = 'http://localhost:5500';
    const productionURL = 'https://orses.github.io';

    // security: identify the sender
    if (origin === devURL || origin === productionURL) return true;
    return false;
  };

  function getRandomWord(words) {
    const indexForWord = Math.floor(Math.random() * words.length);
    return words[indexForWord];
  }

  function removeWord(word, words) {
    const wordsCopy = [...words];
    return wordsCopy.filter(wordCopy => wordCopy !== word);
  }

  /**
   * Returns a word with the guessed letters in the correct position,
   * and completes the rest with a zero length string
   * @param {string} word
   * @param {array } letters
   * @example getWordWithGuessedLetters('house', ['o', 's'])
   * // returns ' o s '
   * @returns string
   */
  function getWordWithGuessedLetters(word, letters) {
    return word
      .split('')
      .map(letter => (letters.includes(letter) ? letter : ''));
  }

  function getPartialWord() {
    return getWordWithGuessedLetters(selectedWord, guessedLetters);
  }

  function displayWordWithGuessedLetters(word, element) {
    const display = element;
    display.innerHTML = word
      .map(letter => `<span class="display-word__letter">${letter}</span>`)
      .join('');
  }

  function displayMessage(message, element) {
    const display = element;
    display.textContent = message;
  }

  function showPopup(message) {
    displayMessage(message, popupMessageElement);
    popupElement.classList.toggle('show');
  }

  function displayWrongLetters() {
    const wrongLettersToDisplay = wrongLetters
      .map(letter => `<span>${letter}</span>`)
      .join(' ');

    wrongLettersElement.innerHTML = `${
      wrongLetters.length > 0 ? '<p>Wrong</p>' : ''
    } ${wrongLettersToDisplay}`;
  }

  function drawFigure() {
    figurePartsElement.forEach((part, index) => {
      const numErrors = wrongLetters.length;
      if (index < numErrors) {
        part.style.display = 'block';
      } else {
        part.style.display = 'none';
      }
    });
  }

  function showNotification(message) {
    displayMessage(message, notificationMessageElement);
    notificationElement.classList.add('show');
    setTimeout(() => notificationElement.classList.remove('show'), 2000);
  }

  function checkGame() {
    let message = '';

    const isGuessed = selectedWord === getPartialWord().join('');
    if (isGuessed) {
      message = 'Congratulations! You won! 😃';
    }

    const isLost = wrongLetters.length === figurePartsElement.length;
    if (isLost) {
      message = 'Unfortunately you lost. 😮';
      // if the user does not guess the word, it can be asked again later
      wordList.push(selectedWord);
    }

    if (isGuessed || isLost) {
      window.removeEventListener('keydown', handleKeyboard);
      showPopup(message);
    }
  }
  function checkInputLetter(letter) {
    // if the letter was guessed,
    // we must either store it or report its repetition
    if (selectedWord.includes(letter) && !guessedLetters.includes(letter)) {
      guessedLetters.push(letter);
      displayWordWithGuessedLetters(getPartialWord(), wordElement);
      checkGame();
      return;
    }

    // if the letter was not guessed,
    // we must either store it or report its repetition
    if (!wrongLetters.includes(letter) && !guessedLetters.includes(letter)) {
      wrongLetters.push(letter);
      displayWrongLetters();
      drawFigure();
      checkGame();
      return;
    }
    const message = `You have already entered this letter: ${letter}`;
    showNotification(message);
  }

  function handleKeyboard(event) {
    // security: identify the sender
    if (!isTrustedOrigin(event.view.origin)) return;

    if (event.keyCode >= 65 && event.keyCode <= 90) {
      // e.keyCode returns the same code to 'a' and 'A' = 65
      const letter = event.key.toLowerCase();
      checkInputLetter(letter);
    }
  }
  function setGame() {
    /* setting up data
     */
    selectedWord = getRandomWord(wordList);
    // we don't want to permit any repetition
    wordList = removeWord(selectedWord, wordList);
    guessedLetters.length = 0;
    wrongLetters.length = 0;

    /* showing the correct data
     */
    displayWordWithGuessedLetters(getPartialWord(), wordElement);
    displayWrongLetters();
    figurePartsElement.forEach(part => (part.style.display = 'none'));
    popupElement.classList.remove('show');

    /* keyboard available for the game
     */
    window.addEventListener('keydown', handleKeyboard);
  }

  async function fetchWords() {
    const request = await fetch('./data/words.json');
    return request.json();
  }

  function handlePlayAgain() {
    setGame();
  }

  function handlePopup(event) {
    // security: identify the sender
    if (!isTrustedOrigin(event.view.origin)) return;

    const isPopupShown = popupElement.classList.contains('show');
    const isValidKeyCode = event.keyCode === 13;
    if (isPopupShown && isValidKeyCode) setGame();
  }

  async function init() {
    wordList = await fetchWords();
    // we get a new word, and an update wordList with the selected word removed
    setGame();
  }

  btnPlayAgain.addEventListener('click', handlePlayAgain);
  window.addEventListener('keydown', handlePopup);
  window.addEventListener('load', init);
})();
