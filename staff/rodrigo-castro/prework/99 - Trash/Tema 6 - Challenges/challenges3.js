const userNumber1 = 1413;
const userNumber2 = 4233;
const factor = 2;


const codeScript = (numberToConvert,multiplicator) => {
    numberToConvert = numberToConvert*multiplicator
    let auxString = numberToConvert.toString();
    auxString = auxString.split("");
    const lastNumber = auxString.shift();
    auxString.push(lastNumber);
    auxString = auxString.join("");
    const convertedNumber = +auxString;
    console.log(convertedNumber);
    return convertedNumber;
};

const decrypter = (numberToRevert,divisor) => {
    numberToRevert = numberToRevert/divisor;
    let auxiliaryString = numberToRevert.toString();
    auxiliaryString = auxiliaryString.split("");
    const firstNumber = auxiliaryString.pop();
    auxiliaryString.unshift(firstNumber);
    auxiliaryString = auxiliaryString.join("");
    const decryptedNumber = +auxiliaryString;
    console.log(decryptedNumber);
    return decryptedNumber;

}

const converter = (a,b,multi) => {
    a = codeScript(a,multi);
    b = codeScript(b,multi);
    console.log("***************");
    a = decrypter(a,multi);
    b = decrypter(b,multi);
    // const repeat = confirm("Repeat?");
    // if(repeat){
    //     return converter(a,b,factor);
    // }
};


converter(userNumber1, userNumber2,factor);
