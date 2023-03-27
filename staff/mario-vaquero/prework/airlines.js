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

const getUserName = () => {
  let username = prompt('Por favor introduce tu nombre: ');
  if (username !== '') {
      
      alert(`Bienvenido, ${username}.`);
  } else {
      username = 'Invitado'
      
      alert(`Bienvenido, ${username}.`);
  } 
};

const hasLayover = (layover) => {
  if (layover) {
      return 'y hace escala.'
  } else {
      return 'sin escalas.'
  }
};

const availableFlights = () => {
  
  const flightsIntro = 'Los vuelos para hoy son los siguientes:\n'
  let actualFlights = [flightsIntro];
  for (let i = 0; i < flights.length; i++) {
      if (i< flights.length) {
          actualFlights.push(`El vuelo ${flights[i].id} con origen ${flights[i].from}, destino ${flights[i].to} tiene un coste de ${flights[i].cost}€  ${hasLayover(flights[i].layover)}\n`)
      }
  } 
  alert(actualFlights.join(''))
};

const averageCost = () => {
  let priceToFly = 0;
  for (let i = 0; i < flights.length; i++) {
      priceToFly += flights[i].cost;
  }
  const averagePrice = priceToFly / flights.length;
  alert(`El precio medio de los vuelos es de: ${averagePrice}€.`)
};

const checkLayover = () => {
  let fligthsWithLayover = [];

  for (let i = 0; i < flights.length; i++) {
      if (flights[i].layover) {
          fligthsWithLayover.push(`El vuelo ${flights[i].id} con origen ${flights[i].from}, destino ${flights[i].to} tiene un coste de ${flights[i].cost} ${hasLayover(flights[i].layover)}.\n`) /*${hasLayover(flights[i].layover)} esto va seguido de tiene un coste de ${flights[i].cost} */
      }
  }
  
  alert(`Hay un total de ${fligthsWithLayover.length} vuelos con escala:\n ${fligthsWithLayover}`)
};

const lastFiveFligths = () => {
  let lastFligths = [];
  for (let i = (flights.length - 5); i < flights.length; i++) {
      lastFligths.push(flights[i].to)
  }
  alert(`Los destinos para los últimos 5 vuelos del día son:\n ${lastFligths.join(', ')}.`)
};

const checkPermissions = () => {
  let userRole = prompt(`¿Es usted istrador o usuario? (Presiona cancelar para salir) [admin/user]`).toLowerCase();

  if (userRole === 'admin') {
      adminMenu();
  } else if (userRole === 'user') {
      userMenu();
  } else {
      alert('No has introducido los valores correctamente.');
      checkPermissions();
  }
};

const adminMenu = () => {
  let whatToDo = prompt('¿Quieres crear o eliminar un vuelo? (Si no deseas realizar ninguna acción, pulsa cancelar.) [crear/borrar]').toLocaleLowerCase();
  if (whatToDo === 'crear') {
      createNewFlight()
  } else if (whatToDo === 'borrar') {
      deleteFlight()
  } else {
      alert('Los datos introducidos no son correctos')
  };
};

const createNewFlight = () => {
  let newFligth = {};
  if (flights.length >= 15) {
      alert('Has alcanzado el máximo de vuelos permitidos')
  } else {
      alert('Rellena los siguientes campos para crear un vuelo nuevo')
      let newId = flights.length;

      let newOrigin = prompt('Introduce la ciudad de origen.');

      let newDestination = prompt('Introuce la ciudad de destino.');
      
          let newCost = prompt('Añade el coste del vuelo.');
          if (isNaN(newCost)) {
          alert('Los datos introducidos son incorrectos. El formato correcto es usando números.')
          createNewFlight();
          } else {
          newCost = Number(newCost)
          };
      
          let newLayover = prompt('¿El vuelo hace escala? [si/no]').toLowerCase();
          if (newLayover === 'si') {
              newLayover = true;
          } else if (newLayover === 'no') {
              newLayover = false;
          } else {
              alert('Los datos introducidos son incorrectos')
              createNewFlight();
          }
      

      newFligth.id = newId;
      newFligth.from = newOrigin;
      newFligth.to = newDestination;
      newFligth.cost = newCost;
      newFligth.layover = newLayover;
      flights.push(newFligth);
      availableFlights(); 
      
  }
  goodbye();
};

const deleteFlight = () => {
  
      let flightToDelete = prompt('¿Cuál es el vuelo que desea borrar?');
      if (isNaN(flightToDelete)) {
      alert('Los datos introducidos son incorrectos. El formato correcto es usando números.')
      deleteFlight();
      } else {
          flightToDelete = Number(flightToDelete)
      };
  
  for (let i = 0; i < flights.length; i++) {
      if (flightToDelete === flights[i].id) {
          flights.splice(i, 1);
      }
  };
  availableFlights();
  goodbye();
  
};

const userMenu = () => {
  
      let checkPrices = prompt('¿Cuanto es lo maximo que desea pagar por billete?')
      if (isNaN(checkPrices)) {
          alert('Los datos introducidos son incorrectos.')
          userMenu();
      } else {
          checkPrices = Number(checkPrices);
      }
      let flightsAffordable = [];
      for (let i = 0; i < flights.length; i++) {
          if (flights[i].cost <= checkPrices) {
              flightsAffordable.push(`El vuelo ${flights[i].id} con origen ${flights[i].from}, destino ${flights[i].to} tiene un coste de ${flights[i].cost} €\n `)
          } else {
              
          }
      };
      
      alert(`Hay un total de ${flightsAffordable.length} vuelos por debajo de ese precio.\n ${flightsAffordable.join('')}`);
      goodbye();
};

const goodbye = () => {
  let confirmExit = confirm('¿Quieres realizar otra operación?')
  if (confirmExit) {
      checkPermissions();
  } else {
      alert('Gracias por confiar en nosotros.');
  }
  
};

const startProgramm = () => {
  getUserName();
  availableFlights();
  averageCost();
  hasLayover();
  checkLayover();
  lastFiveFligths();
  checkPermissions();
}
startProgramm(); 

