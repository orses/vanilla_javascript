<<<<<<< HEAD
(() => {
  const btnCheck = document.querySelector('.btn--check');
  const btnPlay = document.querySelector('.btn--play');
  const displayMessage = document.querySelector('.result__title');
  const elNumber = document.querySelector('.header__number');
  const elNumberGuess = document.querySelector('.number__guess');
  const elScoreHight = document.querySelector('#score-hight');
  const elScoreResult = document.querySelector('#score-result');
  let highScore = 0;
  let numberToGuess = null;
  let score = 20;

  function getMessageToDisplay(answer) {
    const message = {
      error: '🤔 No a valid number',
      higher: '👆 Too hight!',
      lost: '😢 You lost the game!',
      lower: '👇 Too low!',
      success: '🎉 Correct Number!',
      start: 'Start guessing...',
    };

    return message[answer];
  }

  function getRandomNumber(min, max) {
    return Math.trunc(Math.random() * (max - min + 1)) + min;
  }

  function isCorrect(guess, number) {
    return guess === number;
  }

  function isHigher(guess, number) {
    return guess > number;
  }

  function isValidAnswer(guess) {
    if (guess.length === 0) return false;

    const guessNumber = Number(guess);
    return typeof guessNumber === 'number' && Number.isFinite(guessNumber);
  }

  function checkAnswer(guessValue) {
    if (!isValidAnswer(guessValue)) return 'error';

    const guessNumber = Number(guessValue);
    if (isCorrect(guessNumber, numberToGuess)) return 'success';

    // At this point, the answer is not correct, so the user scores -1
    score--;
    if (score > 0) {
      if (isHigher(guessNumber, numberToGuess)) return 'higher';
      return 'lower';
    }

    // At this point, the user lost the game
    return 'lost';
  }

  function startGame() {
    numberToGuess = getRandomNumber(1, 20);
    elNumberGuess.value = '';
    btnCheck.classList.toggle('disabled');
    btnCheck.disabled = false;
    score = 20;
    elScoreResult.textContent = score;
    displayMessage.textContent = getMessageToDisplay('start');
    elNumberGuess.disabled = false;
    elNumberGuess.select();
    elNumber.textContent = '?';
    if (elNumber.classList.contains('highlight'))
      elNumber.classList.toggle('highlight');
  }

  function handleCheckGuess(e) {
    e.preventDefault();
    const answer = checkAnswer(elNumberGuess.value, numberToGuess);
    displayMessage.textContent = getMessageToDisplay(answer);
    elScoreResult.textContent = score;
    elNumberGuess.select();

    if (answer === 'lost' || answer === 'success') {
      btnCheck.classList.toggle('disabled');
      btnCheck.disabled = true; /* to prevent its use by key press */
      elNumberGuess.disabled = true;
    }

    if (answer === 'success') {
      highScore = Math.max(score, highScore);
      elScoreHight.textContent = highScore;
      elNumber.textContent = numberToGuess;
      elNumber.classList.toggle('highlight');
      elNumberGuess.value = '';
      elNumber.focus();
    }
  }

  function handlePlayAgain() {
    startGame();
  }

  function handleApp() {
    startGame();
  }

  btnCheck.addEventListener('click', handleCheckGuess);
  btnPlay.addEventListener('click', handlePlayAgain);
  window.addEventListener('DOMContentLoaded', handleApp);
})();
=======
(() => {
  const btnCheck = document.querySelector('.btn--check');
  const btnPlay = document.querySelector('.btn--play');
  const displayMessage = document.querySelector('.result__title');
  const elNumber = document.querySelector('.header__number');
  const elNumberGuess = document.querySelector('.number__guess');
  const elScoreHight = document.querySelector('#score-hight');
  const elScoreResult = document.querySelector('#score-result');
  let highScore = 0;
  let numberToGuess = null;
  let score = 20;

  function getMessageToDisplay(answer) {
    const message = {
      error: '🤔 No a valid number',
      higher: '👆 Too hight!',
      lost: '😢 You lost the game!',
      lower: '👇 Too low!',
      success: '🎉 Correct Number!',
      start: 'Start guessing...',
    };

    return message[answer];
  }

  function getRandomNumber(min, max) {
    return Math.trunc(Math.random() * (max - min + 1)) + min;
  }

  function isCorrect(guess, number) {
    return guess === number;
  }

  function isHigher(guess, number) {
    return guess > number;
  }

  function isValidAnswer(guess) {
    if (guess.length === 0) return false;

    const guessNumber = Number(guess);
    return typeof guessNumber === 'number' && Number.isFinite(guessNumber);
  }

  function checkAnswer(guessValue) {
    if (!isValidAnswer(guessValue)) return 'error';

    const guessNumber = Number(guessValue);
    if (isCorrect(guessNumber, numberToGuess)) return 'success';

    // At this point, the answer is not correct, so the user scores -1
    score--;
    if (score > 0) {
      if (isHigher(guessNumber, numberToGuess)) return 'higher';
      return 'lower';
    }

    // At this point, the user lost the game
    return 'lost';
  }

  function startGame() {
    numberToGuess = getRandomNumber(1, 20);
    elNumberGuess.value = '';
    btnCheck.classList.toggle('disabled');
    btnCheck.disabled = false;
    score = 20;
    elScoreResult.textContent = score;
    displayMessage.textContent = getMessageToDisplay('start');
    elNumberGuess.disabled = false;
    elNumberGuess.select();
    elNumber.textContent = '?';
    if (elNumber.classList.contains('highlight'))
      elNumber.classList.toggle('highlight');
  }

  function handleCheckGuess(e) {
    e.preventDefault();
    const answer = checkAnswer(elNumberGuess.value, numberToGuess);
    displayMessage.textContent = getMessageToDisplay(answer);
    elScoreResult.textContent = score;
    elNumberGuess.select();

    if (answer === 'lost' || answer === 'success') {
      btnCheck.classList.toggle('disabled');
      btnCheck.disabled = true; /* to prevent its use by key press */
      elNumberGuess.disabled = true;
    }

    if (answer === 'success') {
      highScore = Math.max(score, highScore);
      elScoreHight.textContent = highScore;
      elNumber.textContent = numberToGuess;
      elNumber.classList.toggle('highlight');
      elNumberGuess.value = '';
      elNumber.focus();
    }
  }

  function handlePlayAgain() {
    startGame();
  }

  function handleApp() {
    startGame();
  }

  btnCheck.addEventListener('click', handleCheckGuess);
  btnPlay.addEventListener('click', handlePlayAgain);
  window.addEventListener('DOMContentLoaded', handleApp);
})();
>>>>>>> 8214b560d7a6b0eca37d02a19be1f25d87d015b1
