//fibonacci

const userArguments = 12;
const fibonacciSerie = [0];

const fibo = (arguments) => {
    fibonacciSerie.push(1);
    for (let i = 0; i < arguments-2; i++){
        fibonacciSerie.push(fibonacciSerie[i+1]+fibonacciSerie[i]);
    };
    for (let i = 0; i < arguments; i++){
        console.log(`${fibonacciSerie[i]} - position ${i}`);
    };
};

const fiboPyramid = () => {
    
    
    const arrayToPrint = fibonacciSerie.filter()
    
    let counter = 0
    for (let i = 0; i < userArguments; i++){
       console.log()
    }
} //TERMINAR ALGUN DIA ))

fibo(userArguments);
console.log(fibonacciSerie);