const askForData = (userName, userAge) => {
    const agePlusNumber = userAge + randomNumber();
    if (agePlusNumber < 20){
        youngMessage();
    } else {
        oldMessage();
    };
}

const randomNumber = () => {
    const myNumber = (Math.random()*50).toFixed(0);
    console.log(`Your random number: ${myNumber}`);
    return +myNumber;
}

const youngMessage = () => {
    console.log('Are you sure you are Pepe?');
}

const oldMessage = () => {
    console.log('Hello Pepe!')
}

const playAll = () => {
    const printData = askForData('pepe', randomNumber());
    console.log(printData);
}


playAll();