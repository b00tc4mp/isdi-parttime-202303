const welcomeGamePage = document.querySelector(".welcome-game");
const pasapalabraExplanationsPage = document.querySelector(".pasapalabra-explanations");
const startedGamePage = document.querySelector(".started-game-container");
const playAgainPage = document.querySelector(".play-again");

const continueButton = document.querySelector(".continue-button");
const startButton = document.querySelector(".start-button");
const sendButton = document.querySelector('.send-button');
const pasapalabraButton = document.querySelector('.pasapalabra-button');

const pasapalabraLetters = document.querySelectorAll('.pasapalabra-letter')
const letterQuestion = startedGamePage.querySelector('.letter-question')
const readySetGo = startedGamePage.querySelector('.ready-set-go');
const ready = startedGamePage.querySelector('.ready');
const set = startedGamePage.querySelector('.set');
const go = startedGamePage.querySelector('.go');
const questionInputs = startedGamePage.querySelector('.question-inputs')
const questionBox = startedGamePage.querySelector('.question');


continueButton.addEventListener("click", () => {
  welcomeGamePage.classList.add("hidden");
  pasapalabraExplanationsPage.classList.remove("hidden");
  startButton.classList.remove('hidden');
});

startButton.addEventListener("click", () => {
  pasapalabraExplanationsPage.classList.add("hidden");
  startButton.classList.add('hidden');
  startedGamePage.classList.remove("hidden");
  
  showReadySetGo()
});

getQuestions();

// sendButton.addEventListener('click',)

// pasapalabraButton.addEventListener('click', )

// pasapalabraBalls.forEach(ball => balls.push(ball));
