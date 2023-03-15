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

  //Función para capturar el nombre del usuario
  function leeEntrada() {
    const peticion = prompt('Introduzca su nombre: ');
    if (!peticion) {
        return leeEntrada();
    }
    return peticion;
}

//Función para mostrar todos los vuelos, adecuando el mensaje en función de si tienen o no escala

function listaVuelos(vuelos){
    for(let i in vuelos){
        let mensaje='';
        mensaje+='El vuelo con origen '+vuelos[i].to+' y destino '+vuelos[i].from+' tiene un coste de '+vuelos[i].cost+'€ y ';
        if(vuelos[i].scale==true){
            mensaje+='realiza escala \n';
        }
        else{
            mensaje+='no realiza escala \n';  
        }

        console.log(mensaje);
    }
}

//Función para calcular el precio medio de los vuelos

function precioMedio(vuelos){
    let acumulador=0;
    let cantidadVuelos=vuelos.length;
    for(let i in vuelos){
        acumulador+=vuelos[i].cost;
    }
    let media = acumulador/cantidadVuelos;
    return media; 
    //He decidido devolver el valor en vez de imprimirlo aquí para que sea una función más reutilizable. 
    //Quizás queramos ese valor algún día.
}

//Función para ver el número de vuelos que tienen escalas
function numeroVuelosConEscala(vuelos){
    let numeroVuelosEscalas=0;
    for(let i in vuelos){
        if(vuelos[i].scale==true){
            numeroVuelosEscalas++;
        }
    }
    return numeroVuelosEscalas;
}

//Función para mostrar el destino de los últimos 5 vuelos del día. Devuelve un vector con la información

function los5Ultimos(vuelos){
    let los5=[];
    for(let i=(vuelos.length-5); i<vuelos.length;i++){
        los5.push(vuelos[i].to);
    }
    return los5;
}


//Inicio del programa

//Se especifica que primero se pide el nombre y luego se le da la bienvenida al usuario.
let nombreUsuario=leeEntrada(); //Captura el nombre del usuario
alert("Bienvenido a la terminal de Aerolíneas ISDI Coders, "+nombreUsuario); //Mensaje de bienvenida

//Mostrar todos los vuelos con su información por consola, de manera amigable
console.log('Vuelos disponibles');
listaVuelos(flights);

//Mostrar el precio medio de los vuelos

console.log('El precio medio de los vuelos es '+precioMedio(flights)+'€');


//Mostrar el número de vuelos que tienen escalas

console.log('Hay '+numeroVuelosConEscala(flights)+' vuelos con escala');

//Mostrar los últimos 5 vuelos del día

console.log('Los últimos vuelos del día son: '+los5Ultimos(flights).toString());