    const styleGreen = [
      'color: #bde093',
    ].join(';');
    const styleRed = [
      'color: #ff5722',
    ].join(';');
    const styleBlue = [
      'color: #4fc3f7',
    ].join(';');
    const bigFont = [
      'font-size: 16px',
    ].join(';');

    let userName
    let bombo = []
    let sortedNumbers = []
    let passedNumbers = []
    let lineCompleted
    let userPoints = 0
    let awesometer
    let userWin = false
  
    const getRanking = () => {
      const rankingRandomNumber1 = Math.floor(Math.random() * 500 + (userPoints / 2))
      const rankingRandomNumber2 = Math.floor(Math.random() * 550 + (userPoints / 2))
      const rankingRandomNumber3 = Math.floor(Math.random() * 600 + (userPoints / 2))
      const rankingRandomNumber4 = Math.floor(Math.random() * 650 + (userPoints / 2))
      const rankingRandomNumber5 = Math.floor(Math.random() * 700 + (userPoints / 2))
      const ranking = [
        {name: userName, points: userPoints},
        {name: 'Tirmary', points: rankingRandomNumber1},
        {name: 'Lucas', points: rankingRandomNumber2},
        {name: 'Aida', points: rankingRandomNumber3},
        {name: 'Rodrigo', points: rankingRandomNumber4},
        {name: 'Flors', points: rankingRandomNumber5}
      ]
      ranking.sort((a, b) => b.points - a.points)
      console.log('And the rank is...')
      ranking.forEach(position => console.log(`${position.name} ${position.points}`));
    }
  
    const generateBombo = () => {
      const lowerNumber = 1
      const higherNumber = 90

      for (i = lowerNumber; i < higherNumber + 1; i++) {
        bombo.push(i)
      }
    }
  
    const getBingoCards = () => {
      const higherCardsNumber = 15
      const cardNumbers = []
      let maximumNumber = 90;

      for (let i = 1; i <= maximumNumber; i++) {
          cardNumbers.push(i);
      }

      for (let x = 1; x <= higherCardsNumber; x++) {
          randomNumber = Math.floor(Math.random() * cardNumbers.length)
          randomizedNumber = cardNumbers[randomNumber];
          sortedNumbers.push(randomizedNumber);
          cardNumbers.splice(randomNumber, 1);
      }
  
      sortedNumbersCopy = sortedNumbers
      const sortedCard = sortedNumbers.sort((a,b)=>a-b)
      cardsLine1 = sortedCard.slice(0,5).join(' - ')
      cardsLine2 = sortedCard.slice(5,10).join(' - ')
      cardsLine3 = sortedCard.slice(10,15).join(' - ')
      cardsLineCopy1 = sortedNumbers.slice(0,5)
      cardsLineCopy2 = sortedNumbers.slice(5,10)
      cardsLineCopy3 = sortedNumbers.slice(10,15)
  
      const confirmRandomNumbers = confirm(`${userName}, you like these numbers? \n ${cardsLine1} \n ${cardsLine2} \n ${cardsLine3}`)

      if (confirmRandomNumbers) {
        return sortedCard;
      } else { 
        sortedNumbers = []
        return getBingoCards()
      }
    }
  
    const getSortedNumber = () => {
      randomNumber = Math.floor(Math.random() * bombo.length);
      randomizedNumber = bombo[randomNumber];
      const indexRandomNumber = randomNumber
      passedNumbers.push(randomizedNumber);
      bombo.splice(indexRandomNumber, 1);

      const checkLines = () => {
        if (!lineCompleted) {
          if (cardsLineCopy1.length === 0 || cardsLineCopy2.length === 0 || cardsLineCopy3.length === 0) {
            
            alert('Congratulations! You got a line! 🥉')
            console.log('%cCongratulations! You got a line! 🥉', bigFont)
            let sumPoints = userPoints + 300 
            userPoints = sumPoints
            lineCompleted = true  

            if (cardsLineCopy1.length === 0) {
              cardsLineCopy1 = 'line'
            }

            if (cardsLineCopy2.length === 0) {
              cardsLineCopy2 = 'line'
            }

            if (cardsLineCopy3.length === 0) {
              cardsLineCopy3 = 'line'
            }
          }
        } 
        
        if (lineCompleted) {
          if (cardsLineCopy1.length === 0) {
            cardsLineCopy1 = 'line'
          }

          if (cardsLineCopy2.length === 0) {
            cardsLineCopy2 = 'line'
          }

          if (cardsLineCopy3.length === 0) {
            cardsLineCopy3 = 'line'
          }
        }
  
        if (cardsLineCopy1 === 'line' && cardsLineCopy2 === 'line' && cardsLineCopy3 === 'line') {
          let sumPoints = userPoints + 500 
          userPoints = sumPoints

          alert('Bingo! You win! 🏆🏆🏆🏆')
          console.log(`%cBingo! You win! 🏆🏆🏆🏆 That's ${awesometer} ${userName}!`, bigFont)
          alert(`${userName} you got ${userPoints} points.`)

          getRanking()
          askEndGame()

          userWin = true
        } 
  
      }
  
      const checkMatch = (randomNumber) => {   
        const findNumbers = sortedNumbers.findIndex((obj) => obj === randomNumber);
        
        if (findNumbers === -1 ) {
          console.log(`%cThe number is ${randomNumber}, maybe in next time 🎲`, styleRed)
          console.log('%cYour card numbers: \n' + cardsLine1 + '\n' + cardsLine2 + '\n' + cardsLine3, styleGreen)
          let restPoints = userPoints - 5 
          userPoints = restPoints
        } else {
          sortedNumbers[findNumbers] = 'X'
          const sortedCard = sortedNumbers.sort((a,b)=>a-b)
          cardsLine1 = sortedCard.slice(0,5).join(' - ')
          cardsLine2 = sortedCard.slice(5,10).join(' - ')
          cardsLine3 = sortedCard.slice(10,15).join(' - ')
          let sumPoints = userPoints + 100 
          userPoints = sumPoints
          console.log(`%cThe number is ${randomNumber}, and it match! 🥁 That's so ${awesometer} ${userName}!`, styleBlue)
          console.log('%cYour card numbers: \n' + cardsLine1 + '\n' + cardsLine2 + '\n' + cardsLine3, styleGreen)
  
          const indexLine1 = cardsLineCopy1.indexOf(randomNumber);

          if (indexLine1 > -1) { 
            cardsLineCopy1.splice(indexLine1, 1);
          }

          const indexLine2 = cardsLineCopy2.indexOf(randomNumber);
          if (indexLine2 > -1) { 
            cardsLineCopy2.splice(indexLine2, 1);
          }

          const indexLine3 = cardsLineCopy3.indexOf(randomNumber);
          if (indexLine3 > -1) { 
            cardsLineCopy3.splice(indexLine3, 1);
          }

          const indexCard = sortedNumbersCopy.indexOf(randomNumber);
          if (indexCard > -1) { 
            sortedNumbersCopy.splice(indexCard, 1);
          }

        } 
        console.log('Your points: ',userPoints)
  
        if (bombo.length === 0) {
          console.log(bombo)
          askEndGame()
        } else { 
          checkLines()
        }

        if (userPoints < 300) {
          awesometer = 'good'
        } else if (userPoints < 900) {
          awesometer = 'nice'
        } else {
          awesometer = 'awesome'
        }
      }
       
      if (cardsLineCopy1 === 'line' && cardsLineCopy2 === 'line' && cardsLineCopy3 === 'line') {
        return
      } 

      if (bombo.length > 0) {
        checkMatch(randomizedNumber)
      }

      if (bombo.length > 0 && !userWin) {
        getNewNumber()
      }
  
    }
  
    const getNewNumber = () => {
      const newNumber = confirm('Do yo want a new number?')

      if (!newNumber) {
        askEndGame()
      } else {
        getSortedNumber()
      }
    }
    const sayGoodbye = () => {
      return alert(`Thanks for playing ${userName}!`)
    } 
  
    const askEndGame = () => {
      const startAgain = confirm('Do you want to start again?')
        
      if (startAgain) {
        userName
        bombo = []
        sortedNumbers = []
        passedNumbers = []
        lineCompleted
        userPoints = 0
        awesometer
        playBingo()
      } else {
       return sayGoodbye()
      }
    }
  
    playBingo = () => {
     userName = prompt('Welcome to ISDI Bingo! Before start the game, whats your name?')

      if (!userName || !/^[a-zA-Z]+$/.test(userName)) {
        alert('Please, write your name only with letters ❌')
        playBingo()
      }

      alert(`Nice ${userName}! Before starting the game you will be given a card with 15 random numbers. If you don't like them, you can change them before starting the game. \nThe aim is to complete the whole cardboard in as few turns as possible and to get the highest possible score.`)
      alert(`For each number that does not match, 5 points will be deducted. \nFor each matching number, 100 points will be added.\nFor a complete line, 300 points will be added.\nIf you complete the bingo, an additional 500 points will be added.\n
      Good luck!`)
      const startGame = confirm(`${userName}, do you want to start the game?`)

      if (startGame) {
        generateBombo() 
        getBingoCards()
        getSortedNumber()
      } else {
        sayGoodbye()
      }
    }
    playBingo()
