const sum = (numbers) => {
    let totalSum = 0;
    for (const numberList of numbers){
        totalSum += numberList;
    }
    return totalSum;
}; 

const subtraction = (numbers) => {
    let totalSubtraction = numbers[0];
    for (let i = 1; i < numbers.length; i++){
        totalSubtraction -= numbers[i];
    }
    return totalSubtraction;
};

const multiplication = (numbers) => {
    let totalMultiplication = numbers[0];
    for (let i = 1; i < numbers.length; i++){
        totalMultiplication *= numbers[i];
    }
    return totalMultiplication;
};

const division = (numbers) => {
    let totalDivision = numbers[0];
    for (let i = 1; i < numbers.length; i++){
        totalDivision /= numbers[i];
    }
    return totalDivision;
};

const squareRoot = (a) => Math.sqrt(a);

const checkNumber = (number) => {
    if(typeof number === 'number') return true;

    if(typeof number !== 'string') return false;

    return !isNaN(parseFloat(number));
}

const limitDecimals = (number) => {
    if (!Number.isInteger(number)){
    return parseFloat(number).toFixed(3);
    } else {
        return number;
    }
}

const getMoreNumber = () => {
    let newNumber = prompt('Ok, enter another number')
    while(!checkNumber(newNumber)){
        alert('Please enter a number!')
        newNumber = prompt('Ok, enter another number')
    }
    return newNumber;
}

const calculateResults = () => {
    let calculator = prompt(`Hi! I'm your calculator. Enter a number`)
    const numberList = []

    while (!checkNumber(calculator)){
        alert('Please enter a number')
        calculator = prompt(`Hi! I'm your calculator. Enter a number`)
    }

    numberList.push(parseFloat(calculator));

    let yesNoOption = '';
    do {
        let repeatMoreNumbers = false;
        do {
            yesNoOption = prompt(`Do you want to add another number? yes/no`);
            if (yesNoOption !== 'yes' && yesNoOption !== 'no'){
                repeatMoreNumbers = true;
                alert('Please, enter yes or no');
            } else {
                repeatMoreNumbers = false;
            }
        } while (repeatMoreNumbers);


        if (yesNoOption === 'yes'){
            calculator = getMoreNumber();
            numberList.push(parseFloat(calculator));
        }
        
    } while (yesNoOption === 'yes');

    if (numberList.length === 1){
        if (Math.sign(numberList[0]) === -1){
            alert('It is not possible to take the square root of a negative number!')
        } else {
            const results = {
                NumberList: numberList.join(','),
                SquareRoot: limitDecimals(squareRoot(numberList[0])),
            }
            return `Your number is: ${results.NumberList}\nThe result of the square root is: ${results.SquareRoot}`;
        }
    } else { 
        const results = {
            NumberList: numberList.join(','),
            Sum: limitDecimals(sum(numberList)),
            Subtraction: limitDecimals(subtraction(numberList)),
            Multiplication: limitDecimals(multiplication(numberList)),
            Division: limitDecimals(division(numberList))
        };
        return `Your numbers are: ${results.NumberList}\nThe result of the sum is: ${results.Sum}\nThe result of the subtraction is: ${results.Subtraction}\nThe result of the multiplication is: ${results.Multiplication}\nThe result of the division is: ${results.Division}`;
    }
}

const totalResults = [];
let results;
let secondYesNoOption = '';

do {
    results = calculateResults();
    totalResults.push(results);
    console.log(results);
    let repeatMoreCalculator = false;
    do {
        secondYesNoOption = prompt('Do you want to do more operations? yes/no');
        if (secondYesNoOption !== 'yes' && secondYesNoOption !== 'no'){
            repeatMoreCalculator = true;
            alert('Please, enter yes or no!');
        } else {
            repeatMoreCalculator = false;
        }
    } while (repeatMoreCalculator);
    
} while (secondYesNoOption === 'yes');

alert('Thanks for using me! Goodbye!')
