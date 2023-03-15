const userInput = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const multiplicator = 12;
const numberOfPairs = 3;

const pairMultiplicator = (userInput, multiplicator, numberOfPairs) => {
    const numbersDoubles = numbersInput.map(x => x * multiplicator);
    for (let i = 0; i < numberOfPairs; i++){
        console.log(`${i+1}º pair: ${numbersDoubles[i]} - ${numbersDoubles[i+1]}`);
    };
};

pairMultiplicator(userInput, multiplicator, numberOfPairs);