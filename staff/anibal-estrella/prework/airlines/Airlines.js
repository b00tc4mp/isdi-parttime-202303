// https://github.com/isdi-coders-env/pre-curso/blob/master/tema3-objects/tema3-proyecto-airlines.md#isdi-coders-airlines-%EF%B8%8F

// Proyecto del tema 3
// ISDI Coders Airlines! airplanesmall_airplane
// (Los datos de los vuelos están al final del enunciado, podéis usarlos en vuestro código)

// Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:
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

const airlinesApp = data => {
  // Se preguntará por el nombre de usuario y dará la bienvenida.
  const userName = prompt(`Hi! Input your username:`);

  const welcomeMsg = user =>
    console.log(`Hi ${user}!
Welcome to Prometheus Airlines.`);
  // El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.

  const listAllFlights =  arr => {
    const flightList = [];
    for (let obj of arr) {
      let escala = {};
      if (obj.scale === true) {
        escala = `realiza escala`;
      } else {
        escala = `no realiza ninguna escala`;
      }
      flightList.push(
        `
El vuelo #${obj.id} con origen: ${obj.from}, y destino: ${obj.to}, tiene un coste de ${obj.cost}€ y ${escala}.`
      );
    }
    console.log(`// These are the ${arr.length} flights programmed for today:
    ${flightList.join(" ")}
`);
  };
  //A continuación, el usuario verá el coste medio de los vuelos.
  const flightCostAvg = arr => {
    let costList = [];
    for (let obj of arr) {
      costList.push(obj.cost);
    }
    const average =
      costList.reduce((a, b) => a + b, 0) / costList.length;
    return console.log(`// The average cost of all flights is: ${average}€`);
  };

  // También podrá ver cuantos vuelos efectúan escalas.
  const scaleFlights = arr => {
    let scaleList = [];
    for (let obj of arr) {
      if (obj.scale) {
        scaleList.push(`Flight #${obj.id}, from: ${obj.from} to ${obj.to}.
`);
      }
    }
    console.log(`// These are the ${scaleList.length} flights with stop: 
${scaleList.join(' ')}`);
  };

  // Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
  const lastFlightsOfDay = arr => {
    let lastFlightsList = [];
    for (let i = arr.length - 1; i >= 5; i--) {
      lastFlightsList.push(arr[i].to);
    }
    console.log(
      `// These are today last 5 destinations: ${lastFlightsList
        .reverse()
        .join(", ")}.`
    );
  };

  // go!!
  welcomeMsg(userName);


  listAllFlights(data);
  flightCostAvg(data);
  scaleFlights(data);
  lastFlightsOfDay(data);
};

airlinesApp(flights);

// PRO!:

// Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, dependiendo de la elección, el programa se comportará de la siguiente manera:

// Si eres ADMIN, la función debería permitir:

// Poder crear, más vuelos, pidiendo la información por prompt(), sin poder pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
// Poder eliminar vuelos mediante el ID.
// Si eres USER la función debería permitir:

// El usuario debe poder buscar por precio. Cuando el usuario ponga el precio, debera mostrar los vuelos que tengan ese precio o mas baratos.
// Recursos: http://stackoverflow.com/questions/1290131/javascript-how-to-create-an-array-of-object-literals-in-a-loop

// http://stackoverflow.com/questions/15742442/declaring-array-of-objects

// // This is a example of array of objects... each position of array contains one object...
