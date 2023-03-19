const initialPage = document.querySelector('.pasapalabra-initial-page')
const gamePage = document.querySelector('.pasapalabra-game-page')

const goIntroductionPage = ()=> {
  gamePage.style.display = 'none';
  initialPage.style.display = 'block';

  const pasapalabraRoulette = document.querySelector('.roulette-container');
  const pasapalabraBalls = document.querySelectorAll('.pasapalabra-ball');
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', ()=>{
    initialPage.style.display = 'none';
    gamePage.style.display = 'block';
  });
  const balls = []
  pasapalabraBalls.forEach(ball => balls.push(ball));

  const radius = 200;
  const centroX = pasapalabraRoulette.offsetWidth / 2;
  const centroY = pasapalabraRoulette.offsetHeight / 2;
  const angle = 360 / balls.length;

  for (let i = 0; i < balls.length; i++) {
    let x = Math.round(centroX + radius * Math.cos((angle * i) * Math.PI / 180));
    let y = Math.round(centroY + radius * Math.sin((angle * i) * Math.PI / 180));
    balls[i].style.left = x + 'px';
    balls[i].style.top = y + 'px';
  }
}

const goPlayingPage = ()=>{

}

const playPasapalabra = ()=> {
  goPlayingPage
}

playPasapalabra();
