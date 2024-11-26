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
  ]

  const getUserName = () => {
    const userName = prompt('Welcome to ISDI CODERS Airlines. What is your name?')
    alert(`Hello ${userName}`)
  }
  
  
  const getUserRole = () => {
    const role = prompt('Are you a USER or an ADMIN?')
    if(!role){
        alert ('You have not entered the requested information')
        getUserRole()
    } else if (role.toUpperCase() !== 'USER' && role.toUpperCase() !== 'ADMIN'){
        alert ('Please enter USER or ADMIN')
        getUserRole()
    } else {
        return role.toUpperCase()
    }
}

const showFlights = () => {
    flights.forEach((flight) => {
        if(!flight.layover){
        console.log(`Flight from ${flight.from} to ${flight.to}, costs ${flight.cost}€ and is a non-stop flight.`)
        } else {
            console.log(`Flight from ${flight.from} to ${flight.to}, costs ${flight.cost}€ and is a layover flight.`)
        }
    })
}

const avarageCost = () => {
    let costSum = 0;
    flights.forEach((flight) => {
        costSum = costSum + flight.cost
    })

    return console.log('The avarage price of our flights is ' + (costSum/flights.length).toFixed(2) + '€')
}

const layoverFlights = () => {
    let sumLayoverFlights = 0
    flights.forEach((flight) => {
        if(flight.layover)
        sumLayoverFlights = sumLayoverFlights + 1
    })

    console.log(`${sumLayoverFlights} of our flights are layover flights.`)
}

const lastFlights = () => {
    console.log('Last flights of the day have the following destinations:')
    for (let i = flights.length - 5; i < flights.length; i++){
        console.log(flights[i].to)
    }
}

const getAdminAction  = () => {
    const adminAction = prompt('Do you want to ADD or DELETE any flights?')
    if(!adminAction){
        alert(' You have not entered the requested information.')
        getAdminAction()

    } else if (adminAction.toUpperCase() !== 'ADD' && adminAction.toUpperCase() !== 'DELETE'){
        alert('Please enter ADD or DELETE')
        getAdminAction()

    } else {
        return adminAction.toUpperCase()
    }
}

const adminActions = () => {
    const finalAdminAction = getAdminAction() 
    if(finalAdminAction === 'ADD'){
        addNewFlight()
    } else {
        deleteFlight()
    }
}

const getNewFlightStops = () => {
    newFlightStops = prompt('How many stops does the flight have? ');
    if(!newFlightStops){
        alert ('You have not entered the requested information')
        getNewFlightStops()
    } else if (isNaN(newFlightStops)){
        alert ('Please enter a valid number')
        getNewFlightStops()

    } else if (+newFlightStops > 0){
        return true
    } else {
        return false}
}

const getNewFlightOrigin  = () => {
    const newFlightOrigin = prompt("Please enter new flight's origin")
    if(!newFlightOrigin){
        alert('You have not entered the requested information')
        getNewFlightOrigin()
    } else {
        return newFlightOrigin
    }
}

const getNewFlightDestination  = () => {
    const NewFlightDestination = prompt("Please enter new flight's destination")
    if(!NewFlightDestination){
        alert('You have not entered the requested information')
        getNewFlightDestination()
    } else {
        return NewFlightDestination
    }
}

const getNewFlightCost = () => {
    newFlightCost = prompt("Please enter new flight's cost");
    if(!newFlightCost){
        alert ('You have not entered the requested information')
        getNewFlightCost()
    } else if (isNaN(newFlightCost)){
        alert ('Please enter a valid number')
        getNewFlightCost()
    } else {
        return newFlightCost}
}


const getNewFlightData = () => {
    const newFlight = {}
    newFlight.id = console.log(newFlight.length +1)
    newFlight.from = getNewFlightOrigin()
    newFlight.to = getNewFlightDestination()
    newFlight.cost = getNewFlightCost()
    newFlight.layover = getNewFlightStops()
    flights.push(newFlight)
    showFlights()
}

const addNewFlight = () => {
    if (flights.length < 15){
        getNewFlightData();
    } else {
        alert ('No more than 15 flights can be added. ')
    }
}



const askNewAction = () => {
    const newAction = confirm('Would you like to do any other operation?')
    if(newAction) {
        getUserRole()
    } else {
        alert('Thank you for using ISDI CODERS Airlines App. Goodbye!')
    }
}


const getFlightIdToDelete = () => {
    const flightIdToDelete = +prompt('Please enter the flight ID you want to delete.');
    if (isNaN(flightIdToDelete)){
        return getFlightIdToDelete();
    }
    return flightIdToDelete;
}

const deleteFlight = () => {
    finalFlightIdToDelete = getFlightIdToDelete();
    const updatedFlights = flights.filter(flight => flight.id !== finalFlightIdToDelete);
    return showFlights(updatedFlights)
}

const getHigherRate = () => {
    const highestRate = +prompt('Please enter the highest rate to filter your search');
    if (highestRate === 0 || isNaN(highestRate)){
        return getHigherRate();
    } else {
        return highestRate;
    }    
}

const filterFLightsByRate = (highestPrice) => {
    console.log(`The price of the following flights is below the highest fare entered: `)
    const filteredFlightsByRate = flights.filter(flight => flight.cost < highestPrice);
    filteredFlightsByRate.forEach((flight) => {
        console.log(
            `\nFlight from ${flight.from} to ${flight.to} and costs ${flight.cost}€`);
        
    })
}




playApp = () => {
    getUserName()
    showFlights()
    avarageCost()
    layoverFlights()
    lastFlights()
    const role = getUserRole()
    if (role === 'ADMIN'){
        adminActions()
        askNewAction()
    } else {
        const userHighestRate = getHigherRate();
        filterFLightsByRate(userHighestRate);   
        askNewAction()       
    }
    

}

playApp()