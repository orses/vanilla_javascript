import { dataQuestions } from '../../data/data_questions.js';

(() => {
  const quizFrontPage = document.querySelector('.quiz__front-page');
  const quizContainer = document.querySelector('.quiz__container');
  const quizHeader = document.querySelector('.quiz__header');
  const quitTitle = document.querySelector('.quiz__title');
  const quizChoices = document.querySelector('.quiz__choices');
  const quizImage = document.querySelector('.quiz__image');
  const quizCounter = document.querySelector('.quiz__counter');
  const quizImageGauge = document.querySelector('.quiz__image-gauge');
  const quizTimeGauge = document.querySelector('.quiz__time-gauge');
  const quizProgress = document.querySelector('.quiz__progress');
  const quizScore = document.querySelector('.quiz__score');

  const indexLastQuestion = dataQuestions.length - 1;
  let runningQuestion = 0;
  let score = 0;
  let count = 0;
  let Timer = null;
  const questionTime = 10; // 10 s

  /* *************************************************************
   * Finish Quiz
   */
  function scoreRender() {
    quizScore.classList.remove('hidden');
    const scorePerCent = Math.round((score / dataQuestions.length) * 100);

    let scoreImage = null;
    if (scorePerCent >= 80) scoreImage = './assets/images/5.png';
    else if (scorePerCent >= 60) scoreImage = './assets/images/4.png';
    else if (scorePerCent >= 40) scoreImage = './assets/images/3.png';
    else if (scorePerCent >= 20) scoreImage = './assets/images/2.png';
    else scoreImage = './assets/images/1.png';

    quizScore.innerHTML = `<img src="${scoreImage}">`;
    quizScore.innerHTML += `<p>${scorePerCent}% of the answers are correct</p>`;
  }

  function stopQuiz() {
    clearInterval(Timer);
    scoreRender();
  }

  /* *************************************************************
   * Check answers
   */
  function nextQuestion() {
    if (runningQuestion < indexLastQuestion) {
      runningQuestion++;
      count = 0;
      // eslint-disable-next-line no-use-before-define
      renderQuestion();
    } else {
      stopQuiz();
    }
  }

  function manageCorrectAnswer(choice) {
    score++;
    choice.classList.remove('selected');
    choice.classList.add('success');
    document
      .querySelector(`#progress-${runningQuestion}`)
      .classList.add('success');
  }

  function manageWrongAnswer(choice) {
    choice.classList.remove('selected');
    choice.classList.add('failed');
    document
      .querySelector(`#progress-${runningQuestion}`)
      .classList.add('failed');
  }

  function checkAnswer(event) {
    event.preventDefault();
    const choice = event.target;
    const answer = choice.dataset.quiz;
    if (!answer) return;

    const { choices, correct } = dataQuestions[runningQuestion];

    if (choices[answer] === correct) {
      manageCorrectAnswer(choice);
    } else {
      manageWrongAnswer(choice);
    }
    quizChoices.removeEventListener('click', checkAnswer);

    setTimeout(nextQuestion, 1000);
  }

  /* *************************************************************
   * Render questions
   */
  function renderQuestion() {
    const question = dataQuestions[runningQuestion];
    quizHeader.innerHTML = `Question #${runningQuestion + 1}`;
    quitTitle.innerHTML = `<p>${question.question}</p>`;
    quizImage.innerHTML = `<img src="${question.imgSrc}" alt="logo">`;

    let choices = '';
    question.choices.forEach((choice, index) => {
      choices += `<div class="quiz__choice" data-quiz="${index}" id="${index}">${choice}</div>`;
    });

    quizChoices.innerHTML = choices;

    quizChoices.addEventListener('click', checkAnswer);
  }

  /* *************************************************************
   * Render progress bar
   */
  function renderProgress() {
    for (
      let indexQuestion = 0;
      indexQuestion <= indexLastQuestion;
      indexQuestion++
    ) {
      quizProgress.innerHTML += `<div class="quiz__progress-info" id="progress-${indexQuestion}"></div>`;
    }
  }

  /* *************************************************************
   * Render counter
   */
  const gaugeWidth = 150; // 150 px
  const gaugeUnit = gaugeWidth / questionTime;

  function renderCounter() {
    if (count <= questionTime) {
      quizCounter.innerHTML = count;
      quizTimeGauge.style.width = `${count * gaugeUnit}px`;
      count++;
    } else {
      nextQuestion();
    }
  }

  /* *************************************************************
   * Init applications
   */

  function startQuiz() {
    quizFrontPage.classList.add('hidden');
    renderQuestion();
    quizContainer.classList.remove('hidden');
    renderProgress();
    renderCounter();
    Timer = setInterval(renderCounter, 1000); // 1000 ms = 1 s
  }

  function handlerContentLoaded() {
    quizFrontPage.addEventListener('click', startQuiz);
  }

  console.log(dataQuestions);

  window.addEventListener('DOMContentLoaded', handlerContentLoaded);
})();
