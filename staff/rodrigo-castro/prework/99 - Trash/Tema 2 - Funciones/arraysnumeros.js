let clock = new Date();
let hour = clock.getHours();
let minutes = clock.getMinutes();
let seconds = clock.getSeconds();
let whatTime = hour + ':' + minutes + ':' + seconds;

console.log('The time is : ' + whatTime);
console.log('The hour is: ' + hour);

let hourRounded = roundHour(hour,minutes);
console.log('The time, rounded to the nearest hour, is: ' + hourRounded)

let number1 = 7;
let number2 = 'hola';

console.log(addition(number1, number2));
console.log(subtraction(number1, number2));
console.log(times(number1, number2));
console.log(split(number1, number2));

function addition (number1, number2){
    if (typeof(number1) != Number || typeof(number2) != Number){ // Revisar las condiciones. Debe ser que si ingresan algo que no sean numeros le salga este cartel.
        console.log('You must enter 2 numbers.')
    } else {
        return number1+number2;
    }
}

function subtraction (number1, number2){
    return number1-number2;
}

function times(number1, number2){
    return number1*number2;
}

function split(number1, number2){
    return number1/number2;
}

function roundHour (hour,minutes){
    if (minutes > 29 && hour < 23){
        return hour+1;
    } else if (minutes > 29 && hour === 23){
        return '00'; // Aquí se devuelve un string para no devolver sólo 0. Habría que ver que luego no se requiera este dato como número
    } else if (minutes < 30){
        return hour;
    };
};
