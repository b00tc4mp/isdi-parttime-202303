let userName = prompt('Please, enter your name (not required)')
if (!userName) {
  userName = 'guest user'
}

const startApplication = alert(`Hi ${userName}! ISDI Coders Airlines welcomes you!`)
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
console.log(flights)

const checkNumberofFlights = () => { 
    if (flights.length > 10) {
        return true
    } else {
        return false
    }
}

console.log(`Hi ${userName}! We will find the best flight for you`)
const displayFlights = () => {
  console.log('%cSearching for flights', 'color:#e2d392; font-weight:bold')
  console.log('%c..     20%', 'color:#e2d392;')
  console.log('%c....     40%', 'color:#e2d392;')
  console.log('%c........     80%', 'color:#e2d392;')
  console.log('%c.......... 100%', 'color:#e2d392;')
  
  for (i = 0; i < flights.length; i++) {
    if (flights[i].layover == true) {
      flights[i].layover = 'Yes'
    } else {
      flights[i].layover = 'No'
    }
    console.log(`%cFlight number: ${flights[i].id}`, 'color:#00b8ff; font-weight:bold')
    console.log(`%cFrom: ${flights[i].from} to: ${flights[i].to}`, "color:#00ff00");
    console.log(`%cPrice: ${flights[i].cost} $ - Has Layover: ${flights[i].layover}`, "color:#e2c23d");
    console.log('')
  }
}
displayFlights()

const mediumCost = () => {
  const total = []
  for (i = 0; i < flights.length; i++) {
    total.push(flights[i].cost)
  }
  const sumOperation = (...numbers) => {
    sumTotal = numbers.reduce((a, b) => (a + b));
    return Math.round( sumTotal * 1000 + Number.EPSILON ) / 1000 / flights.length
  }
  console.log(`%cThe medium price of flights is: ${sumOperation(...total)}$`, 'color:#e2c23d');
}

const MediumCost = confirm(`${userName} you want to view the medium cost of all ${flights.length} flights?`)
if (MediumCost) {
  alert('Nice! Check the console to see them')
  mediumCost()
}

const hasLayover = flights.filter(flight => {
  return flight.layover.includes('Yes')
});

const checkLayover = confirm(`${userName} you need to know wich flights has layover?`)
if (checkLayover) {
  alert('Nice! Check the console to see them')
  console.log('');
  console.log(`%c ${(hasLayover.length + 1)} of ${flights.length} flights has layover`, 'color:#f2d971');
}

console.log('')
const displayLastFlights = () => {
  const lastFligths = flights.slice(5)
  console.log('%cTe last 5 flights of the day are displayed below:', 'color:#b3ffb3')
  for (i = 0; i < lastFligths.length; i++) {
    console.log(`%cFlight number: ${lastFligths[i].id} from: ${lastFligths[i].from} to: ${lastFligths[i].to}`, 'color:#00ff00')
  }
}

const confirmLast5 = confirm(`${userName}, you want to view the last 5 flights of day?`)
if (confirmLast5) {
  alert('Nice! Check the console to see them')
  displayLastFlights()
  console.log('');
}

const wantToSearchAnotherFlight = () => {
    const searchAnotherFlight = confirm('Do you want to search another flight?')
    if (searchAnotherFlight) {
        searchFlight()
    } else if (!searchAnotherFlight) {
        logOut()
    }
}

const logOut = () => {
    const confirmLogout = confirm('Do you want to Logout?')
    if (confirmLogout) {
        console.log(`Thanks ${userName}. Hope to see you soon.`)
        alert(`Thanks ${userName}. Hope to see you soon.`)
    } else if (!confirmLogout && adminLogin()) {
        createMoreFlights() 
    } else if(!confirmLogout && !adminLogin()) {
        wantToSearchAnotherFlight()
    } 
}

const createMoreFlights = () => {
    const confirmCreateFlight = confirm(`Nice to see you, ${userName}. Do you want to create a new flight?`)
    if (confirmCreateFlight) {
        createFlight()
    } else {
    }    logOut()
}

const adminLogin = () => {
    const createFlight = () => {
        const notRemoved = () => {
            alert('Sorry, there are no flights with this ID')
            const deleteFlightsAgain = confirm('Do you want try again to delete flights?')
            if (deleteFlightsAgain) {
                idSelector()
            }
        }
    
        idSelector = () => {    
            const searchById = prompt('Enter flight ID for delete') * 1
            const deleteFlight = (arr, id) => {    
                const objWithIdIndex = flights.findIndex((obj) => obj.id === id);
                if (objWithIdIndex > -1) {
                    console.log(`%c   | Flight number ${flights[objWithIdIndex].id} from ${flights[objWithIdIndex].from} to ${flights[objWithIdIndex].to} was deleted!`, 'color:#f55a4f')
                    console.log('')
                } 
                if (objWithIdIndex === -1 ) {
                    notRemoved()
                } else if (flights[objWithIdIndex].id === searchById) {
                    flights.splice(objWithIdIndex, 1);
                    const print = true
                    return flights
                } else {
                    notRemoved()
                }
                
                
            }
            deleteFlight(flights, searchById);

        }

        const getNewFlight = () => {
            const newFlight = {
                cost: prompt('Enter the cost of new flight') * 1,
                from: prompt('Flights from'),
                to: prompt('and flights to'),
                layover: confirm('Has layover?'),
                id: flights[flights.length - 1].id + 1,
            } 

            const wantToCreateAnotherFlight = () => {
                const createAnotherFlight = confirm(
                    'Do you want to create a new flight?')
                if (createAnotherFlight) {
                    createFlight()
                } else {
                    logOut()
                }
            }

            const pushNewFlight = () => {
                if (newFlight.layover === true) {
                    newFlight.layover = 'Yes'
                } else {
                    newFlight.layover = 'No'
                }
                flights.push(newFlight)
                console.log(`%c  | New flight created!`, 'color:#e12fe1');
                console.log(`%c  | Flight number: ${newFlight.id}`, 'color:#00b8ff; font-weight:bold') * 1
                console.log(`%c  | From: ${newFlight.from}to ${newFlight.to}`, 'color:#00ff00');
                console.log(`%c  | Price: ${newFlight.cost}$ - Has Layover: ${newFlight.layover}`, 'color:#e2c23d');
                console.log('')
                wantToCreateAnotherFlight()
            }
            if (newFlight.from === null || newFlight.to === null || newFlight.cost === null || newFlight.layover === null || newFlight.id === null ){
                console.log('%cAll fields are reaquired! Flight not created, please fill all fields', 'color:#f44336');
                alert('All fields are reaquired! Flight not created, please fill all fields');
            } else if (Number.isNaN(newFlight.cost) || newFlight.cost === 0){
                console.log('%cInvalid cost. Please, enter cost with numbers', 'color:#f44336');
                alert('Invalid cost. Please, enter cost with numbers');
                getNewFlight()
            } else if (flights.length >= 10) {
                const confirmDeleteFlights = confirm('Sorry, you cannot create more than 10 flights. Do you want to delete flights?')
                if (confirmDeleteFlights) {
                    idSelector()
                    if(checkNumberofFlights() === false) {
                        pushNewFlight()
                    }
                }
            } else {
                console.log(`${flights.length}`)
                pushNewFlight()
            }
        }
        getNewFlight()
    }

    const searchFlight = () => {
        const wantToSearchAnotherFlight = () => {
            const searchAnotherFlight = confirm('Do you want to search another flight?')
            if (searchAnotherFlight) {
                searchFlight()
            } else if (!searchAnotherFlight) {
                logOut()
            }
        }
        const searchByPrice = prompt('Enter the maximum price you are searching') * 1
         if (Number.isNaN(searchByPrice)){
            console.log('%cInvalid price. Please, enter cost with numbers', 'color:#f44336');
            alert('Invalid price. Please, enter cost with numbers');
            searchFlight()
        } else if (searchByPrice === 0) {
            console.log('%cInvalid price. Please, enter cost with numbers', 'color:#f44336');
            alert('Invalid price. Please, enter cost with numbers');
            searchFlight()
        } else if (searchByPrice) {
            console.log(`%cSearching flights with ${searchByPrice}$ max price`, 'color:#e2d392');
            const lessThan = flights.filter(flight => {
                return flight.cost <= searchByPrice
            });

            if (lessThan < searchByPrice) {
                console.log('%cNo flights found with this price! Please enter a upper price', 'color:#f55a4f');
                wantToSearchAnotherFlight()     
            } else {
                for (i = 0; i < lessThan.length; i++) {
                    console.log(`%cFlight number: ${lessThan[i].id}`, 'color:#00b8ff; font-weight:bold');
                    console.log(`%cFrom: ${lessThan[i].from} to: ${lessThan[i].to}`, 'color:#00ff00');
                    console.log(`%cPrice: ${lessThan[i].cost}$ - Has Layover: ${lessThan[i].layover}`, 'color:#e2c23d');
                    console.log('')   
                }
                wantToSearchAnotherFlight()     
            }
        } else {
            logOut()
        } 
    }

    const logIn = () => {
        let enterUsername = prompt(`${userName} enter your username`)
        if (!enterUsername) {
            logIn()
        } else {
            if (enterUsername) {
                if (enterUsername === 'admin') {
                    const loginSuccess = confirm(`Nice to see you ${userName}. Do you want to create a new flight?`);
                    if (loginSuccess) {
                        createFlight()
                    } else {
                        logOut()
                    }
                    return true
                } else if (enterUsername !== 'admin') {
                    const notAdmin = confirm('User not registered, do you want to register?')
                    if (notAdmin) {
                        alert('Thanks for register! Now you can search flights by price')
                        searchFlight()
                        return false
                    } else {
                        logOut()
                        console.log('statement')
                        return false
                    }    
                }
            } else {
                logOut()  
            }  
            return true
            
        }
        
    }
    logIn()
}
adminLogin()