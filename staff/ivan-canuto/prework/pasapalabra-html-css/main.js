document.write('<script src="questions.js"></script>');

const welcomeGamePage = document.querySelector(".welcome-game");
const pasapalabraExplanationsPage = document.querySelector(".pasapalabra-explanations");
const startedGamePage = document.querySelector(".started-game-container");
const playAgainPage = document.querySelector(".play-again");

const continueButton = document.querySelector(".continue-button");
const startButton = document.querySelector(".start-button");
const sendButton = document.querySelector('.send-button');
const pasapalabraButton = document.querySelector('.pasapalabra-button');

const questionToAsk = document.querySelector('.question');
const contestantAnswer = document.querySelector('.contestant-answer')

continueButton.addEventListener("click", () => {
  welcomeGamePage.classList.add("hidden");
  pasapalabraExplanationsPage.classList.remove("hidden");
});

startButton.addEventListener("click", () => {
  pasapalabraExplanationsPage.classList.add("hidden");
  startedGamePage.classList.remove("hidden");
});

sendButton.addEventListener('click',)

pasapalabraButton.addEventListener('click', )

// pasapalabraBalls.forEach(ball => balls.push(ball));
