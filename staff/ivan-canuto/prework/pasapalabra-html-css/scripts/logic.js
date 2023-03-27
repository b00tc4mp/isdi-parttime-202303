const showReadySetGo = ()=>{
  
  ready.classList.toggle('hidden')
    setTimeout(function() {
      set.classList.toggle('hidden')
      setTimeout(function() {
        go.classList.toggle('hidden')
        setTimeout(function() {
          readySetGo.classList.add("hidden");
          questionBox.classList.remove('hidden');
          questionInputs.classList.remove('hidden');
          return true;
        }, 1000);
      }, 1000);
    }, 1000);
  return true;
}


let i = 0;
let gameQuestions = questions;
const getQuestions = ()=>{

  let questionAsked = gameQuestions[i].alternativeWords[0].question;
  let response = gameQuestions[i].alternativeWords[0].answer;
  questionBox.textContent = questionAsked;
  letterQuestion.addEventListener('submit', (e)=>{
    e.preventDefault();
    const contestantAnswer = startedGamePage.querySelector('input[name="input-player"]').value;
    if (contestantAnswer === response) {
      pasapalabraLetters[i].classList.add('correct-answer');
      gameQuestions.splice(i, 1)
      return getQuestions();
    }
    if (contestantAnswer !== response) {
      pasapalabraLetters[i].classList.add('wrong-answer')
      gameQuestions.splice(i, 1)
      return getQuestions();
    }
  })
  pasapalabraButton.addEventListener('click', ()=> {
    i++;
    return getQuestions();
  })
}



