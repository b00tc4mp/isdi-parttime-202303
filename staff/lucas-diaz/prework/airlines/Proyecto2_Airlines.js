'use strict'

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
];
class CreateFlightMold {
    constructor(id,to,from,cost,layover){
        this.id = id;
        this.to = to;
        this.from = from;
        this.cost = cost;
        this.layover = layover;
    }
    setTo(){
        this.to = prompt("Please type the destination of the flight");
    }
    setFrom(){
        this.from = prompt("Please type the origin of the flight");
    }
    setCost(){
        this.cost = prompt("Please type the cost of the whole flight");
    }
    setLayover(){
        this.layover = prompt("Does this flight has layover (true/false)");
    }
}
let userName;
let admin = false;

const welcomeUser = () => {
    userName = prompt("Welcome to the ADI (Airline Digital Interface). Please type your username: ");
    if (!userName){
        alert("Sorry, the imput wasn't valid, please type your username again: ")
        return welcomeUser();
    }
    console.log(`Welcome ${userName} to the ADI`);
    console.log(`Here is the 10 flights for today ${userName}`);
}
const seeFlights = (flights) => {
    let noLayover = "it has no layover.";
    let withLayover = "it has layover.";
    flights.forEach( (flight) => {
        console.log(`- Flight from ${flight.from} and destiny ${flight.to} cost ${flight.cost}€ and ${flight.layover ? withLayover : noLayover}`);
    })
}
const averageCost = (flights) => {
    const fligthPrices = [];
    flights.forEach((fligth) => {
        fligthPrices.push(fligth.cost);
    })
    return (fligthPrices.reduce((priceAccumulator, currentPrice) => {
        return priceAccumulator + currentPrice;
    }) / fligthPrices.length);
}
const showLayover = (flights) => {
    let layoverFlights = [];
    flights.forEach((flight) => {
        if (flight.layover) {
            layoverFlights.push(flight);
        }
    })
    return layoverFlights;
}
const showLastsDestinations = (flights) => {
    let latestFlights = flights.slice(flights.length - 5);
    let latestFlightsDestinations = [];
    latestFlights.forEach((flight) => {
        latestFlightsDestinations.push(flight.to);
    })
    console.log("The last 5 flights of today and their destinations:");
    
    return latestFlightsDestinations.forEach((destination) => {
        return console.log(`Flight with destination: ${destination}`);
    });
}

//!PRO 

const checkRole = () => {
    const userChecking = prompt(`${userName} ¿Are you ADMIN or USER?`);
    let userCheckingLowerCase = userChecking
                                .toLowerCase()
                                .trim();
        if (!userCheckingLowerCase){
            alert("You had not typed anything, please type 'ADMIN' or 'USER'");
            checkRole();
        }
        if (userCheckingLowerCase !== "admin" && userCheckingLowerCase !== "user"){
            alert("You have tiped an unexpected word, please type 'ADMIN' or 'USER'");
            checkRole();
        } 
        if (userCheckingLowerCase === "admin"){
            admin = true;
        }
        if (userCheckingLowerCase === "user"){
            admin = false;
        }
}
const doAdminRole = () => {
    let message = prompt(userName + " ¿Do you want to CREATE flights or DELETE flights?").toLowerCase();
    while(!message){
        alert("You didn't typed anything, please type CREATE or DELETE");
    }
    while(message !== "create" && message !== "delete"){
        alert("You typed incorrectly one of this 2 values, please type CREATE or DELETE");
        message = prompt(userName + " ¿Do you want to CREATE flights or DELETE flights?").toLowerCase();
    }
    if (message === "create"){
        let exitMessage;
        do{
            createFlight(flights);
            exitMessage = confirm("Do you want to create another flight?");
        }
    while(exitMessage === true);
    }
    if (message === "delete"){
        let exitMessage;
        do{
            deleteFlight(flights);
            exitMessage = confirm("Do you want to delete another flight?");
        }
    while(exitMessage === true);
    }
}
const createFlight = (flights) => {
    if (flights.length < 15){
        alert("Lets create flights, first type the information needed to one flight")
        let newFlight = new CreateFlightMold((flights.length),
        
        prompt("Please type the destination of the flight"),
        prompt("Please type the origin of the flight"),
        prompt("Please type the cost of the whole flight"),
        prompt("Does this flight has layover (true/false)").toLowerCase()
        )


        flights.push(newFlight);
        while(!flights[flights.length - 1].to){
        alert("You haven't typed the destination (to) of the flight. Please Type it: ")
        newFlight.setTo();
        }
        while(!flights[flights.length - 1].from){
        alert("You haven't typed the origin (from) of the flight. Please Type it: ")
        newFlight.setFrom();
        }
        while(!flights[flights.length - 1].cost){
        alert("You haven't typed the cost of the flight. Please Type it: ")
        newFlight.setCost();
        } 
        while(!flights[flights.length - 1].layover){
        alert("You haven't typed anything. please type FALSE or TRUE: ")
        newFlight.setLayover();
        }
        while(flights[flights.length - 1].layover !== "true" && flights[flights.length - 1].layover !== "false"){
        alert("You haven't typed correclty FALSE or TRUE. Please Type it: ")
        newFlight.setLayover();
        }
        if(flights[flights.length - 1].layover === "true"){
        flights[flights.length - 1].layover = true;
        }
        if(flights[flights.length - 1].layover === "false"){
        flights[flights.length - 1].layover = false;
        }
    } else{
        alert("There is 15 flights for today, you can't add more until tomorrow. Please try tomorrow");
    }
}
const deleteFlight = (flights) => {
    let selectedId = +prompt("Please type the flight's ID numbrer to delete that flight")
    while(Number.isNaN(selectedId)){
        alert("You havent typed a number, please type a valid ID number")
        selectedId = +prompt("Please type the flight's ID numbrer to delete that flight")
    }
    while(selectedId < -1 || selectedId > flights.length){
        alert("You tiped a number higher or lower of the flights ID's numbers.")
        selectedId = +prompt("Please type the flight's ID numbrer to delete that flight")
    }
    while(!Number.isInteger(selectedId)){
        alert("You haven't typed an integer, please type an integer number")
        selectedId = +prompt("Please type the flight's ID numbrer to delete that flight")
    }
    let removed = flights.splice(selectedId,1);
    
    for (let i = 0; i < flights.length; i++){
        flights[i].id = i;
    }
    console.log(`Once deleted selected flight, here it is the updated list of the flights of today: `);
    seeFlights(flights);
}
const doUserRole = (flights) => {
    let filteredFlights;
    alert(`Welcome user ${userName}, lets find flights considering your price range...`); 
    let userPrice = +prompt("Please type the maximun price where you fell comfortable on paying a flight");
    while(Number.isNaN(userPrice)){
        alert("You havent typed a number, please type a valid number")
        userPrice = +prompt("Please type the maximun price where you fell comfortable on paying a flight");
    }
    while(!userPrice){
        alert("You havent typed anything, please type a valid number")
        userPrice = +prompt("Please type the maximun price where you fell comfortable on paying a flight");
    }
    while(userPrice < 0){
        alert("You typed an amount inferior than 0")
        userPrice = +prompt("Please type the maximun price where you fell comfortable on paying a flight");
    }
    filteredFlights = flights.filter((flight)=>{
        return flight.cost <= userPrice
    })
    if (filteredFlights.length === 0){
        alert(`Sorry, there is no flights under the price of ${userPrice}€`);
    } else {
        alert(`Here it is a list under the price of ${userPrice}€`);
        seeFlights(filteredFlights);
    }
}

const useAirlineInterfaz = () => {
    let repeatRoleActions;
    welcomeUser();
    seeFlights(flights);
    console.log(`The average cost of the flights of today is : ${averageCost(flights)}€`);
    console.log(`And here is the fligths that has layover: `);
    seeFlights(showLayover(flights));
    showLastsDestinations(flights); 
    checkRole();
    admin ?  doAdminRole() : doUserRole(flights);
    repeatRoleActions = confirm(`${userName} do you want to repeat any action?`)
    while (repeatRoleActions){
        checkRole();
        admin ?  doAdminRole() : doUserRole(flights);
        repeatRoleActions = confirm(`${userName} do you want to repeat any action?`)
    }
    alert(`${userName} thank you for using the ADI (Airline Digital Interface), see you soon.`);
}
useAirlineInterfaz();