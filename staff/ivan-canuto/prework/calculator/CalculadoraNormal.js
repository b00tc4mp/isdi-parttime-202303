const llamarCalculadora = () => {
  let dato1 = prompt(
    "Introduzca el primer dato. En caso de realizar una raíz cuadrada solo rellene esta casilla.",
    "-"
  );
  console.log("consola en dato 1: " + dato1);

  if (isNaN(dato1) || dato1 === null) {
    alert(
      "El valor introducido no corresponde a un número, por favor, introduce uno"
    );
    llamarCalculadora();
  }

  let dato2 = prompt("Introduzca el segundo dato.", "-");
  console.log("consola en dato 2: " + dato2);

  if (isNaN(dato2) && dato2 !== "-") {
    alert(
      "El valor introducido no corresponde a un número, por favor, introduce uno"
    );
    llamarCalculadora();
  } else if (dato2 === "-") {

    console.log("consola en dato 2: " + dato2);
    let datoCorregido1 = dato1.toFixed(3);
    let dato1Sqrt = Math.sqrt(datoCorregido1);
    let dato1SqrtCorregido = dato1Sqrt.toFixed(3);
    console.log(dato1SqrtCorregido);

  } else if (dato2 === null) {

    dato2 = prompt("Introduzca el segundo dato.", "-");

  } else {

    realizarOperación(dato1, dato2);

  }
};

const realizarOperación = (primero, segundo) => {
  
  let suma = primero + segundo;
  let resta = primero - segundo;
  let multiplicacion = primero * segundo;
  let multiplicacionCorregida = multiplicacion.toFixed(3);
  let division = primero / segundo;
  let divisionCorregida = division.toFixed(3);

  let resultado = alert(
    `La suma de ambos números es: ${suma}, su resta es: ${resta}, su multiplicación es: ${multiplicacionCorregida}, y su división es: ${divisionCorregida}`
  );
};

llamarCalculadora();
