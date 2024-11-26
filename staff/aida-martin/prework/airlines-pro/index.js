const checkLayover = (flight) => {
    if (flight){
        return 'and does make any layover.'
    }

    return 'and doesn\'t make any layover.'
}

const getFlights = (flights) => {
    for (let i = 0; i < flights.length; i++){
        console.log(`The flight ${flights[i].id} with origin: ${flights[i].from}, and destination ${flights[i].to} has a cost of ${flights[i].cost}€ ${checkLayover(flights[i].layover)}`)
    }
}

const getAverageCost = (flights) => {
    let totalAverage = 0;
    flights.forEach(flight => totalAverage += flight.cost);
    return `${totalAverage/flights.length}€`;
}

const getLayoverTrue = (flights) => {
    let layoverList = [];
    for (let i = 0; i < flights.length; i++){
        if (flights[i].layover){
            layoverList.push(flights[i])
        }
    }
    return layoverList;
}

const getTheLastFlights = (flights) => {
    let theLastFlights = [];
    for (let i = (flights.length - 5); i < (flights.length); i++){
        theLastFlights.push(flights[i].to);
    }
    return theLastFlights.join(', ');
}

const getTypeOfUser = (typeOfUser) => {
    while (typeOfUser.toLowerCase() !== 'user' && typeOfUser.toLowerCase() !== 'admin'){
        alert('Please enter user/admin')
        typeOfUser = prompt(`Can you tell us if you are USER or ADMIN? Please enter user/admin`)
    }

    return typeOfUser;
}

const checkNumber = (number) => {
    if(typeof number === 'number') return true;

    if(typeof number !== 'string') return false;

    return !isNaN(parseFloat(number));
}

const getLowerPrice = (flights) => {
    let pricesOfFlights = [];
    for (let i = 0; i < (flights.length); i++){
        pricesOfFlights.push(flights[i].cost);
    }
    return Math.min(...pricesOfFlights);
}

const getIdHighest = (flights) => {
    let flightsId = [];
    for (let i = 0; i < (flights.length); i++){
        flightsId.push(flights[i].id)
    }
    return Math.max(...flightsId);
}

const createNewFlight = () => {
    if (flights.length === 15){
        alert('Sorry, you can\'t create more than 15 flights');
        choice = prompt('Do you want to create another flight? yes/no');

        return;
    }

    const newFlight = {
    };

    alert('Ok, let\'s create a new flight');

    newFlight.id = getIdHighest(flights) +1;

    let destination = prompt('Please, enter the destination of the flight');
    newFlight.to = destination;
    
    let origin = prompt('Please, enter the origin of the flight');
    newFlight.from = origin;

    let cost;
    do {
        cost = prompt('Please, enter the cost of the flight');
        if (!checkNumber(cost)){
            alert('Please enter a number');
        }
    } while (!checkNumber(cost));
    
    newFlight.cost = parseFloat(cost);

    let layover;
    do {
        layover = prompt('Please, indicate if the flight has a layover or not (true/false) ');
        if (layover !== 'true' && layover !== 'false'){
            alert('Please enter true/false');
        }
    } while (layover !== 'true' && layover !== 'false');
    
    newFlight.layover = Boolean(layover);

    flights.push(newFlight);
    console.log(`Your new flight is as follows:\nThe flight ${newFlight.id} with origin: ${newFlight.from}, and destination ${newFlight.to} has a cost of ${newFlight.cost}€ ${checkLayover(newFlight.layover)}`);
}

const deleteFlight = () => {
    alert('Ok, let\'s delete a flight');
    let toDelete = prompt('Please enter the ID of the flight you want to delete')

    const index = flights.findIndex(flight => flight.id === parseFloat(toDelete));

    if (index === -1) {
        alert('The ID does not match any flight')

        return false;
    }

    flights.splice(index, 1);

    return true;
}

const choosePermissions = (typeOfUser) => {
    if (typeOfUser.toLowerCase() === 'user'){
        let flightsByPrice = prompt('Now you can search our flights by price. Please enter a price and you will be shown flights that are not above that price.')
        while (!checkNumber(flightsByPrice) || parseFloat(flightsByPrice) < getLowerPrice(flights)){
            if (!checkNumber(flightsByPrice)){
                alert('Please enter a number without symbols or letters');
            } else {
                alert('Sorry, no flights match your search');
            }
            flightsByPrice = prompt('Now you can search our flights by price. Please enter a price and you will be shown flights that are not above that price.');
        }

        console.log(' ');
        console.log(`The flights with a price less than or equal to ${flightsByPrice}€ are:`)
        for (let i = 0; i < (flights.length); i++){
            if (parseFloat(flightsByPrice) >= flights[i].cost){
                console.log(`The flight ${flights[i].id} with origin: ${flights[i].from}, and destination ${flights[i].to} has a cost of ${flights[i].cost}€ ${checkLayover(flights[i].layover)}`);
            }
        }
        
        return;
    }

    alert('As admin, you can create new flights or delete existing ones');
    let choice = prompt('Do you want to create a flight or, on the contrary, delete an existing one? create/delete');
    while (choice.toLowerCase() !== 'create' && choice.toLowerCase() !== 'delete'){
        alert('Please enter create/delete');
        choice = prompt('Do you want to create a flight or, on the contrary, delete an existing one? create/delete');
    }
    if(choice === 'create') {
        let doMoreCreate;
        do {
            createNewFlight(flights);
            doMoreCreate = prompt('Do you want to create another flight? yes/no');
        } while (doMoreCreate === 'yes');

        return;
    }

    let doMoreDeleted;
    do {
        const isDeleted = deleteFlight(flights);
        if (isDeleted) {
            console.log(' ');
            getFlights(flights);
        }
        doMoreDeleted = prompt('Do you want to delete another flight? yes/no');
    } while (doMoreDeleted === 'yes');


}

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

let userName = prompt(`Hello! Enter your user name, please`);

alert(`Welcome to your trusted airline, ${userName}! :)`);

alert('You will then be shown all available flights');

getFlights(flights);

alert('The average cost of the flights will then be shown to you');

console.log(`\nThis is the average cost of the flights: ${getAverageCost(flights)}`);

alert('You can also see how many flights will make layovers, below');

console.log(`\nThe number of flights that make layovers is ${getLayoverTrue(flights).length}`);

alert('The next thing will be to show you the last five flights of the day');

console.log(`\nThe last flights of the day are to ${getTheLastFlights(flights)}\n `);

do {
    let typeOfUser = prompt(`Can you tell us if you are USER or ADMIN? Please enter user/admin`);

    typeOfUser = getTypeOfUser(typeOfUser);

    alert(`Ok, ${userName}, you are ${typeOfUser.toLowerCase()}! :)`);

    choosePermissions(typeOfUser);
} while (window.confirm('Do you want to do more operations?'));

alert('Thanks for using me! Goodbye, see you soon :)')
