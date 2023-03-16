let numeroLLenarTarjeta;
let numeroComparar;
//var arrTarjetaBingo = [];

//Generar tarjeta con 15 numeros sin repetirse
function llenartarjeta() {
  arrTarjetaBingo = [];
  for (i = 0; arrTarjetaBingo.length < 15; i++) {
    numeroLLenarTarjeta = parseInt((Math.random() * 100).toFixed(0));
    if (
      !arrTarjetaBingo.includes(numeroLLenarTarjeta) &&
      numeroLLenarTarjeta !== 0
    ) {
      arrTarjetaBingo.push(numeroLLenarTarjeta);
    }
  }
  console.log("arrtarjetataaa", arrTarjetaBingo);
}

//llenartarjeta();
//console.log("tarjeta de 15 numeros sin repetir", arrTarjetaBingo);

// generar lista de 100 numeros alatorios sin repeticion:

//numeroComparar = parseInt((Math.random() * 100).toFixed(0));

function llenarBingoNumeros() {
  arrNumerosBingo = [];
  for (i = 0; arrNumerosBingo.length < 100; i++) {
    numeroLLenarBingo = parseInt((Math.random() * 100).toFixed(0));
    if (!arrNumerosBingo.includes(numeroLLenarBingo) && numeroLLenarBingo !== 0)
      arrNumerosBingo.push(numeroLLenarBingo);
  }
  console.log("tabla Bingo", arrNumerosBingo);
  return arrNumerosBingo;
}

let arrcolumnas;
//let precio = [];
function llenartabla() {
  let count = 0;
  let tablaRef = document.getElementById("tabla");
  let arrfilas = tablaRef.getElementsByTagName("tr");
  console.log("las filas", arrfilas.length);
  for (i = 0; i < arrfilas.length; i++) {
    arrcolumnas = arrfilas[i].getElementsByTagName("td");
    for (j = 0; j < arrcolumnas.length; j++) {
      arrcolumnas[j].innerHTML = arrTarjetaBingo[count];
      arrcolumnas[j].style.backgroundColor = "";
      count += 1;

      //console.log("areglo columnas", arrcolumnas);
    }
  }
}



 
/*
function actualizar222() {
  let count = 0;
  let tablaRef = document.getElementById("tabla");
  let arrfilas = tablaRef.getElementsByTagName("tr");

  for (i = 0; i < arrfilas.length; i++) {
    arrcolumnas = arrfilas[i].getElementsByTagName("td");
    //console.log(arrcolumnas);

    for (j = 0; j < arrcolumnas.length; j++) {
      if (arrcolumnas[j].innerHTML === "X") {
        count += 1;
        arrcolumnas[j].style.backgroundColor = "#003f87";
      }
    }
  }
}
*/
/*function llenartabla(arrNumerosBingo) {
  let tablaRef=document.getElementById("tabla");
  let arrfilas=tablaRef.getElementsByTagName(tr)
  for(i=0;i<arrfilas[i].length;i++){
    a
    
  }
}
*/

//Funcion que compara el numero que salio con la tarjeta;
//si se encuentra el numero lo cambia por una x, si no lo encuentra te dice que no esta!
let contadorb;
function reiniciarCont() {
  contadorb = 0;
  return contadorb;
}

function compararBingoConTarjeta() {
  const numero = arrNumerosBingo[contadorb];

  let tablaRef = document.getElementById("tabla");
  let arrfilas = tablaRef.getElementsByTagName("tr");

  for (i = 0; i < arrfilas.length; i++) {
    arrcolumnas = arrfilas[i].getElementsByTagName("td");
    //console.log(arrcolumnas);

    for (j = 0; j < arrcolumnas.length; j++) {
      if (arrcolumnas[j].innerHTML === numero) {
        count += 1;
        arrcolumnas[j].innerHTML = "X";
        arrcolumnas[j].style.backgroundColor = "#003f87";
      }
    }
  }
}
/*const encontrarNumero = (element) => element === numero;
  let posicionNumero = arrTarjetaBingo.findIndex(encontrarNumero);
  contadorb += 1;
  console.log("numeroencontrado", numero);
  console.log("ArrNumerosBingo", arrNumerosBingo);
  console.log("arreglo tarjeta", arrTarjetaBingo);
  console.log("posicion de nuemro", posicionNumero);
  console.log("contador", contadorb);
  if (posicionNumero !== -1) {
    arrTarjetaBingo[posicionNumero] = "X";

    llenartabla();
    actualizar222();
    
  } else {
    console.log("el numero no se encuentra en su tarjeta");
  }
}
*/
//FUNCION PRINCIPAL

function principal() {
  let nombreJugador = window.prompt(
    "BIENVENIDO AL BINGO, INTRODUZCA SU NOMBRE"
  );
  resultado = `BIENVENIDO ${nombreJugador.toUpperCase()}`;
  document.getElementById("nombrePersona").innerHTML = resultado;
}
let contador;

/* let dato;
  dato = window.prompt("Introduce tu nombre", "");
  resultado = `BIENVENIDO ${dato.toUpperCase()}`;
  //let a=document.getElementById("nombrePersona").innerHTML += resultado;
  //document.getElementById("formulario").hidden = "false";
  document.getElementById("nombrePersona").innerHTML = resultado; */

function linea() {
  let linea = false;
  let contado = 0;
  let contado1 = 0;
  let contado2 = 0;

  //for (i = 0; i < arrfilas.length; i++) {
  let tablaRef = document.getElementById("tabla");
  let arrfilas = tablaRef.getElementsByTagName("tr");
  let arrcolumnas = arrfilas[0].getElementsByTagName("td");
  console.log(arrcolumnas);

  if (linea === false) {
    for (j = 0; j < arrcolumnas.length; j++) {
      if (arrcolumnas[j].innerHTML === "X") {
        contado += 1;
        console.log("contado", contado);
        if (contado === 5) {
          linea = true;
          break;
        }
      }
    }
  }

  if (linea === false) {
    arrcolumnas = arrfilas[1].getElementsByTagName("td");
    for (k = 0; k < arrcolumnas.length; k++) {
      if (arrcolumnas[k].innerHTML === "X") {
        contado1 += 1;
        console.log("contado1", contado1);
        if (contado1 === 5) {
          linea = true;
          alert("linea!");
          break;
        }
      }
    }
  }
  if (linea === false) {
    arrcolumnas = arrfilas[2].getElementsByTagName("td");
    for (l = 0; l < arrcolumnas.length; l++) {
      if (arrcolumnas[l].innerHTML === "X") {
        contado2 += 1;
        console.log("contado2", contado2);
        if (contado2 === 5) {
          linea = true;
          alert("linea!");
          break;
        }
      }
    }
  }
}
