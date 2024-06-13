let numeroLLenarTarjeta;
let numeroComparar;
let completada = false;

let nombre = ["J", "O", "H", "N", "S", "N", "O", "W"];
let duplicados = [];
let count = 0;

function a() {
  for (let i = 0; i < nombre.length; i++) {
    let aComp = nombre[i];
    debugger;
    for (j = i + 1; j < nombre.length; j++) {
      if (nombre.includes(aComp) === false) {
        duplicados.push(aComp);
      }
    }
  }
}
console.log(duplicados);

//console.log("cargado");
//Generar tarjeta con 15 numeros sin repetirse
function llenartarjeta() {
  document.getElementById("nuevoNumero").disabled = false;
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
  return arrTarjetaBingo;
}

function llenarBingoNumeros() {
  document.getElementById("nuevoNumero").disabled = false;
  arrNumerosBingo = [];
  for (i = 0; arrNumerosBingo.length < 100; i++) {
    numeroLLenarBingo = parseInt((Math.random() * 100).toFixed(0));
    if (!arrNumerosBingo.includes(numeroLLenarBingo) && numeroLLenarBingo !== 0)
      arrNumerosBingo.push(numeroLLenarBingo);
  }
  console.log("tabla Bingo", arrNumerosBingo);
  return arrNumerosBingo;
}

function llenartabla() {
  contadorb = 0;
  llenartarjeta();
  completada = false;
  let count = 0;
  let tablaRef = document.getElementById("tabla");
  let arrfilas = tablaRef.getElementsByTagName("tr");
  console.log("las filas", arrfilas.length);
  for (i = 0; i < arrfilas.length; i++) {
    let arrcolumnas = arrfilas[i].getElementsByTagName("td");
    for (j = 0; j < arrcolumnas.length; j++) {
      arrcolumnas[j].innerHTML = arrTarjetaBingo[count];
      arrcolumnas[j].style.backgroundColor = "";
      count += 1;
    }
  }
}

function compararBingoConTarjeta() {
  const numero = arrNumerosBingo[contadorb];
  console.log(numero, "numeroarreglo");

  document.getElementById("numeroBombo").innerHTML = numero;

  let tablaRef = document.getElementById("tabla");
  let arrfilas = tablaRef.getElementsByTagName("tr");

  for (let i = 0; i < arrfilas.length; i++) {
    if (arrfilas[i].classList.contains("completada")) {
      continue;
    }
    let arrcolumnas = arrfilas[i].getElementsByTagName("td");
    let contador = 0; // nuevo contador por fila
    for (let j = 0; j < arrcolumnas.length; j++) {
      if (arrcolumnas[j].innerHTML === "X") {
        contador += 1; //i=0 j=0 contador=1; i=0 j=1 contador=2 ;
      } else if (arrcolumnas[j].innerHTML === numero.toString()) {
        // count += 1;
        contador += 1;
        arrcolumnas[j].innerHTML = "X";
        arrcolumnas[j].style.backgroundColor = "#003f87";
      }
    } //termino el for de columnas
    if (contador === 5) {
      arrfilas[i].classList.add("completada");

      if (completada === false) {
        completada = true;
        alert("fila completada");
      }
    }
  }

  let filasCompletadas = document.getElementsByClassName("completada");
  if (filasCompletadas.length === 3) {
    alert("BINGOOOOO");

    console.log(filasCompletadas, "fikascompletyadas");
    // desactivo botton;
    document.getElementById("nuevoNumero").disabled = true;
    document.getElementById("numeroBombo").innerHTML = 0;
    contador = 0;
    for (let i = 0; i < arrfilas.length; i++) {
      arrfilas[i].classList.remove("completada");
    }

  

    return;
  } else {
    contadorb++;
  }
}

function principal() {
  let nombreJugador = window.prompt(
    "BIENVENIDO AL BINGO, INTRODUZCA SU NOMBRE"
  );
  resultado = `BIENVENIDO ${nombreJugador.toUpperCase()}`;
  document.getElementById("nombrePersona").innerHTML = resultado;
}
