const flights = [
    { id: 0, to: "New York", from: "Barcelona", cost: 700, layover: false },
    { id: 1, to: "Los Angeles", from: "Madrid", cost: 1100, layover: true },
    { id: 2, to: "Paris", from: "Barcelona", cost: 210, layover: false },
    { id: 3, to: "Roma", from: "Barcelona", cost: 150, layover: false },
    { id: 4, to: "London", from: "Madrid", cost: 200, layover: false },
    { id: 5, to: "Madrid", from: "Barcelona", cost: 90, layover: false },
    { id: 6, to: "Tokyo", from: "Madrid", cost: 1500, layover: true },
    { id: 7, to: "Shangai", from: "Barcelona", cost: 800, layover: true },
    { id: 8, to: "Sydney", from: "Barcelona", cost: 150, layover: true },
    { id: 9, to: "Tel-Aviv", from: "Madrid", cost: 150, layover: false },
  ]
  
  const showFlights = (array) => {
      for (arr of array){
          console.log('The flight number ' + arr.id + ' departs from ' + arr.from + ', and arrives to ' + arr.to + ' has a price of ' + arr.cost + '€ and ' + (arr.layover ? 'has layover' : 'has no layover.'))
      }
  }
  
  
  const welcomeUser = () => {
      let askUserName = prompt('Username:')
      let askFlights = prompt("Hi " + askUserName + "!\n Welcome to Tinair! Write 'f' to see todays flights info.")
  
      return askFlights
  }
  
  
  const flightsAverage = (array) =>{
      let accum = array[0].cost
      for(let i = 1; i < array.length; i++){
          accum += array[i].cost  
      } 
      let average = accum/array.length
      
      return console.log('The price average of the flights is ' + average)
  }
  
  
  const layoverTrue = () =>{
      let layoverFlights = []
      for (flight of flights){
          if (flight.layover)
              layoverFlights.push(flight)
      }
      return console.log('There are ' + layoverFlights.length + ' flights with layover.')
  }
  
  
  const lastFlightsOfTheDay = (array) =>{
      let lastFlights = []
      for (var i = array.length - 1; i >= (array.length -5); i--){
          lastFlights.push(array[i])  
      } 
      
      lastFlights.reverse()
      console.log('Los ultimos 5 vuelos del dia tienen estos destinos: ' + lastFlights[0].to + ', ' + lastFlights[1].to + ', ' + lastFlights[2].to + ', ' + lastFlights[3].to + ' and ' + lastFlights[4].to + '.')
  }
  
  
  const createFlight = () => {
      let newFlight = {}
      let askFrom = prompt('Which is the origin of the flight?')
      newFlight.from = askFrom
      
      let askTo = prompt('Which is the destination of the flight?')
      newFlight.to = askTo    
      
      let askCost = prompt('Which is the price of the flight?')
      newFlight.cost = askCost
      
      let asklayover = prompt('Does your flight have layover?\n y - yes\n n - no')
      
      if (asklayover === 'y'){
          newFlight.layover = true
      } else newFlight.layover = false
  
      let lastId = flights[flights.length - 1].id
       newFlight.id = lastId + 1 
  
      flights.push(newFlight)
      
      console.log('The flight created departs from ' + newFlight.from + ', and arrives to ' + newFlight.to + ' has a price of ' + newFlight.cost + '€ and ' + (newFlight.layover ? 'has layover' : 'has no layover.') + '\n The new list of flights is:\n')
      showFlights(flights)
  }
  
  
  
  const deleteFlight = (flights) => {
      let askDelete = prompt('Which number of flight do you want to delete?')
      let flightIndex = flights.findIndex((flight) => flight.id === parseInt(askDelete))
      
      flights.splice(flightIndex, 1)
  
      showFlights(flights)
  }
  
  
  const searchMaximum = (number) =>{
      const filteredFlights = flights.filter(flight => flight.cost < number)
      
      console.log('Flights with a lower price than ' + number + '€ are ' + filteredFlights.length + '. Here they are:\n')
      showFlights(filteredFlights)
  }
  
  
  const operateAsAdmin = () => {
      let askCreateOrDelete = prompt("What do you want to do? \n c - Create new flight\n d - Delete flight")
  
      if (askCreateOrDelete === 'c'){
          createFlight()
  
          operateAsAdmin()
      } else if (askCreateOrDelete === 'd') {
          deleteFlight(flights) 
  
          operateAsAdmin()
      }
  }
  
  
  
  function run(){
      
      if (welcomeUser() === 'f'){
       showFlights(flights)   
      }
  
      
      let askAverage = prompt("Do you want to check the flights' average price?\n y -yes\n n - no")
      if (askAverage === 'y'){
         flightsAverage(flights) 
      }
  
          
      let askLayover = prompt("Do you want to know how many flights have layover?\n y -yes\n n - no")
      if (askLayover === 'y'){
          layoverTrue(flights)        
      }
  
  
      let askLastOfTheDay = prompt("Do you want to know the destination of the last 5 flights of the day?\n TIP: Ordered descendant.\n y -yes\n n - no")
      if (askLastOfTheDay === 'y'){
          lastFlightsOfTheDay(flights)
      }
  
  
      let askUserType = prompt("For advanced functionality, you need to specify your role.\n a - Admin\n u - user")
      if (askUserType === 'a'){
          operateAsAdmin()    
      } else {
          let askMaxNumber = prompt('As a user you can search for flights with a maximum price.\n Type a maximum for the price of the flights.')
          searchMaximum(parseFloat(askMaxNumber))
      } 
  }
  
  run()