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

const flightsList = [];
const infoFlights = (flightsArray) => {
    for (let i = 0; i < Object.keys(flights).length; i++) {
        let flightDetails;
        if (flights[i].layover === false){
            flightDetails = `${flights[i].id + 1}: El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ y no realiza ninguna escala.`
            flightsList.push(flightDetails);
        } else {
            flightDetails = `${flights[i].id + 1}: El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ y realiza escala.`
            flightsList.push(flightDetails);
        }
    }
    return flightsList.join('\r\n');
};

const meanFlightsPrices = (flightsArray) => {
    let meanPrice = 0;
    for (let i = 0; i < Object.keys(flights).length; i++) {
        meanPrice += flights[i].cost;
    }
    console.log(meanPrice);
    return `el precio medio de los vuelos de hoy es de ${meanPrice/(Object.keys(flights).length)}€`;
};

const layoverFlightsList = [];
const layoverFlights = (flightsArray) => {
    for (let i = 0; i < Object.keys(flights).length; i++) {
        if (flights[i].layover === true){
            layoverFlightsList.push(flights[i].to);
        }
    }
    return layoverFlightsList.join('\r\n');
}

const lastFlightsList = [];
const lastFlights = (flightsArray) => {
    for (let i = 1; i <= 5; i++) {
        lastFlightsList.push(flights[Object.keys(flights)[Object.keys(flights).length - i]].to)
    }
    lastFlightsList.reverse();
    return lastFlightsList.join('\r\n');
}

let nameUser = prompt('Cual es tu nombre?');
alert (`Hola ${nameUser}, bienvenido al portal de ISDI Airlines!
Los vuelos disponibles para hoy son:

${infoFlights(flights)}`);

alert (`${nameUser}, ${meanFlightsPrices(flights)}`);

alert (`${nameUser}, los vuelos que efectuan escala son los vuelos con destino a: 

${layoverFlights(flights)}`);

alert (`${nameUser}, los últimos vuelos para el día de hoy son los vuelos con destino a: 

${lastFlights(flights)}`);