//Bingo

//Almacen de los usuarios y sus puntos
// {usuario: nombreUsuario, puntos: numeroPuntos, partidaTerminada: booleano}
let usuariosYPuntos = [];

//Cartón
//{numero: numero, haSalido: estado}
let carton = [];

//Bombo
//Acumulará los números que ya han salido en un array

let bombo = [];

//Números mínimo y máximo del bombo. De 0 a 200, con un mínimo de 15 números entre el mínimo y el máximo

let minimo = 1;
let maximo = 99;

//Función para pedir el nombre al usuario

function pideNombre() {
    const peticion = prompt('Introduzca su nombre: ');
    if (!peticion) {
        return pideNombre();
    }
    return peticion;
}

//Función para verificar si un número está en el cartón

function numeroEnCarton(carton, numero) {
    let esta = false;
    for (i in carton) {
        if (carton[i].numero == numero) {
            esta = true;
        }
    }
    return esta;
}

//Función para generar un cartón

function generaCarton(carton, minimo, maximo) {
    if (carton.length === 0) {
        let numeroCarton = { numero: Number((Math.floor(Math.random() * maximo) + minimo)), haSalido: false };
        carton.push(numeroCarton);

    }


    for (let i = 1; i < 15; i++) {
        let salida = false;
        let num;
        do {
            num = Number((Math.floor(Math.random() * maximo) + minimo));
            salida = numeroEnCarton(carton, num);
        }
        while (salida == true);
        let numeroCarton = { numero: num, haSalido: false };
        carton.push(numeroCarton);
    }
    //Ordena el cartón
    carton.sort((a, b) => {
        return a.numero - b.numero;
    })
}

//Función para mostrar un cartón, separando por líneas de 5 números

function muestraCarton(carton) {
    let cartonJugador = '';
    for (let i = 0; i < 3; i++) {
        let linea = '';
        for (let j = 0; j < 5; j++) {
            if (carton[i * 5 + j].haSalido === true) {
                linea += 'x ';
            }
            else {
                linea += carton[i * 5 + j].numero + ' ';
            }
        }
        linea += '\n';
        cartonJugador += linea;
    }
    alert(cartonJugador);
    console.log(cartonJugador);
}

function muestraCartonString(carton) {
    let cartonJugador = '';
    for (let i = 0; i < 3; i++) {
        let linea = '';
        for (let j = 0; j < 5; j++) {
            if (carton[i * 5 + j].haSalido === true) {
                linea += 'x ';
            }
            else {
                linea += carton[i * 5 + j].numero + ' ';
            }
        }
        linea += '\n';
        cartonJugador += linea;
    }
    return cartonJugador;
}

//Función para que el usuario elija su cartón

function eligeCarton() {
    let cartonProvisional = [];
    let respuesta = '';
    let opcion = false;
    do {
        cartonProvisional = [];
        generaCarton(cartonProvisional, minimo, maximo);
        respuesta = prompt('El cartón generado es \n' + muestraCartonString(cartonProvisional) + '\n ¿Lo quieres?: Yes/no').toUpperCase();

        if (respuesta == 'YES' || respuesta == 'Y') {
            opcion = true;
        }
    } while (opcion !== true);
    alert('Finalmente, el carton generado es \n' + muestraCartonString(cartonProvisional));
    return cartonProvisional;
}

//Función para verificar que un número ha salido ya

function haSalidoNumero(bombo, numero) {
    if (bombo.includes(numero)) {
        return true;
    }
    else {
        return false;
    }
}

//Función para llenar un bombo

function llenarBombo(bombo, minimo, maximo) {
    for (let i = minimo; i < (maximo + 1); i++) {
        bombo.push(i);
    }
}

//Función para generar aleatoriedad en el bombo

function randomizaBombo(bombo) {
    for (let i = bombo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [bombo[i], bombo[j]] = [bombo[j], bombo[i]];
    }
}

//Función para sacar un número del bombo

function sacaNumero(bombo) {
    return bombo.pop();
}

//Función para actualizar el estado de un número

function estadoNumero(carton, numero) {
    if (numeroEnCarton(carton, numero) == true) {
        for (i in carton) {
            if (carton[i].numero == numero) {
                carton[i].haSalido = true;
            }
        }
        alert('El número ' + numero + ' ha salido y se encuentra en el cartón');
    }
    else {
        alert('El número ' + numero + ' ha salido, pero no se encuentra en el cartón');
    }
}

function estadoNumeroSinAlerta(carton, numero) {
    if (numeroEnCarton(carton, numero) == true) {
        for (i in carton) {
            if (carton[i].numero == numero) {
                carton[i].haSalido = true;
            }
        }
    }
}

//Función para determinar si ha salido línea

function esLinea(carton, numero) {
    let posicion;
    let contador = 0;
    let numLinea = 0;
    for (i in carton) {
        if (carton[i].numero == numero) {
            posicion = i;
        }
    }
    if (posicion < 5) {
        for (let i = 0; i < 5; i++) {
            if (carton[i].haSalido == true) {
                contador++;
            }
        }
        numLinea = 1;
    }
    else if (posicion < 10 && posicion >= 5) {
        for (let i = 5; i < 10; i++) {
            if (carton[i].haSalido == true) {
                contador++;
            }
        }
        numLinea = 2;
    }
    else if (posicion < 15 && posicion >= 10) {
        for (let i = 10; i < 15; i++) {
            if (carton[i].haSalido == true) {
                contador++;
            }
        }
        numLinea = 3;
    }

    if (contador == 5) {
        alert('Ha habido línea. La línea completa es la número ' + numLinea);
    }
    else {
        console.log('No ha habido línea');
    }
}

//Función para determinar si ha salido Bingo. Devuelve un true si ha sido así o false si no.

function esBingo(carton) {
    let contador = 0;

    for (let i in carton) {
        if (carton[i].haSalido === true) {
            contador++;
        }
    }
    if (contador === 15) {
        return true;
    }
    else {
        return false;
    }
}

//Función para calcular el número de puntos
function calculaPuntos(turnos) {
    return 200 - Number(turnos);
}


//Función para añadir el usuario y sus puntos después de la partida

function usuarioAlRanking(usuariosYPuntos, nombreUsuario, turnos, estado) {
    usuariosYPuntos.push({ usuario: nombreUsuario, puntos: calculaPuntos(turnos), partidaTerminada: estado });
}


//Función para mostrar el ranking de usuarios

function muestraRanking(usuariosYPuntos) {
    if (usuariosYPuntos.length !== 0) {
        usuariosYPuntos.sort((a, b) => { return a.puntos - b.puntos }); //Ordena el Ranking
        let mensaje = 'Ranking de usuarios: \n';
        for (let i in usuariosYPuntos) {
            if (usuariosYPuntos[i].partidaTerminada == true) {
                mensaje += usuariosYPuntos[i].usuario + ' ' + usuariosYPuntos[i].puntos + '\n';
            }
        }
        alert(mensaje);
    }
}


//Inicio del programa 
let salida;
let salidaGeneral;
let estado;

do {
    carton = [];
    bombo = [];
    salida = true;
    salidaGeneral = true;
    estado = false;

    llenarBombo(bombo, minimo, maximo);
    randomizaBombo(bombo);

    let nombreUsuario = pideNombre();

    alert('Bienvenido al Bingo, ' + nombreUsuario + '\n\n Cuantos más turnos necesites, menos puntos tendrás.\n El usuario con más puntos gana');


    let turno = 0;


    carton = Object.values(eligeCarton());
    console.log(carton);
    do {
        turno++;
        muestraCarton(carton);
        let numero = Number(sacaNumero(bombo));
        estadoNumero(carton, numero);
        esLinea(carton, numero);
        muestraCarton(carton);
        /* alert('Turno: ' + turno + ' , \nBombo: \n' + bombo.sort((a, b) => {
             return a.numero - b.numero;
         }));*/
        if (esBingo(carton) == false) {
            salida = confirm('¿Deseas seguir con la partida?');
        }
        else {
            alert('BINGO. Has ganado');
            salida = false;
            estado = true;
        }

    } while (salida !== false);

    usuarioAlRanking(usuariosYPuntos, nombreUsuario, turno, estado);
    muestraRanking(usuariosYPuntos);
    salidaGeneral = confirm('¿Deseas jugar a otra partida?');

} while (salidaGeneral !== false);