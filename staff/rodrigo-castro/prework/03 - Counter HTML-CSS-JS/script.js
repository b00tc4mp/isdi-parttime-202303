let counter = 0;

const addOne = () => {
    if (counter === 20) return;
    counter++;
}

const subtractOne = () => {
    if (counter === 0) return;
    counter--;
}

const restartApp = () => {
    counter = 0;
}

const refreshDisplay = () => {
    document.querySelector('.counter').textContent = counter;
}

const joinEventListeners = () => {
    const plusOneButton = document.querySelector('.plus-one-button');
    const minusOneButton = document.querySelector('.minus-one-button');
    const restartButton = document.querySelector('.restart-button');

    plusOneButton.addEventListener ("click", (event) => {
        event.preventDefault();
        addOne();
        refreshDisplay();
    });

    minusOneButton.addEventListener ("click", (event) => {
        event.preventDefault();
        subtractOne();
        refreshDisplay();
    });

    restartButton.addEventListener ("click", (event) => {
        event.preventDefault();
        restartApp();
        refreshDisplay();
    });

}

joinEventListeners();