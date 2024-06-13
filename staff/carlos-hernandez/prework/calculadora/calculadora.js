

/*function onclickCalcular() {
  let valorInsertado = window.prompt("introduzca el primer valor numerico");

  if (valorInsertado === null) {
    return;
  }

  while (valorInsertado.trim() === "" || isNaN(valorInsertado) === true) {
    valorInsertado = window.prompt(
      ` El valor insertado no es valido, por favor introduzca nuevamente el valor`
    );
    if (valorInsertado === null) {
      return;
    }
  }

  // verificar segundo valor
  let valorInsertado2 = window.prompt(
    "introduzca el segundo valor numerico o cancele para mostrar la raiz"
  );

  if (valorInsertado2 === null) {
    calculadora(valorInsertado);
    return;
  }

  while (valorInsertado2.trim() === "" || isNaN(valorInsertado) === true) {
    valorInsertado2 = window.prompt(
      ` El valor insertado no es valido, por favor introduzca nuevamente el valor`
    );
    if (valorInsertado2 === null) {
      calculadora(valorInsertado);
      return;
    }
  }
  calculadora(valorInsertado, valorInsertado2);
}

function calculadora(valor1, valor2) {
  const numero1 = Number(valor1);
  if (arguments.length === 1) {
    //verifcar que es un numero
    // si es un numero calculo la raiz cuadrada
    // y en el caso que no es un numero mando un mensaje para que rectifque
    // if (verificarParametro(numero1)) {
    alert(`la raiz cuadrada del numero es:  ${Math.sqrt(numero1)}`);
    // }
  } else if (arguments.length === 2) {
    // verificar ambos que sean numericos
    // si ambos son numericos realizo todas las operaciones
    // si uno de los dos no es numerico
    // envio un mensaje en consola
    // if (verificarParametro(numero1) && verificarParametro(numero2)) {
    const numero2 = Number(valor2);
    const arrCalculadora = [];
    let mult = numero1 * numero2;
    if (!Number.isInteger(mult)) {
      mult = mult.toFixed(3);
    }

    let div = numero1 / numero2;
    if (!Number.isInteger(div)) {
      div = div.toFixed(3);
    }

    let suma = numero1 + numero2;
    if (!Number.isInteger(suma)) {
      suma = suma.toFixed(3);
    }
    let resta = numero1 - numero2;
    if (!Number.isInteger(resta)) {
      resta = resta.toFixed(3);
    }
    const concat = `resultado multiplicacion = ${mult} \ resultado division = ${div} \ resultado suma = ${suma} \ resultado resta = ${resta} `;
    arrCalculadora.push(concat);
    alert(arrCalculadora);
  }
}
*/
