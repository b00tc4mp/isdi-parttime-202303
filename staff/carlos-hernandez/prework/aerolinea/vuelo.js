function habilitarTabla() {
  if (arrVuelos[0] === undefined) {
    alert("Lo sentimos, no hay vuelos planificados para hoy");
  } else {
    let botonAct = document.getElementsByClassName("botonactivo");
    for (let i = 0; i < botonAct.length; i++) {
      botonAct[i].hidden = true;
    }
    

    document.getElementById("miForm").hidden = true;
    let dato;
    dato = window.prompt("Introduce tu nombre", "");
    let resultado = dato.toUpperCase();
    document.getElementById("nombrePersona").innerHTML = resultado;
  }
}

function filtrarPrecio() {
  let precioFiltroValor = document.getElementById("inputprecio").value;

  let tablaElement = document.getElementById("tabla");
  let arrFilasElement = tablaElement.getElementsByTagName("tr");
  for (i = 1; i < arrFilasElement.length; i++) {
    let arrColumnasElement = arrFilasElement[i].getElementsByTagName("td");
    console.log(arrColumnasElement);
    let precio = parseInt(arrColumnasElement[3].innerHTML);
    let precioFiltroInt = parseInt(precioFiltroValor);
    if (precio > precioFiltroInt) {
      arrFilasElement[i].hidden = true;
    } else {
      arrFilasElement[i].hidden = false;
    }
  }
}

function habilitarForm() {
  let dato;
  dato = window.prompt("Introduce tu nombre", "");
  resultado = `BIENVENIDO ${dato.toUpperCase()}`;

  document.getElementById("nombrePersona").innerHTML = resultado;
  document.getElementById("miForm").hidden = false;

  let botonAct = document.getElementsByClassName("botonactivo");
  for (i = 0; i < botonAct.length; i++) {
    botonAct[i].hidden = false;
  }
}

const arrVuelos = [];
let nuevoAtributoId;

function agregarVuelo() {
  let form = document.getElementById("formulario");
  console.log("este es valor data", new FormData(form).get("origen"));
  
  if (arrVuelos.length < 15) {
    let nuevoVuelo = crearVuelo();
    arrVuelos.push(nuevoVuelo);
    insertarFila(nuevoVuelo);
  } else {
    console.log("LA CANTIDAD MAXIMA DE VUELOS ES 15, DEBE ELIMINAR!!");
    alert("LA CANTIDAD MAXIMA DE VUELOS ES 15, DEBE ELIMINAR!!");
  }

  console.log(arrVuelos);
}

function crearVuelo() {
  
  let origenCapturar = document.getElementById("origen").value;
  let destinoCapturar = document.getElementById("destino").value;
  let precioCapturar = document.getElementById("precio").value;
  let escalaCapturar = document.getElementById("escala").checked;
  let rand = Math.random() * 100;
  let id = Math.floor(rand);

  const vuelo = {
    id: id,
    origen: origenCapturar, 
    destino: destinoCapturar,
    precio: precioCapturar,
    escala: escalaCapturar,
  };
  return vuelo;
}

function insertarFila(nuevoVuelo) {
  let tablaRef = document.getElementById("tabla");


  let newRow = tablaRef.insertRow(-1);
  newRow.setAttribute("ide", nuevoVuelo.id);

  
  let newCel = newRow.insertCell(0);
  newCel.innerHTML = nuevoVuelo.id;
  let newCel1 = newRow.insertCell(1);
  newCel1.innerHTML = nuevoVuelo.origen;
  let newCel2 = newRow.insertCell(2);
  newCel2.innerHTML = nuevoVuelo.destino;
  let newCel3 = newRow.insertCell(3);
  newCel3.innerHTML = nuevoVuelo.precio;
  let newCel4 = newRow.insertCell(4);
  newCel4.innerHTML = nuevoVuelo.escala;
  let newCellDelete = newRow.insertCell(5);

  let deleteButton = document.createElement("button");
  deleteButton.type = "reset";
  deleteButton.className = "botonactivo";

 
  deleteButton.textContent = "Eliminar";
  newCellDelete.appendChild(deleteButton);
  deleteButton.addEventListener("click", (event) => {
    nuevoAtributoId = parseInt(newRow.getAttribute("ide"));
    event.target.parentNode.parentNode.remove(), eliminarVuelo(); 
  });

  function eliminarVuelo() {
    for (i = 0; i < arrVuelos.length; i++) {
      if (arrVuelos[i].id === nuevoAtributoId) {
        let index = i;
        arrVuelos.splice(index, 1);
        console.log(arrVuelos);
      }
    }
  }
}

let validarElementos = function (e) {
  validarNombre(evt);

};

function validarNombre(evt) {
  let validOrigen = document.getElementById("origen").value;

  if (validOrigen === "") {
    alert("completa el campo origen");
    evt.preventDefault();
  }
}
