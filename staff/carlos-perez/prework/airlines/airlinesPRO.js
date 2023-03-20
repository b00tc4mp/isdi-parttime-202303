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

//Función para pedir el tipo de usuario

function leeUsuario(usuario) {
    const peticion = prompt(usuario + ', introduce tu tipo de usuario: Admin/User');
    if (!peticion) {
        return leeUsuario(usuario);
    }
    return peticion;
}

//Función para mostrar los datos de un vuelo

function verVuelo(vuelo) {
    let mensaje = '';
    mensaje += 'El vuelo con origen ' + vuelo.to + ' y destino ' + vuelo.from + ' tiene un coste de ' + vuelo.cost + '€ y ';
    if (vuelo.scale == true) {
        mensaje += 'realiza escala \n';
    }
    else {
        mensaje += 'no realiza escala \n';
    }

    return mensaje;
}

//Función para mostrar todos los vuelos, adecuando el mensaje en función de si tienen o no escala

function listaVuelos(vuelos) {
    for (let i in vuelos) {
        let mensaje = '';
        mensaje += 'El vuelo con origen ' + vuelos[i].to + ' y destino ' + vuelos[i].from + ' tiene un coste de ' + vuelos[i].cost + '€ y ';
        if (vuelos[i].scale == true) {
            mensaje += 'realiza escala \n';
        }
        else {
            mensaje += 'no realiza escala \n';
        }

        console.log(mensaje);
    }
}

//Función para calcular el precio medio de los vuelos

function precioMedio(vuelos) {
    let acumulador = 0;
    let cantidadVuelos = vuelos.length;
    for (let i in vuelos) {
        acumulador += vuelos[i].cost;
    }
    let media = acumulador / cantidadVuelos;
    return media;
    //He decidido devolver el valor en vez de imprimirlo aquí para que sea una función más reutilizable. 
    //Quizás queramos ese valor algún día.
}

//Función para ver el número de vuelos que tienen escalas
function numeroVuelosConEscala(vuelos) {
    let numeroVuelosEscalas = 0;
    for (let i in vuelos) {
        if (vuelos[i].scale == true) {
            numeroVuelosEscalas++;
        }
    }
    return numeroVuelosEscalas;
}

//Función para mostrar el destino de los últimos 5 vuelos del día. Devuelve un vector con la información

function los5Ultimos(vuelos) {
    let los5 = [];
    for (let i = (vuelos.length - 5); i < vuelos.length; i++) {
        los5.push(vuelos[i].to);
    }
    return los5;
}

//Función que crea un String con todos los vuelos y el número de vuelos, para que el admin sepa cuántos hay y cuales son.

function vuelosAdmin(vuelos) {
    let mensaje = '';
    mensaje += 'Hay ' + vuelos.length + ' vuelos en el sistema. \n';
    mensaje += 'Id     Destino          Origen\n';
    for (let i in vuelos) {
        mensaje += vuelos[i].id + '      ' + vuelos[i].to + '     ' + vuelos[i].from + '\n';
    }
    return mensaje;
}

//Función para mostrar sólo los vuelos que no sobrepasen un precio máximo

function vuelosPorPrecio(vuelos,precio) {
    let mensaje='';
for(let i in vuelos){
    if(vuelos[i].cost<=precio){
        mensaje+=verVuelo(vuelos[i]);
    }
}

if(mensaje==''){
    mensaje='No hay vuelos de ese o menor precio';
}

return mensaje;
}

//Función para eliminar un vuelo por su id

function eliminarPorId(vuelos, id) {
    for (let i in vuelos) {
        if (vuelos[i].id == id) {
            vuelos.splice(i, 1);
        }
    }
}

//Función para añadir un vuelo

function addVuelo(vuelos, vuelo) {
    let infoVuelo={
        id: vuelo[0], to: vuelo[1], from: vuelo[2], cost: vuelo[3], scale: vuelo[4]
    }
    vuelos.push(infoVuelo);
}

//Función para preguntar al admin qué operación desea hacer

function operacionesAdmin(vuelos) {
    const peticion = prompt(vuelosAdmin(vuelos) + '\n Introduzca la información de un vuelo, separada por comillas, para añadirlo, o introduzca el ID del vuelo que desee eliminar del sistema, o un -1 para salir\n');
    if (!peticion) {
        return operacionesAdmin(vuelos);
    }
    return peticion;
}

//Función para preguntar al usuario el precio del vuelo que quiere buscar

function operacionUsuario() {
    const peticion = prompt('Introduce el precio máximo del vuelo que quieres ver:\n');
    if (!peticion) {
        return operacionUsuario();
    }
    return peticion;
}

//Función para que el administrador añada vuelos, con un límite de 15 vuelos totales, o elimine vuelos por su id

function gestionVuelos(vuelos) {
    let menu = 0;
    do {
        let operacion = operacionesAdmin(vuelos);
        if (operacion !== null) {
            let op = operacion.split(",");
            if (op.length == 1) {
                if (op[0] == -1) {
                    alert('Cerrando el sistema');
                    menu = -1;
                }
                else {
                    eliminarPorId(vuelos, op);
                    alert('El vuelo con ID ' + op + ' ha sido eliminado del sistema');
                }
            }
            else if (op.length == 5) {
                if (vuelos.length < 15) {
                    addVuelo(vuelos, op);
                }
                else {
                    alert('No es posible realizar la operación, ya hay 15 vuelos en el sistema. Capacidad máxima alcanzada');
                }
            }
            else {
                alert('ERROR. Introduzca datos correctos, por favor');
            }
        }
    } while (menu != -1);
}

//Función para que el usuario busque vuelos en función de su precio

function buscaPorPrecio(vuelos) {
    let precio = Number(operacionUsuario());
    let resultado=vuelosPorPrecio(vuelos,precio);
    alert(resultado);
}

//Inicio del programa

//Se especifica que primero se pide el nombre y luego se le da la bienvenida al usuario.
let nombreUsuario = leeEntrada(); //Captura el nombre del usuario
alert("Bienvenido a la terminal de Aerolíneas ISDI Coders, " + nombreUsuario); //Mensaje de bienvenida

//Mostrar todos los vuelos con su información por consola, de manera amigable
console.log('Vuelos disponibles');
listaVuelos(flights);

//Mostrar el precio medio de los vuelos

console.log('El precio medio de los vuelos es ' + precioMedio(flights) + '€');


//Mostrar el número de vuelos que tienen escalas

console.log('Hay ' + numeroVuelosConEscala(flights) + ' vuelos con escala');

//Mostrar los últimos 5 vuelos del día

console.log('Los últimos vuelos del día son: ' + los5Ultimos(flights).toString());

//PRO
let tipoUsuario = leeUsuario(nombreUsuario).toUpperCase();
if ((tipoUsuario == 'A') || (tipoUsuario == 'ADMIN')) {
    gestionVuelos(flights);
}
else if ((tipoUsuario == 'U') || (tipoUsuario == 'USER')) {
buscaPorPrecio(flights);
}
else{
    alert('Ese tipo de usuario no existe');
}