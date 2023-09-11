const coinsGrid = [
    { r0: "e", r1: "e", r2: "e", r3: "e", r4: "e", r5: "e" },
    { r0: "e", r1: "e", r2: "e", r3: "e", r4: "e", r5: "e" },
    { r0: "e", r1: "e", r2: "e", r3: "e", r4: "e", r5: "e" },
    { r0: "e", r1: "e", r2: "e", r3: "e", r4: "e", r5: "e" },
    { r0: "e", r1: "e", r2: "e", r3: "e", r4: "e", r5: "e" },
    { r0: "e", r1: "e", r2: "e", r3: "e", r4: "e", r5: "e" },
    { r0: "e", r1: "e", r2: "e", r3: "e", r4: "e", r5: "e" },
  ];

const startGame = () => {
  document.querySelector(".round-button").classList.remove("goes-color");
  document.querySelector(".round-button").classList.add("goes-color-red");
  document.querySelector(".restart-text").textContent = "RESTART";
};

const restartGame = () => {
  document.querySelectorAll(".space").forEach((button) => {
    button.classList.remove("yellow-player");
    button.classList.remove("red-player");
  });
  document.querySelector(".round-button").classList.remove("goes-color-yellow");
  document.querySelector(".round-button").classList.add("goes-color-red");

  coinsGrid.forEach((column) => {
    for (let row in column) {
      column[row] = "e";
    }
  });
  document.querySelector(".turn").textContent = "NOW GOES";
};

const checkIfColumnWin = () => {
  for (let i = 0; i < coinsGrid.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        coinsGrid[i][`r${j}`] === coinsGrid[i][`r${j + 1}`] &&
        coinsGrid[i][`r${j}`] === coinsGrid[i][`r${j + 2}`] &&
        coinsGrid[i][`r${j}`] === coinsGrid[i][`r${j + 3}`] &&
        coinsGrid[i][`r${j}`] !== "e"
      ) {
        document
          .querySelector(".round-button")
          .classList.toggle("goes-color-red");
        document
          .querySelector(".round-button")
          .classList.toggle("goes-color-yellow");
        document.querySelector(".turn").textContent = "WINNER!";
      }
    }
  }
};

const checkIfRowWin = () => {
  for (let i = 0; i < coinsGrid.length - 3; i++) {
    for (let j = 0; j < Object.keys(coinsGrid[i]).length; j++) {
      if (
        coinsGrid[i][`r${j}`] === coinsGrid[i + 1][`r${j}`] &&
        coinsGrid[i][`r${j}`] === coinsGrid[i + 2][`r${j}`] &&
        coinsGrid[i][`r${j}`] === coinsGrid[i + 3][`r${j}`] &&
        coinsGrid[i][`r${j}`] !== "e"
      ) {
        document
          .querySelector(".round-button")
          .classList.toggle("goes-color-red");
        document
          .querySelector(".round-button")
          .classList.toggle("goes-color-yellow");
        document.querySelector(".turn").textContent = "WINNER!";
      }
    }
  }
};

const checkIfDiagonalRigthWin = () => {
  for (let i = 0; i < coinsGrid.length - 3; i++) {
    for (let j = 0; j < Object.keys(coinsGrid[i]).length - 3; j++) {
      if (
        coinsGrid[i][`r${j}`] === coinsGrid[i + 1][`r${j + 1}`] &&
        coinsGrid[i][`r${j}`] === coinsGrid[i + 2][`r${j + 2}`] &&
        coinsGrid[i][`r${j}`] === coinsGrid[i + 3][`r${j + 3}`] &&
        coinsGrid[i][`r${j}`] !== "e"
      ) {
        document
          .querySelector(".round-button")
          .classList.toggle("goes-color-red");
        document
          .querySelector(".round-button")
          .classList.toggle("goes-color-yellow");
        document.querySelector(".turn").textContent = "WINNER!";
      }
    }
  }
};

const checkIfDiagonalLeftWin = () => {
  for (let i = 0; i < coinsGrid.length - 3; i++) {
    for (let j = Object.keys(coinsGrid[i]).length - 1; j > 2; j--) {
      if (
        coinsGrid[i][`r${j}`] === coinsGrid[i + 1][`r${j - 1}`] &&
        coinsGrid[i][`r${j}`] === coinsGrid[i + 2][`r${j - 2}`] &&
        coinsGrid[i][`r${j}`] === coinsGrid[i + 3][`r${j - 3}`] &&
        coinsGrid[i][`r${j}`] !== "e"
      ) {
        document
          .querySelector(".round-button")
          .classList.toggle("goes-color-red");
        document
          .querySelector(".round-button")
          .classList.toggle("goes-color-yellow");
        document.querySelector(".turn").textContent = "WINNER!";
      }
    }
  }
};

const exitGame = () => {
  location.reload();
};

const selectColumn = (startButtonText, columnSelected, button) => {
  if (
    startButtonText.textContent === "RESTART" &&
    document.querySelector(".turn").textContent !== "WINNER!"
  ) {
    let rowNumber = 5;
    columnSelected = button.innerText;
    if (
      document
        .querySelector(".round-button")
        .classList.contains("goes-color-yellow")
    ) {
      do {
        if (
          !document
            .querySelector(`.row${rowNumber}.column${columnSelected}`)
            .classList.contains("yellow-player") &&
          !document
            .querySelector(`.column${columnSelected}.row${rowNumber}`)
            .classList.contains("red-player")
        ) {
          document
            .querySelector(`.column${columnSelected}.row${rowNumber}`)
            .classList.add("yellow-player");
          coinsGrid[columnSelected][`r${rowNumber}`] = "y";
          rowNumber = 0;
          document
            .querySelector(".round-button")
            .classList.toggle("goes-color-red");
          document
            .querySelector(".round-button")
            .classList.toggle("goes-color-yellow");
        }
        rowNumber--;
      } while (rowNumber >= 0);
    } else if (
      document
        .querySelector(".round-button")
        .classList.contains("goes-color-red")
    ) {
      do {
        if (
          !document
            .querySelector(`.row${rowNumber}.column${columnSelected}`)
            .classList.contains("yellow-player") &&
          !document
            .querySelector(`.column${columnSelected}.row${rowNumber}`)
            .classList.contains("red-player")
        ) {
          document
            .querySelector(`.column${columnSelected}.row${rowNumber}`)
            .classList.add("red-player");
          coinsGrid[columnSelected][`r${rowNumber}`] = "r";
          rowNumber = 0;
          document
            .querySelector(".round-button")
            .classList.toggle("goes-color-red");
          document
            .querySelector(".round-button")
            .classList.toggle("goes-color-yellow");
        }
        rowNumber--;
      } while (rowNumber >= 0);
    }
    checkIfColumnWin();
    checkIfRowWin();
    checkIfDiagonalRigthWin();
    checkIfDiagonalLeftWin();
  }
};



export {startGame, restartGame, exitGame, selectColumn}