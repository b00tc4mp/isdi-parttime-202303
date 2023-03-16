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

const userName = prompt("Welcome, whats your name?");

const getUserPermission = (userName) => {
  let askForPermission = prompt(
    `Hello ${userName}, are you an admin? yes/no`,
    "Yes or no"
  );

  if (askForPermission) {
    askForPermission = askForPermission.toLowerCase();
  }

  if (askForPermission === "yes") {
    return "admin";
  } else if (askForPermission === "no") {
    return "user";
  } else {
    alert("You should answer only 'yes' or 'no'");
  }
};

const getAnswer = (userAnswer) => {
  if (userAnswer) {
    userAnswer = userAnswer.toLowerCase();
  }

  if (userAnswer === "yes") {
    return true;
  } else if (userAnswer !== "no") {
    alert("You should answer only 'yes' or 'no'");
  }
  return false;
};

const createFlight = (id) => {
  const flight = {};

  const flightFrom = prompt("Where will your flight take off?");
  const flightTo = prompt("Where will landing your flight?");
  const flightLayover = prompt("will it have any layover?");
  const flightCost = prompt("How much will it cost?");

  flight.id =
    flights.reduce((maxId, flight) => Math.max(flight.id, maxId), 0) + 1;
  flight.from = flightFrom;
  flight.to = flightTo;
  flight.layover = flightLayover;
  flight.cost = flightCost;

  flights.push(flight);

  return flight;
};

const adminCreateFlight = () => {
  let numberFlightsCreated = 0;
  let createNewFlight = true;

  while (createNewFlight && numberFlightsCreated < 15) {
    let askForCreateFlight = prompt(
      "Do you want to create a flight? yes/no",
      "Yes or no"
    );

    createNewFlight = getAnswer(askForCreateFlight);

    if (createNewFlight) {
      createFlight();
      numberFlightsCreated += 1;
      console.log("Here is your flights list updated");
      showAllFlights(flights);
    }
  }

  if (numberFlightsCreated === 15) {
    alert(`You already created ${numberFlightsCreated} flights`);
  }
};

const removeFlightById = (flights, id) => {
  let flightFound = false;

  for (let flight of flights) {
    if (flight.id === id) {
      flightFound = true;
      flights.splice(flights.indexOf(flight), 1);
    }
  }

  if (flightFound) {
    return true;
  } else {
    alert("Flight ID not found.");
  }
};

const adminDeleteFlight = (flights) => {
  let deleteFlight = true;
  while (deleteFlight) {
    let messageDeleteFlight = prompt("Do you want to delete some flight?");
    deleteFlight = getAnswer(messageDeleteFlight);

    if (deleteFlight) {
      const idFlightDelete = parseInt(
        prompt("Write its ID to proceed", "write id number")
      );
      removeFlightById(flights, idFlightDelete);
    }

    console.log("Here is your flights list updated");
    showAllFlights(flights);

    if (flights.length === 0) {
      alert("There is no flight avaliable");
    }
  }
};

const flightsByBudget = () => {
  let budgetFlights = [];
  const budget = parseInt(prompt("Whats your budget to fly?"));
  for (let flight of flights) {
    if (flight.cost <= budget) {
      budgetFlights.push(flight);
    }
  }

  if (budgetFlights.length === 0) {
    console.log("There are no flights available in that budget");
  } else {
    console.log("Here are your flights avaliables");
  }

  return budgetFlights;
};

const showAllFlights = (flights) => {
  for (let flight of flights) {
    if (flight.layover) {
      layoverFlight = "Layovers";
    } else {
      layoverFlight = "Direct";
    }
    console.log(`Flight with id: ${flight.id}
    from ${flight.from} to ${flight.to} / ${layoverFlight} - cost: ${flight.cost} $`);
  }
};

const run = () => {
  console.log("Here are avaliable flights");
  showAllFlights(flights);

  let userPermission = getUserPermission(userName);

  if (userPermission === "admin") {
    adminCreateFlight();
    adminDeleteFlight(flights);
  } else if (userPermission === "user") {
    const userBudgetFligths = flightsByBudget();
    showAllFlights(userBudgetFligths);
  }
  confirm("Do you want to do something more?")
    ? run()
    : console.log("See you soon");
};
run();
