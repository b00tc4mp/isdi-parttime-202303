const runAirLinesApp = ()=>{
  let name = prompt(
    "Hello, welcome to our Airline services, what is your name?"
  );

  if (name) {
    alert(`Welcome ${name}! Feel free tu pick a flight and enjoy our services.`);
    showFligths();
    getAverageCost();
    getLayover();
    getDestinationFlights();
    logIn();
  }
  else {
    let question = confirm("You didn't entered any character, do you want to continue?")
    if (question) runAirLinesApp()
    else alert("Thanks for using our Airline app.\nHave a good day, bye!");
  }
}

const showFligths = () => {
  let allFligths = [];
  let allFligths2 = [];
  allFligths.push("The flights available are:\n");
  allFligths2.push("The flights available are:\n");
  for (i = 0; i < flights.length; i++) {
    if (i < 10) {
      allFligths.push(
        `The flight ${flights[i].id + 1} goes from ${flights[i].from} to ${flights[i].to} with a cost of ${flights[i].cost}€ ${doesLayover(flights[i].layover)}\n`
      );
    }
    if ( i >= 10) {
      allFligths2.push(
        `The flight ${flights[i].id + 1} goes from ${flights[i].from} to ${flights[i].to} with a cost of ${flights[i].cost}€ ${doesLayover(flights[i].layover)}\n`
      );
    }
  }
  allFligths = allFligths.join("");
  allFligths2 = allFligths2.join("");
  if (flights.length <= 10) alert(allFligths);
  else {
    alert(allFligths);
    alert(allFligths2);
  }
};

const doesLayover = (layover) => {
  return layover ? "and does make layovers." : "and doesn't make layovers.";
};

// Function to know the fligths' average price
const getAverageCost = () => {
  let total = flights[0].cost;
  for (i = 1; i < flights.length; i++) {
    total = total + flights[i].cost;
  }
  total = total / flights.length;
  alert(`The average cost of all the flights available today is: ${total}€.`);
};

// Function to know wich fligth does a layover or wich doesn't
const getLayover = () => {
  let yesLayover = [];
  let noLayover = [];
  yesLayover.push("The flights that make layovers are:\n.");
  noLayover.push("\nAnd the flights that don't make layovers are:\n");
  for (i = 0; i < flights.length; i++) {
    if (flights[i].layover) {
    yesLayover.push(
      `The flight ${flights[i].id + 1} from ${flights[i].from} to ${flights[i].to}.\n`);
    } else {
    noLayover.push(
      `The flight ${flights[i].id + 1} from ${flights[i].from} to ${flights[i].to}.\n`);
    }
  }
  yesLayover = yesLayover.join("");
  noLayover = noLayover.join("");
  alert(yesLayover + noLayover);
};

// Function to know the flights' destination
const getDestinationFlights = () => {
  let destinationAllFlights = [];
  destinationAllFlights.push(
    `The five last flights of the day and their destinations are:\n`
  );
  for (i = 4; i < flights.length; i++) {
    destinationAllFlights.push(
      `The flight ${flights[i].id + 1} and goes to ${flights[i].to}.\n`
    );
  }
  destinationAllFlights = destinationAllFlights.join("");
  alert(destinationAllFlights);
};

// LogIn to know if you want to enter as an admin or as an user
const logIn = () => {
  let logInName = prompt(
    "How do you want to continue?\nIf you want to continue as administrator of our app write 'ADMIN'.\nIf you want to continue as user write 'USER'.\n(Press 'Cancel' or leave it blank and press 'Accept' to leave.)"
  );
  
  if (!logInName) {
    let askExit = confirm(
      "You didn't introduced a value, are you sure you want to exit?\nAccept = 'yes', Canel = 'No'"
      );
      if (askExit) {
        alert("Thanks for using our Airline app.\nHave a good day, bye!");
        return;
      }
      else logIn();
    return;
  }
    
  logInName = logInName.toLowerCase();
  if (logInName !== "admin" && logInName !== "user") {
    alert("You didn't entered a correct value.\nPlease enter a correct one.");
    logIn();
  }

  if (logInName === "admin") logInAdmin();
  else if (logInName === "user") consultPrice();
};

// Function for the admin's operations
const logInAdmin = () => {
  let operationToDo = prompt(
    "What are you going to do as an admin?\nIf you want to create a flight write 'Create'.\nIf you want to continue as user write 'Delete'.\n(Press 'Cancel' or leave it blank and press 'Accept' to go back.)"
  );

  if (!operationToDo) {
    logIn();
    return;
  }

  operationToDo = operationToDo.toLowerCase();
  if (operationToDo !== "create" && operationToDo !== "delete") {
    alert("You didn't entered a correct value.\nPlease enter a correct one.");
    logInAdmin();
  } else if (operationToDo === "create") createFlight();
  else if (operationToDo === "delete") deleteFlight();
};

// Function to create a flight
const createFlight = () => {
  if (flights.length === 15) {
    alert("There is already 15 flights available, you can't create any one more.\nIf you want to create one flight you need to delete one existing in the list.")
    logInAdmin();
  }
  let newFlight = {}
  alert('Now you are going to create a new flight, to do so you need to enter different values, which are:\n 1 -The place of origin of the flight.\n 2 -The place where it is going to land.\n 3 -The cost of itself.\n 4 -Whether it is going to do layover or not.');

  let fromFlight = prompt(
    "Please, introduce where does your new flight leaves from."
  );
  let toFlight = prompt(
    "Please, introduce what dastination is your flight going."
  );
  let costFlight = prompt(
    "What is the cost of this new flight?"
  );
  let layoverFlight = confirm(
    'Does your flight going to do any layover?\nAccept = "yes", Canel = "No"'
  );

  if ((fromFlight === null || toFlight === null || costFlight === null) || (fromFlight === '' || toFlight === '' || costFlight === '')) {
    let askExit = confirm(
      "You didn't introduced a value, are you sure you want to continue?\nAccept = 'yes', Canel = 'No'"
    );
    if (askExit) createFlight();
    else logInAdmin();
  }

  costFlightNumber = Number(costFlight);
  if (isNaN(costFlightNumber)) {
    alert("Please, what you introduced is not a number, enter a correct one.")
    createFlight();
  }
  if (!Number.isInteger(costFlightNumber)) costFlightNumber.toFixed(2)

  let newId = flightId(flights) + 1;

  newFlight.id = newId;
  newFlight.to = toFlight;
  newFlight.from = fromFlight;
  newFlight.cost = costFlightNumber;
  newFlight.layover = layoverFlight;

  flights.push(newFlight)

  showFligths();
  let question = confirm('Do you wanto to continue using our Airline app?')
  if (question) logIn();
  else alert("Thanks for using our Airline app.\nHave a good day, bye!");
}

const flightId = (flights)=>{
  let flightsId = []
  for (i = 0; i < flights.length; i++) {
    flightsId.push(flights[i].id)
  }
  return Math.max(...flightsId);
}

// Function to delete a flight
let deleteFlight = () => {

  showFligths();

  const getNumberFlight = () => {
    let numberFlight = prompt(
      "As an administrator you can delete any flight of our Airline app.\nPlease, enter the number of the flight you want to delete."
    );

    if (!numberFlight) {
      let userInput = confirm("You didn't entered any number, do you want to continue?")
      if (userInput) deleteFlight();
      else logInAdmin();
    }

    numberFlight = Number(numberFlight);
    if (numberFlight === NaN) {
      alert("What you entered is not a number");
      getNumberFlight();
    }
    let numberFlightId = numberFlight - 1;
    for (let i = 0; i < flights.length; i++) {
      if (flights[i].id === numberFlightId) {
        let userInput = confirm(`Are you sure you want to delete the flight ${flights[i].id + 1} from ${flights[i].from} to ${flights[i].to} from our Airline app?`)
        if (userInput) {
          flights.splice(i, 1)
          showFligths();
          let userInput = confirm('Do you wanto to continue using our Airline app?')
          if (userInput) logIn();
          else alert("Thanks for using our Airline app.\nHave a good day, bye!");
        }
        else deleteFlight();
      }
    }
  };
  getNumberFlight();
};

// Function to consult the price
const consultPrice = () => {
  let priceToConsult = prompt(
    "As an user you can consult the prices of our Airline to see wich flights do you want to choose.\nPlease, enter a price to consult all the flights with that price and lower.\n(Press 'Cancel' or leave it blank and press 'Accept' to go back.)"
  );

  if (!priceToConsult) {
    logIn();
    return;
  }

  priceToConsult = Number(priceToConsult);
  if (priceToConsult === NaN) {
    priceToConsult = +prompt("Please, that is not a number, enter one.");
  }

  let priceConsulted = [];
  let priceEqual = []
  priceConsulted.push(
    `\nThe flights with a lower cost than ${priceToConsult}€ are:\n`
  );
  
  for (i = 0; i < flights.length; i++) {
    if (flights[i].cost === priceToConsult) {
      priceEqual.push(
        `The flight ${flights[i].id + 1} goes from ${flights[i].from} to ${flights[i].to} with a cost of ${flights[i].cost}€ ${doesLayover(flights[i].layover)}\n`
      );
    }
  }

  if (priceEqual.length === 0) priceEqual.push("There's no flights with the same price as the one entered.\nYou can check below other fligths with a lower price, or check more flights by enetering other prices again.\n")
  else priceEqual.unshift(`The flights withs a price of ${priceToConsult}€ are:\n`)

  for (i = 0; i < flights.length; i++) {
    
    if (flights[i].cost < priceToConsult) {
      priceConsulted.push(
        `The flight ${flights[i].id + 1} from ${flights[i].from} to ${flights[i].to} with a cost of ${flights[i].cost}€.\n`
      );
    }
  }
  priceConsulted = priceConsulted.join('')
  priceEqual = priceEqual.join('')
  alert(priceEqual + priceConsulted);
  let userInput = confirm('Do you wanto to continue using our Airline app?')
  if (userInput) logIn();
  else alert("Thanks for using our Airline app.\nHave a good day, bye!");
};

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

runAirLinesApp();