const flights = [
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

const playApp = () => {
    askForNameAndGreet();
    showFlights();
    mediaValue();
    flightsWithScales();
    lastFlights();
};

playApp();