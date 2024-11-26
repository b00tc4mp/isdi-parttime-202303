


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
    { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, layover: false }
];


let i= 0
let totalFlightsCost = [];
let total;
let rolUser;
let rolUserChosen = [];
let maximumPriceFlight;
let addNewFlight = {};
const maxFlightsShown = 15;

let goodbye;



//Función bienvenida y peticion del nombre al usuario
const getUserName = () =>{
    const userName = prompt("Please, enter your name");
    console.log(`Welcome to ISDI Airlines, ${userName}!`)
    return userName;
};

//Función que muestra todos los vuelos. Creamos un array con los costes de cada uno.

const flightsView = () =>{
    console.log("The flights avaiables for today are: ")
    for (let i = 0; i < flights.length; i++){
        totalFlightsCost.push(flights[i].cost);

      if(flights[i].layover=== false){          
            console.log(`Flight Number: ${flights[i].id},  from ${flights[i].from} to ${flights[i].to},  cost ${flights[i].cost} (without layover)`);
        }else{
            console.log(`Flight Number: ${flights[i].id},  from ${flights[i].from} to ${flights[i].to},  cost ${flights[i].cost} (with layover)`)
        }
    }
    
};

//Función que calcula el coste medio de los vuelos, aprovechando el array creado.

const aritmeticAverageCost = () =>{
  
    let total = totalFlightsCost[0];
    for(let i = 1; i < totalFlightsCost.length; i++){
        total += totalFlightsCost[i];   
    }
    return total/(totalFlightsCost.length)
};


// Función que muestra al usuario los vuelos con escala
const noLayoverFlightsView = (flights) =>{
    console.log("The flights with layover are: ")
    for (let i = 0; i < flights.length; i++){
        if(flights[i].layover=== true){
            console.log(`Flight Number: ${flights[i].id},  from ${flights[i].from} to ${flights[i].to},  cost ${flights[i].cost} (with layover)`);
        }
    }
};


//Función que muestra al usuario los ultimos 5 vuelos del día, sus destinos.

const lastFiveFlights = (flights) =>{
    for(let i = flights.length - 5; i <flights.length; i++){
        console.log(`The last five flights of today departs to:\n ${flights[i].to}.`)
    }
};

//AÑADIMOS AL EJERCICIO LOS REQUIERIMIENTOS DE AIRLINE PRO:

//Funcion para solicitar al usuario su rol: USER o ADMIN
const askRolUser =() =>{
    let rolUser = prompt(`Please, your rol would be USER or ADMIN ?`);
  
    if(rolUser.toUpperCase() === "USER"|| rolUser.toUpperCase() === "ADMIN"){
        rolUserChosen.push(rolUser.toLocaleUpperCase());
       
    }else{
        alert("You have entered a wrong answer. Please, enter USER or  ADMIN ")
        askRolUser();
    }
        
    return rolUser;
};

//rolUser === USER
//Función para mostrar al usuario los vuelos con coste igual o menor al indicado por el mismo.
const usermaximumPrice = () =>{
    let userMaximumPriceFlight = +prompt(`Please, introduce the maximum price flight (a number)`);  
    if(userMaximumPriceFlight === NaN || userMaximumPriceFlight === null){
        alert("This is not a number. Please, introduce the maximum price flight (a number)")
    }
        
    flights.sort((x, y)=> x.cost - y.cost);  
        
    for(i= 0; i < 14; i++){
        if(flights[i].cost <= userMaximumPriceFlight){
            console.log(`This flight cost the same or less than ${userMaximumPriceFlight}: Id: ${flights[i].id}, to :${flights[i].to} , from: ${flights[i].from}, cost: ${flights[i].cost}. `)
        }else{ 
            console.log("Sorry, there are no flights available for the same or lower price than the one you have indicated")
        }
            return userMaximumPriceFlight
    }
    return userMaximumPriceFlight;
};

//rolUser === ADMIN
//Crear vuelos nuevos.
//Definimos las variables que van a formar parte de la función, consultando al usuario cada valor.

const addflightTo=() =>{
    let addTo = prompt("Please, introduce de destination of the flight");
    if(!addTo){
        alert("You have not introduced any city name")
        addflightTo();
    }
        
    return addTo;
};

const addflightFrom = () =>{
    let addFrom = prompt("Please, introduce the coming city of the flight");
    if(!addFrom){
        alert("You have not introduced any city name")
        addflightFrom();
    }
    return addFrom;
};
const addflightCost = () =>{
    let addCost = prompt("Please, introduce the cost of the flight");
    if(!addCost){
        alert("You have not introduced any any number")
        addflightCost();
    }else if(isNaN(addCost)){
        alert("You have introduced a wrong answer")
        addflightCost();
    }
    return addCost;
};

const addflightLayover = () =>{
    let addLayover = prompt("Please, introduce if the flight have a layover (TRUE or FALSE)");
    if(!addLayover){
        alert("You have not introduced any value")
        addflightLayover();
    }
    if(addLayover.toUpperCase() === "TRUE"){
        return true;
    }else if(addLayover.toUpperCase() === "FALSE"){
        return false;
    }
    if(addLayover.toUpperCase !== "TRUE" && addLayover.toUpperCase() !== "FALSE"){
        alert("You have introduced a wrong answer")
        addflightLayover();
    }
    return addLayover;

};

const addFlightFunction = () =>{
    const newFlightToAdd = {}
    newFlightToAdd.id = flights[flights.length -1].id + 1;
    newFlightToAdd.to = addflightTo();
    newFlightToAdd.from = addflightFrom();
    newFlightToAdd.cost = addflightCost();
    newFlightToAdd.layover = addflightLayover();

    if(flights.length < maxFlightsShown){   
    flights.push(newFlightToAdd);
    }else{
        alert("You cannot add more flights, you are already showing 15 flights.")
    }
    for (i= 0; i < flights.length; i++){
        
        if(flights[i].layover=== false){          
            console.log(`The flights availables are: Flight Number: ${flights[i].id},  from ${flights[i].from} to ${flights[i].to},  cost ${flights[i].cost} (without layover)`);
        }else{
            console.log(`The flights availables are: Flight Number: ${flights[i].id},  from ${flights[i].from} to ${flights[i].to},  cost ${flights[i].cost} (with layover)`)
        }
    }
};


// Funcion para modificar los vuelos: crear nuevos o eliminar el que el usuario decida (por su Id)
const modificateFlights = (flight) =>{
    const modificateFlight = prompt("What do you want to do? CREATE or DELETE a flight?")
    
    if(modificateFlight.toUpperCase() !== "CREATE" && modificateFlight.toUpperCase() !== "DELETE"){
        alert("You have entered a wrong answer. Please, introduce CREATE or DELETE")
        modificateFlights();
    }

    if(modificateFlight.toUpperCase() === "CREATE"){ 
        addFlightFunction();
        return modificateFlight;
    }

    if(modificateFlight.toUpperCase() === "DELETE"){
        let deleteId = +prompt("Please, enter de Id number of the flight that you want to delete");
        if(deleteId > maxFlightsShown || deleteId < 0){
           alert("You have entered a wrong answer. Please, enter de Id number of the flight that you want to delete")
           modificateFlights();
        }else{
            console.log(deleteId)
            flights.sort((x, y)=> x.id - y.id);
            delete(flights[deleteId]);
            console.log(flights) // falta poder imprimir los vuelos por consola para el usuario, despues de haber eliminado uno
        }

        return deleteId;        
    }
    
    return modificateFlight;
};

// Función de despedida
const seeYouSoon = () =>{
    while(confirm("Do you want to check flights again?")){
        alert("Let's check flights again!")
        askRolUser();
    }
        alert("Goodbye, thanks for your visit! See you soon!")
};
    

/*let goodbye = prompt("Do you want to check flights again? Please, enter YES or NO")
    if(goodbye.toUpperCase() === "YES"){
       alert("Let's check flights again!")
        checkFlights();
    }else{
        alert("Goodbye, thanks for your visit! See you soon!")
    }*/

  
// Funcion maestra final, con la que ordenamos y dirigimos todos pasos que el usuario puede ir 
// dando a lo largo de su experiencia por nuestra web.

const checkFlights = () =>{

    getUserName();
    flightsView(flights);
    aritmeticAverageCost(totalFlightsCost);
    console.log(`The aritmetic average cost of all flights is ${aritmeticAverageCost(total)}`);
    noLayoverFlightsView(flights);
    lastFiveFlights(flights);
    askRolUser();
    if(rolUserChosen[0] === "USER"){
        usermaximumPrice(flights);
    }
    if(rolUserChosen[0] === "ADMIN"){
        modificateFlights(flights) 
    }
    seeYouSoon();
};

checkFlights(); 
