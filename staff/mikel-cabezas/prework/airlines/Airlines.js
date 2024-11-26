// Development time:
// Start: (28/01) at 19:00 to 20:00
// Round 2: (28/01) at 22:50 to 00:14
// Total Time: ~2:24h

let userName = prompt('Please, enter your name (not mandatory)')
if (!userName) {
  userName = 'guest user'
}

const startApplication = alert('Hi ' + userName + '! ISDI Coders Airlines welcomes you!')

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

console.log('Hi ' + userName + '! We will find the best flight for you')
const displayFlights = () => {
  console.log('Searching for flights')
  console.log('.     20%')
  console.log('..... 100%')
  for (i = 0; i < flights.length; i++) {
    if (flights[i].layover == true) {
      flights[i].layover = 'Yes'
    } else {
      flights[i].layover = 'No'
    }
    console.log('%cFlight number: ' + flights[i].id, 'color:#00b8ff; font-weight:bold')
    console.log('%cFrom: ' + flights[i].from + ' to: ' + flights[i].to, "color:#00ff00");
    // console.log('%cFlight ID: ' + flights[i].id, "color:#00ff00");
    console.log('%cPrice: ' + flights[i].cost + '$ - Has Layover: ' +  flights[i].layover, "color:#e2c23d");
    console.log('')
  }
}

if (userName) {
  displayFlights()
}

const mediumCost = () => {
  const total = []
  for (i = 0; i < flights.length; i++) {
    total.push(flights[i].cost)
  }
  const sumOperation = (...numbers) => {
    sumTotal = numbers.reduce((a, b) => (a + b));
    return Math.round( sumTotal * 1000 + Number.EPSILON ) / 1000 / flights.length
  }
  console.log('%cThe medium price of flights is: ' + sumOperation(...total) + '$', "color:#e2c23d");
}
const MediumCost = confirm(userName + ', you want to view the medium cost of all ' + flights.length + ' flights?')
if (MediumCost) {
  alert('Nice! Chech the console to see them')
  mediumCost()
}

const hasLayover = flights.filter(flight => {
  return flight.layover.includes('Yes')
});

const checkLayover = confirm(userName + ', you need to know wich flights has layover?')
if (checkLayover) {
  alert('Nice! Chech the console to see them')
  console.log('');
  console.log('%c' + (hasLayover.length + 1) + ' of ' + flights.length + ' flights has layover', "color:#f2d971");
}

console.log('')
const displayLastFlights = () => {
  const lastFligths = flights.slice(5)
  console.log('%cTe last 5 flights of the day are displayed below:', 'color:#b3ffb3')
  for (i = 0; i < lastFligths.length; i++) {
    console.log('%cFlight number: '+ lastFligths[i].id + ', from: ' + lastFligths[i].from + ', to: ' + lastFligths[i].to, 'color:#00ff00')
  }
}
const confirmLast5 = confirm(userName + ', you want to view the last 5 flights of day?')
if (confirmLast5) {
  alert('Nice! Chech the console to see them')
  displayLastFlights()
  console.log('');
}
console.log('%c' + userName + ', thanks for trust in us. We hope to see you soon.', 'color:#00b8ff')