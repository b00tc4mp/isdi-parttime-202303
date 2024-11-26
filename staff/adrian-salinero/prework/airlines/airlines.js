let flights = [
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

const getUserName = () => {
  const userName = prompt("What is your username?");

  if (!userName) {
    alert("Please enter your username");
    return getUserName();
  }

  return userName;
};

const showFlightsInfo = (flights, messageForUser) => {
  console.log(messageForUser);

  flights.forEach((flight) => {
    if (flight.layover === true) {
      console.log(
        `The flight with id ${flight.id}, origen ${flight.from} and destination ${flight.to} has a price of ${flight.cost}€ and has a layover`
      );
    }

    if (flight.layover === false) {
      console.log(
        `The flight with id ${flight.id}, origen ${flight.from} and destination ${flight.to} has a price of ${flight.cost}€ and doesn't have a layover`
      );
    }
  });
};

const showAveragePrice = () => {
  let priceTotal = 0;

  flights.forEach((flight) => {
    priceTotal = priceTotal + flight.cost;
  });

  console.log(`The average price is ${priceTotal / flights.length}€`);
};

const showFlightsWithLayover = () => {
  let flightsWithLayover = 0;

  flights.forEach((flight) => {
    if (flight.layover === true) {
      flightsWithLayover++;
    }
  });

  console.log(`The number of flights with layover is ${flightsWithLayover}`);
};

const showLastFlightsDestination = () => {
  let destinations = [];

  for (var i = flights.length - 1; i >= flights.length - 5; i--) {
    destinations.push(flights[i].to);
  }

  console.log(
    `The destination of the last flights are: ${destinations.join(",")}`
  );
};

const getUserRole = () => {
  const userRole = prompt("Are you ADMIN or USER? Write ADMIN or USER");

  if (!userRole) {
    alert("Please enter 'ADMIN' or 'USER'");
    return getUserRole();
  }

  const lowerCaseUserRole = userRole.toLowerCase();

  if (lowerCaseUserRole !== "admin" && lowerCaseUserRole !== "user") {
    alert("Please enter 'ADMIN' or 'USER'");
    return getUserRole();
  }

  return lowerCaseUserRole;
};

const getAdminTask = () => {
  const adminTask = prompt(
    "Do you want to create a new flight or delete an existing flight. Write 'CREATE' or 'DELETE'"
  );

  if (!adminTask) {
    alert("Please enter 'CREATE' or 'DELETE'");
    return getAdminTask();
  }

  const lowerCaseAdminTask = adminTask.toLowerCase();

  if (lowerCaseAdminTask !== "create" && lowerCaseAdminTask !== "delete") {
    alert("Please enter 'CREATE' or 'DELETE'");
    return getAdminTask();
  }

  return lowerCaseAdminTask;
};

const deleteFlight = () => {
  const idToDelete = +prompt(
    "Introduce the ID of the flight you want to delete"
  );

  flights = flights.filter((flight) => flight.id != idToDelete);

  showFlightsInfo(
    flights,
    "After deleting the flight you selected, these are the remaining flights:"
  );
};

const calculateNextFlightId = () => {
  let flightId = flights.length;
  let arrIndex = 0;

  for (let i = 0; i < flights.length - 1; i++) {
    if (flights[arrIndex].id === i) {
      arrIndex++;
    } 
    if (flights[arrIndex].id =! i) {
      return arrIndex++;
    } 
  }
  return flightId;
};

const getLayover = () => {
  const layover = prompt("Does the flight has layover? Write 'YES' or 'NO'");

  if (!layover) {
    alert("Please enter 'YES' or 'NO'");
    return getLayover();
  }

  const lowerCaseLayover = layover.toLowerCase();

  if (lowerCaseLayover !== "yes" && lowerCaseLayover !== "no") {
    alert("Please enter 'YES' or 'NO'");
    return getLayover();
  }

  if (lowerCaseLayover === "yes") {
    return true;
  }

  if (lowerCaseLayover === "no") {
    return false;
  }
};

const createFlight = () => {
  if (flights.length >= 15) {
    alert(
      "There are 15 or more flights, you can't create new flights until you delete an existing one"
    );
  }

  if (flights.length < 15) {
    const flightId = calculateNextFlightId();
    const flightOrigin = prompt(
      "Introduce the origin of the flight you want to create"
    );
    const flightDestination = prompt(
      "Introduce the destination of the flight you want to create"
    );
    const flightPrice = +prompt(
      "Introduce the price of the flight you want to create"
    );
    const flightLayover = getLayover();

    flights.push({
      id: flightId,
      to: flightDestination,
      from: flightOrigin,
      cost: flightPrice,
      layover: flightLayover,
    });

    flights.sort((a, b) => a.id - b.id);

    showFlightsInfo(
      flights,
      "After creating the flight you selected, these are the remaining flights:"
    );
  }
};

const searchByPrice = () => {
  const maximumPrice = +prompt(
    "What is the maximum price you are willing to pay?"
  );

  const filteredFlights = flights.filter((flight) => flight.cost <= maximumPrice);

  if (filteredFlights.length === 0) {
    showFlightsInfo(
      filteredFlights,
      `There are no flights with price lower than ${maximumPrice}€`
    );
  }

  if (filteredFlights.length > 0) {
    showFlightsInfo(
      filteredFlights,
      `These are the flights with price lower than ${maximumPrice}€:`
    );
  }
};

const startAirlines = () => {
  const userName = getUserName();
  alert(`Hello ${userName}, welcome to Airlines`);
  showFlightsInfo(flights, `These are the available flights:`);
  showAveragePrice();
  showFlightsWithLayover();
  showLastFlightsDestination();

  do {
    const userRole = getUserRole();

    if (userRole === "admin") {
      const adminTask = getAdminTask();

      if (adminTask === "create") {
        createFlight();
      }

      if (adminTask === "delete") {
        deleteFlight();
      }
    }

    if (userRole === "user") {
      searchByPrice();
    }
  } while (confirm("Do you want to perform another action?"));

  alert("Goodbye, see you soon");
};

startAirlines();
