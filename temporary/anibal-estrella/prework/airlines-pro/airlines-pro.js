// https://github.com/isdi-coders-env/pre-curso/blob/master/tema3-objects/tema3-proyecto-airlines.md#isdi-coders-airlines-%EF%B8%8F
const emoji = [String.fromCodePoint(0x2708)];

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
const airlinesApp = (data) => {
  // Ask user its username.

  const askUserName = () => {
    const answer = prompt(`Welcome to ISDI Airlines.\nInput your user name:`, "Anibal");
    if (!answer) {
      alert("Bye!");
      return false;
    } else {
      return answer.toUpperCase();
    }
  };
  //say by
  const finalBye = (data, user) => {
    console.log(`${userName}\nThanks for being part of ISDI Airlines.\nThis is the FINAL list for today's flights:\n${listAllFlights(data)}`);
    alert(`${userName}\nThanks for being part of ISDI Airlines.\nThis is the list for today's flights:\n${listAllFlights(data)}`);
    return;
  };
  // say bye with flights and username
  const welcomeMsg = (user) => console.log(`// Hi ${user}! Welcome to ISDI Airlines.`);
  const byeMsg = (user) => {
    console.log(`// Bye! ${user},\nthank You!`);
    alert(`Bye! ${user},\nthank You!`);
  };

  const userName = askUserName();

  //Show all flights to user
  const listAllFlights = (arr) => {
    const flightList = [];
    for (let obj of arr) {
      let escala = {};
      if (obj.scale === true) {
        escala = `realiza escala`;
      } else {
        escala = `no realiza ninguna escala`;
      }
      let formatCost = costFormatter(obj.cost);
      flightList.push(`\n${emoji[0]}El vuelo #${obj.id} con origen: ${obj.from}, y destino: ${obj.to}, tiene un coste de ${formatCost} y ${escala}.`);
    }
    return flightList.join(" ");
  };

  //Fotmat currency
  const costFormatter = (cost) => {
    return new Intl.NumberFormat("en-DE", {
      style: "currency",
      currency: "EUR",
      maximumSignificantDigits: 2,
    }).format(cost);
  };

  //A continuación, el usuario verá el coste medio de los vuelos.
  const flightCostAvg = (arr) => {
    let costList = [];
    for (let obj of arr) {
      costList.push(obj.cost);
    }
    let average = costList.reduce((a, b) => a + b, 0) / costList.length;
    average = costFormatter(average);
    return console.log(`// The average cost of all flights is:
${average}`);
  };

  // Check flights with scales
  const scaleFlights = (arr) => {
    let scaleList = [];
    for (let obj of arr) {
      if (obj.scale) {
        scaleList.push(`\nFlight ID #${obj.id}, from: ${obj.from} to: ${obj.to}.`);
      }
    }
    console.log(`// These are the ${scaleList.length} flights with stop:
    ${scaleList.join(" ")}`);
  };

  //Check for last 5 flights
  const lastFlightsOfDay = (arr) => {
    let lastFlightsList = [];
    for (let i = arr.length - 1; i >= 5; i--) {
      lastFlightsList.push(arr[i].to);
    }
    return lastFlightsList.reverse().join(", ");
  };

  // PRO!:
  //Ask user if ADMIN or USER
  let adminRights = "";
  let userRights = "";
  const promtUserAdminRight = () => {
    adminRights = confirm(`Please ${userName}:\nPress "OK" if you are an ADMIN.\nPress "CANCEL" if you're a USER.`);
    let adj = "";
    if (adminRights) {
      userRights = "ADMIN";
      adj = "";
    } else {
      userRights = "USER";
      adj = "only ";
    }
    console.log(`// Thanks ${userName}, you ${adj}have ${userRights} rights.`);
  };

  // go!!
  if (!userName) {
    return;
  } else {
    welcomeMsg(userName);
    console.log(`// These are the`, data.length, `flights programmed for today:\n`, listAllFlights(data));
    flightCostAvg(data);
    scaleFlights(data);
    console.log("// These are today last 5 destinations:\n", lastFlightsOfDay(data));
    promtUserAdminRight();
  }

  // max 15 flights
  const maxFlights = 15;
  //CREATE FLIGHT // ask if user wants to ad a new flight X/15 data > T/F
  const createNewFlights = () => {
    confirmNewFlight = confirm(`Press "OK" if you want to enter Flight ${data.length + 1} of ${maxFlights}.\nPress "CANCEL" to exit.`);
    return confirmNewFlight; //boolean
  };
  //CREATE FLIGHT // ask for new flight data > data
  const inputNewFlightData = (data) => {
    let id = data.length + 1;
    let idShow = `You are entering new flight with the id ${id}.`;
    let from = false;
    while (!createSanitizer(from)) {
      from = prompt(`${idShow}\nPlease enter new flight departure city:`, "MAD");
    }
    idShow = `You are entering new flight with the id ${id}, from ${from}.`;

    let to = prompt(`${idShow}\nPlease enter new flight desitination city:`, "BCN");
    while (!createSanitizer(to)) {
      to = prompt(`${idShow}\nPlease enter new flight desitination city:`, "BCN");
    }
    idShow = `You are entering new flight with the id ${id}, from ${from} to ${to}.`;
    let cost = prompt(`${idShow}\nPlease enter new flight cost:`, 500);
    while (cost == "" || Number.isNaN(+cost) || cost == null) {
      cost = prompt(`${idShow}\nPlease enter new flight cost:`, 500);
    }

    idShow = `You are entering new flight with the id ${id}, from ${from} to ${to}, with a cost ${costFormatter(cost)}`;
    const newScale = () => prompt(`${idShow}\nPlease enter "yes" if the new flight has a scale.\nEnter "no" if it has no scales.`, "no");
    let scale = newScale();

    while (scale !== "no" && scale !== "yes" && scale=== null) {
      scale = newScale();
    }

    let newFlight = { id: id, from: from, to: to, cost: cost, scale: scale };
    return flights.push(newFlight);
  };
  //check for errors & Sanitize
  const createSanitizer = (data) => {
    if (!isNaN(data) || data == "" || data == null) {
      return false;
    }
    return data.trim().toUpperCase();
  };

  // Poder eliminar vuelos mediante el ID.
  const askDeleteFlightsByID = (data, flight) => {
    //ask user the ID of flight to delete
    let id = prompt(`// Please, enter the Flight ID Number of the flight you want to delete:
      ${listAllFlights(data)}`);

    return id;
  };

  //function to delete flight by ID
  const deleteFlightByID = (data, id) => {
    for (let flight in data) {
      if (data[flight].id === id) {
        data.splice(data.indexOf(data[flight]), 1);
        wasFlightDeleted = true;
        console.log(
          `// You've successfully deleted the flight with the ID: #${id}.\n\nThis is the updated list of Flights:\n${listAllFlights(data)}`
        );
      }
    }
    return data;
  };

  //USER MODE
  // SEARCH FLIGHT > El usuario debe poder buscar por precio. Cuando el usuario ponga el precio,
  //debera mostrar los vuelos que tengan ese precio o mas baratos.
  const askFlightCostToSearch = (data) => {
    let cost = prompt(`// Please ${userName},\nenter the Flight Cost of the flight you want to search:\n${listAllFlights(data)}`);
    return cost;
  };

  const searchForFlights = (data, cost) => {
    let searchResult = [];
    for (let flight in data) {
      if (data[flight].cost <= cost) {
        searchResult.push(data[flight]);
      }
    }
    return searchResult;
  };

  //Start Airlines  PRO
  //if user is ADMIN
  if (userRights == "ADMIN") {
    let createOrDeleteFlight = confirm(userName + ", as an ADMIN you can:\nCREATE Flights > (press OK).\nDELETE flights > (press CANCEL).");
    if (createOrDeleteFlight === false) {
      console.log(`// You've chosen to delete flights.`);
      while (data.length) {
        let flightId = askDeleteFlightsByID(data);
        if (flightId === null) {
          finalBye(data, userName);
          return;
        } else {
          while (flightId == "" || Number.isNaN(+flightId)) {
            console.log(`// OOOPS!\n#${flightId} is not a valid ID number.`);
            alert(`// OOOPS!\n#${flightId} is not a valid ID number.`);
            flightId = askDeleteFlightsByID(data);
          }
          console.log(`// You've chosen to delete the flight with ID #${flightId}`);
        }

        deleteFlightByID(data, Number(flightId));
      }
      alert("No more flights to delete.");
      console.log("// No more flights to delete.");
      byeMsg(userName);
      //ADMIN create new flights
    } else {
      console.log(`// You've chosen to Create new Flights.`);
      while (data.length < maxFlights) {
        debugger
        let askUserCreatFlight = createNewFlights(data);
        if (askUserCreatFlight) {
          inputNewFlightData(data);
          console.log(`New Flight Added!\nThis is the updated list for today's flights::\n${listAllFlights(data)}`);

        } else {
          byeMsg(userName);
          return;
        }
      }
      if (data.length === maxFlights) {
        alert(`You have reached ${maxFlights}Flights, the maximum number for today.\nBye!`);
      }
      finalBye(data, userName);
      return;
    }
    //USER
  } else if (userRights == "USER") {
    console.log(`// ${userName}, you're a USER.`);
    console.log(`// You've chosen to SEARCH flights.`);
    let searchCost = askFlightCostToSearch(data);
    if (searchCost === null) {
      finalBye(data, userName);
    } else if (searchCost == "" || Number.isNaN(+searchCost)) {
      while (searchCost == "" || Number.isNaN(+searchCost)) {
        console.log(`// OOPS!!\n Please ${userName}, try again.`);
        searchCost = askFlightCostToSearch(data);
      }
    }
    console.log(`// You've chosen to SEARCH flights with the cost: ${costFormatter(searchCost)}.`);
    let showSearchResult = searchForFlights(data, Number(searchCost));
    if (showSearchResult.length === 0) {
      console.log(`// ${userName}, There are no flight within your budget of ${costFormatter(searchCost)}.`);
      byeMsg(userName);
    } else {
      console.log(`// ${userName}, these are the flights under your ${costFormatter(searchCost)} budget:\n${listAllFlights(showSearchResult)}`);
    }
  } else {
    return promtUserAdminRight();
  }
};

airlinesApp(flights);
