let flights = [
  { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

const askForNameAndGreet = () => {
    const userName = prompt('Hello! To begin, tell me your name.');
    console.log(`Hello ${userName}! Here, you can check our flights`);
    console.log('*****************************************');
};

const showFlights = () => {
    flights.forEach((flight) => {
        if (flight.scale){
            console.log(`Flight number ${flight.id} from ${flight.from} with destination ${flight.to}, has a cost of ${flight.cost} euros and it has a scale.`);
        } else {
            console.log(`Flight number ${flight.id} from ${flight.from} with destination ${flight.to}, has a cost of ${flight.cost} euros and it's a direct flight.`);
        };
        console.log('*****************************************');
    });
};

const mediaValue = () => {
    let totalSum = 0;
    flights.forEach((flight) => {
        totalSum = totalSum + flight.cost;
    });
    console.log('Media value of the flights is ' + (totalSum/flights.length).toFixed(2));
};

const flightsWithScales = () => {
    let counter = 0;
    flights.forEach((flight) => {
        if(flight.scale){
            counter++;
        };
    });
    console.log(`There are ${counter} flights with scales.`);
};

const lastFlights = () => {
    console.log('Last flights of the day have the following destinations:');
    for (let i = flights.length - 5; i < flights.length; i++){
        console.log(flights[i].to);
    };
}

const typeOfRole = () => {
    const myRole = prompt('Are you ADMIN or USER?');
    if (myRole === null){
        return typeOfRole();
    } else if (myRole.toUpperCase() !== 'ADMIN' && myRole.toUpperCase() !== 'USER'){
        return typeOfRole();
    };
        return myRole.toUpperCase();
}

const askForPrice = () => {
    const maxPrice = +prompt("Insert the highest price you want to pay for.");
    if (maxPrice === 0 || isNaN(maxPrice)){
        return askForPrice();
    } else {
        return maxPrice;
    }
    console.log(`Here you have our flights with price less than ${maxPrice} euros`);
    console.log('************************')
}

const cheapFlights = (highestPrice) => {
    const cheapestFlights = flights.filter(flight => flight.cost < highestPrice);
    cheapestFlights.forEach((flight) => {
        console.log(`Flight number ${flight.id} from ${flight.from} to ${flight.to} costs ${flight.cost} euros.`);
        console.log('************************');
    });
}

const adminActions = () => {
    const adminAction = prompt("Do you want to CREATE or DELETE?");
    if (adminAction === null) {
        return adminActions();
    } else if (adminAction.toUpperCase() !== "CREATE" && adminAction.toUpperCase() !== "DELETE"){
        return adminActions();
    };
    return adminAction.toUpperCase();
}

const flightPrice = () => {
    const newPrice = +prompt('Insert price');
    if (newPrice <= 0){
        alert('Price must be higher than 0');
        return flightPrice();
    } else if (isNaN(newPrice)) {
        return flightPrice();
    };
    return newPrice;
}

const askForScales = () => {
    anyScales = prompt('Does the flight have any scales? (Y/N)');
    if (anyScales.toUpperCase() !== 'Y' && anyScales.toUpperCase() !== 'N'){
        return askForScales();
    } else if (anyScales.toUpperCase() === 'Y'){
        return true;
    } else {
        return false;
    };
}

const createFlight = () => {
    const newDestination = prompt('Insert destination');
    const newOrigin = prompt('Insert origin');
    const newCost = flightPrice();
    const newScale = askForScales();
    flights.push({
        id: flights[flights.length -1].id + 1,
        to: newDestination,
        from: newOrigin,
        cost: newCost,
        scale: newScale
    });
}

const idFlightToDelete = () => {
    const idToDelete = +prompt('Insert ID of the flight you want to delete.');
    if (isNaN(idToDelete)){
        return idFlightToDelete();
    }
    return idToDelete;
}

const deleteFlight = () => {
    finalIdToDelete = idFlightToDelete();
    cleanList = flights.filter(flight => flight.id !== finalIdToDelete);
    return cleanList;
}

const adminLoop = () => {
    const myAction = adminActions();
    if (myAction === 'CREATE' && flights.length < 15){
        createFlight();
        showFlights();
    } else if (myAction === 'CREATE' && flights.length >= 15){
        console.log('You have reach the limit of 15 flights.');
    } else {
        flights = deleteFlight();
        showFlights();
    };
    const nextAction = prompt('Do you want to do a new action? (Y/N)');
    if (nextAction.toUpperCase() === 'Y'){
        return adminLoop();
    } else {
        console.log('Thank you!');
    }
}

const playApp = () => {
    askForNameAndGreet();
    showFlights();
    mediaValue();
    flightsWithScales();
    lastFlights();
    const role = typeOfRole();
    console.log(role);
    if (role === 'USER'){
        const userMaxPrice = askForPrice();
        cheapFlights(userMaxPrice);        
    } else {
        adminLoop();
    };

};

playApp();