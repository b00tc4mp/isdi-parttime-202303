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


const getInfoFlights = (allFlightsList) => {
    const flightsList = [];
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

const calculateFlightsMeanPrice = (allFlightsList) => {
    let meanPrice = 0;
    for (let i = 0; i < Object.keys(flights).length; i++) {
        meanPrice += flights[i].cost;
    }
    meanPrice = meanPrice/(Object.keys(flights).length)
    if (meanPrice % 1 != 0) {
        meanPrice = meanPrice.toFixed(3);
      }
    return `el precio medio de los vuelos de hoy es de ${meanPrice}€`;
};

const getLayoverFlights = (allFlightsList) => {
    const layoverFlightsList = [];
    for (let i = 0; i < Object.keys(flights).length; i++) {
        if (flights[i].layover === true){
            layoverFlightsList.push(flights[i].to);
        }
    }
    return layoverFlightsList.join('\r\n');
}


const getLastFlights = (allFlightsList) => {
    const lastFlightsList = [];
    for (let i = 1; i <= 5; i++) {
        lastFlightsList.push(flights[Object.keys(flights)[Object.keys(flights).length - i]].to)
    }
    lastFlightsList.reverse();
    return lastFlightsList.join('\r\n');
}

let nameUser = prompt('Cual es tu nombre?');
alert (`Hola ${nameUser}, bienvenido al portal de ISDI Airlines!`);

alert (`Los vuelos disponibles para hoy son:

${getInfoFlights(flights)}`);
    
alert (`${nameUser}, ${calculateFlightsMeanPrice(flights)}`);
    
alert (`${nameUser}, los vuelos que efectuan escala son los vuelos con destino a: 
    
${getLayoverFlights(flights)}`);
    
alert (`${nameUser}, los últimos vuelos para el día de hoy son los vuelos con destino a: 
    
${getLastFlights(flights)}`);

let airlinesLoopCheck = true;
while (airlinesLoopCheck === true) {
    let userTypeCheck = true;
    let userType = prompt(`${nameUser}, que tipo de acceso tienes?
    ADMIN o USER?`)
    while (userTypeCheck === true) {
        userType = userType.toLowerCase();
        if (userType === "admin" || userType === "user") {
            userTypeCheck = false;
        } else {
            userType= prompt(`Error! Por favor indica correctamente el tipo de usuario:
ADMIN o USER`);
        }
    };
    
    if (userType === "user") {
        let priceConsultCheck = true;
        let priceConsult = prompt(`${nameUser}, indicanos el precio máximo por el que quieres viajar!`)
        while (priceConsultCheck === true) {
            if (priceConsult.match(/^[+-]?\d+(\.\d+)?$/)) {
                priceConsult = Number(priceConsult);
                priceConsultCheck = false;
              } else {
                priceConsult = prompt("Error! Por favor introduce un número valido!");
              }
        };
        const underPriceFlightsList = [];
        const getUnderPriceFlights = (allFlightsList) => {
            for (let i = 0; i < Object.keys(allFlightsList).length; i++) {
                if (allFlightsList[i].cost <= priceConsult){
                    underPriceFlightsList.push(allFlightsList[i].to);
                }
            }

            if (underPriceFlightsList.length >= 1) {
                return `${nameUser}, los vuelos con un precio igual o inferior a ${priceConsult}€ son los vuelos con destino a: 
            
${underPriceFlightsList.join('\r\n')}`;
            } else {
                return `${nameUser}, no hemos encontrado ningún vuelo para este rango de precio.`;
            }          
        }
        
        alert(`${getUnderPriceFlights(flights)}`)
        
        let userFinalCheck = true;
        let userFinal = prompt(`${nameUser}, quieres realizar alguna acción de user o admin más? si/no`);
        while (userFinalCheck === true) {
            userFinal = userFinal.toLowerCase();
            if (userFinal === 's' || userFinal === 'si') {
                userFinalCheck = false;  
                airlinesLoopCheck = true;
            } else if (userFinal === 'n' || userFinal === 'no') {
                userFinalCheck = false;  
                airlinesLoopCheck = false;
            } else {
                userFinal = prompt ('Por favor, responde si/no');
            }
        }

    } else if (userType === 'admin'){
        let adminLoopCheck = true;
        while (adminLoopCheck === true) {
            let actionTypeCheck = true;
            let actionType = prompt(`${nameUser}, que tipo de acción quieres realizar?
CREAR o ELIMINAR?`)
            while (actionTypeCheck === true) {
                actionType = actionType.toLowerCase();
                if (actionType === "crear" || actionType === "eliminar") {
                    actionTypeCheck = false;
                } else {
                    actionType = prompt(`Error! Por favor indica correctamente el tipo de acción:
CREAR o ELIMINAR`);
                }
            };
        
            if (actionType === 'eliminar') {
                let deletedIdCheck = true;
                let deletedId = prompt(`${nameUser}, que ID quieres eliminar?`)
                while (deletedIdCheck === true) {
                    if (deletedId.match(/^[+-]?\d+(\.\d+)?$/)) {
                        deletedId = Number(deletedId);
                        if (0 < deletedId && deletedId <= flights.length) {
                            for (let i = 0; i < flights.length; i++) {
                                if (flights[i].id === deletedId) {
                                flights.splice(i, 1);
                                }
                            }
                            for (let a = 0; a < flights.length; a++) {
                                flights[a]['id'] = a;
                            }
                        } else {
                            deletedId = prompt(`Error! ID introducida no valida!`);
                        }
                        deletedIdCheck = false;
                    } else {
                        deletedId = prompt(`Error! ID introducida no valida!`);
                    }
                }
                alert (`${nameUser}, la lista de vuelos queda actualizada de la siguiente manera:

${getInfoFlights(flights)}`)
            } else if (actionType === 'crear') {
                if (flights.length >= 15) {
                    alert (`${nameUser}, número máximo de vuelos alcanzado. Por favor elimine alguna entrada antes de añadir nuevos vuelos!`)
                } else {
                    let createdFlight = flights.length;
                    const newFlight = {};
                    let newFlightPriceCheck = true;
                    let newFlightLayoverCheck = true;
                    
                    newFlight.id = createdFlight;
                    newFlight.to = prompt(`${nameUser}, introduce la destinación del vuelo.`);
                    newFlight.from = prompt(`${nameUser}, introduce el origen del vuelo.`);
                    newFlightCost = prompt(`${nameUser}, introduce el precio del vuelo.`);
                    while (newFlightPriceCheck === true) {
                        if (newFlightCost.match(/^[+-]?\d+(\.\d+)?$/)) {
                            newFlight.cost = Number(newFlightCost);
                            newFlightPriceCheck = false;
                        } else {
                            newFlightCost = prompt(`Error! Introduce un valor valido!`);
                        }
                    } 
                    newFlightLayover = prompt(`${nameUser}, introduce el número de escalas que realiza este vuelo.`);
                    while (newFlightLayoverCheck === true) {
                        if (newFlightLayover.match(/^[+-]?\d+(\.\d+)?$/)) {
                            newFlightLayover = Number(newFlightLayover);
                            if (newFlightLayover > 0) {
                                newFlight.layover = true;
                                newFlightLayoverCheck = false;
                            } else {
                                newFlight.layover = false;
                                newFlightLayoverCheck = false;
                            }
                        } else {
                            newFlightLayover = prompt(`Error! Introduce un valor valido!`);
                        }
                    }
                    flights.push(newFlight); 
                }
            }

            let adminFinalCheck = true;
            let adminFinal = prompt(`${nameUser}, quieres realizar alguna acción de crear o eliminar más? si/no`);
            while (adminFinalCheck === true) {
                adminFinal = adminFinal.toLowerCase();
                if (adminFinal === 's' || adminFinal === 'si') {
                    adminFinalCheck = false;  
                    adminLoopCheck = true;
                } else if (adminFinal === 'n' || adminFinal === 'no') {
                    adminFinalCheck = false;
                    adminLoopCheck = false;
                    let adminFinalInfoCheck = true;
                    let adminInfoFinal = prompt(`${nameUser}, quieres realizar alguna acción de user o admin más? si/no`);
                    while (adminFinalInfoCheck === true) {
                        adminInfoFinal = adminInfoFinal.toLowerCase();
                        if (adminInfoFinal === 's' || adminInfoFinal === 'si') {
                            adminFinalInfoCheck = false;  
                            airlinesLoopCheck = true;
                        } else if (adminInfoFinal === 'n' || adminInfoFinal === 'no') {
                            adminFinalInfoCheck = false;  
                            airlinesLoopCheck = false;
                        } else {
                            adminInfoFinal = prompt ('Por favor, responde si/no');
                        }
                    }
                } else {
                    adminFinal = prompt ('Por favor, responde si/no');
                }
            }
        }    
    };
}

alert (`Gracias por usar el portal de vuelos de ISDI airlines! Hasta la próxima!`);