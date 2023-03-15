let counterNumber = 0;

const incrementCounter = () => {
    if (counterNumber < 100) {
        counterNumber++
        document.getElementById("counter").innerHTML = counterNumber;
    }
}

const decrementCounter = () => {
    if (counterNumber > 0) {
        counterNumber--
        document.getElementById("counter").innerHTML = counterNumber;
    }
}

const resetCounter = () => {
    counterNumber = 0;
    document.getElementById("counter").innerHTML = counterNumber;
}