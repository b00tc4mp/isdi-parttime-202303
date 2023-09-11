/*
Programa una primera versión (no entregar) de una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:

Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuantos vuelos efectúan escalas.
Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
*/ 

const flights = [
    { id: 00, to: "New York", from: "Barcelona", cost: 700, layover: false },
    { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, layover: true },
    { id: 02, to: "Paris", from: "Barcelona", cost: 210, layover: false },
    { id: 03, to: "Roma", from: "Barcelona", cost: 150, layover: false },
    { id: 04, to: "London", from: "Madrid", cost: 200, layover: false },
    { id: 05, to: "Madrid", from: "Barcelona", cost: 90, layover: false },
    { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, layover: true },
    { id: 07, to: "Shangai", from: "Barcelona", cost: 800, layover: true },
    { id: 08, to: "Sydney", from: "Barcelona", cost: 150, layover: true },
    { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, layover: false },
];

let userName;
do {
userName = prompt('Welcome to ISDI Coders Airline. Please tell us your name:');
} while (userName === '');

let flight;
const layoverFlights = [];
let layoverMessage;
function showFlights() {
let allFlights = [];
for (let i = 0; i < flights.length; i++) {
    let flight = flights[i];
    if(flight.layover === false) {
    let layoverMessage = 'does not have a layover';
    } else {
    let layoverMessage = 'has a layover';


    }
  
    const flightsMessage = 'The flight from '+ flight.from + ', to ' + flight.to + ' costs ' + flight.cost + '€ y ' + layoverMessage;
    allFlights.push(flightsMessage);
    
}
alert('La lista actualizada de vuelos es \n' + allFlights.join(' \n '));
}



const costeVuelos =[];
for (let i = 0; i < flights.length; i++) {
    costeVuelos.push(flights[i].cost);
}

const sum1 = costeVuelos.reduce((previous, current) => {
    return previous + current; 
}, 0);
const numeroVuelos = costeVuelos.length;
console.log('Average flight costs are' + sum1 / numeroVuelos + '€');
console.log('the number of flights with layover is ' + layoverFlights.length);
//vuelos q salen hoy

for (let i = 5; i < flights.length; i++) {
    const todayFlight = flights[i];
console.log('The flight to ' + todayFlight.to + ' is scheduled to leave today.');

}
function askAdmin() {
    const addAction = prompt('What do you want to do? Create/delete');
    if(addAction.toLowerCase() === 'create'){
    addFlight();
    } else if(addAction.toLowerCase() === 'delete') {
        removeFlight();

    } else if (addAction === null) {
        askUser();
    }

    else {
        alert('The values are wrongly filled in, try again:')
        askAdmin();
    }
}

function addFlight() {
    let addFlight = "";
    do {

    const addFlightTo = prompt('Enter the departure country');
    const addFlightFrom = prompt('Enter the destination country');
    const addFlightCost = prompt('Enter the flight cost');
    let addFlightLayover = prompt('Does the flight have a layover? Yes/no');
    
    if (addFlightLayover.toLowerCase() === 'yes') {
        addFlightLayover = true;
    } else if((addFlightLayover.toLowerCase() === 'no')) {
        addFlightLayover = false;
    } else {
        alert('Datos erróneos, escríbe únicamente Yes o No.')   
        addFlightLayover;
    }


    
    const addFlightId = flights.length++;
    const addNewFlight = {id: addFlightId, to: addFlightTo, from: addFlightFrom, cost: addFlightCost, layover: addFlightLayover};
    flights.push(addNewFlight);
    
    showFlights();

    addFlight = prompt('Do you want to add another flight? Yes/No');
} while (addFlight.toLowerCase() === 'yes' && flights.length < 15);
}
function removeFlight() {
    let removeFlightAgain = "";
    let flightDeleted=[];
    do {
    const removeFlightId = prompt('Which flight do you want to delete? Enter ID number');
    flightDeleted = flights.filter((flight) => flight.id != removeFlightId);
    flights.length = 0;
    flights.push(...flightDeleted);
    removeFlightAgain = prompt('Still want to continue deleting? Yes/No')
    } while (removeFlightAgain.toLowerCase() === 'yes');
    console.log(flights);
}
function flightFilter() {
    const flightsByPrice= prompt('What is your maximum budget? We will show you the available flights within your budget.');
    const flightsFilteredByPrice = flights.filter((price) => price.cost < flightsByPrice);
    if (flightsByPrice <90) {
    alert('we could not find any flight at that price!')
    } else{
    console.log(flightsFilteredByPrice);
    }
}
function askUser() {



let typeOfUser = prompt('Ok, ' + userName + ', What are you? Choose: Admin/User');
let wrongUser = false;

if (typeOfUser.toLowerCase() === 'admin') {
    askAdmin();
    
    
} else if(typeOfUser.toLowerCase() === 'user') {
    flightFilter();
    
} else {
    
    
    alert('Incorrectly entered data!');
    addUser();
}
let askUserAgain = prompt('Do you want to do another operation?');

if (askUserAgain.toLowerCase() === 'yes') {
    askUser();
} else if (askUserAgain.toLowerCase() === 'no' || askUserAgain === null){
    alert('Gracias por confiar en ISDI Airlines');
} else {alert('por favor, Introduce un dato correcto.'); askUser()}


}
askUser();
