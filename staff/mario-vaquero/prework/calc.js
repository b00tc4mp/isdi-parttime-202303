const calculator = (...numbers) => {
  const results = [];

  if (numbers.some((n) => isNaN(parseFloat(n)))) {
    alert("Por favor, intruduzca solo numeros");
    return;
  }

  if (numbers.length === 1) {
    const sqrt = Math.sqrt(numbers[0]);
    console.log(`La raíz cuadrada de ${numbers[0]} es ${sqrt.toFixed(3)}.`);
  } else if (numbers.length === 2) {
    const sum = numbers[0] + numbers[1];
    const subtraction = numbers[0] - numbers[1];
    const multiplication = numbers[0] * numbers[1];
    const division = numbers[0] / numbers[1];

    results.push(
      `La suma de ${numbers[0]} y ${numbers[1]} es ${sum.toFixed(3)}.`,
      `La resta de ${numbers[0]} y ${numbers[1]} es ${subtraction.toFixed(3)}.`,
      `El producto de ${numbers[0]} y ${numbers[1]} es ${multiplication.toFixed(
        3
      )}.`,
      `La división de ${numbers[0]} entre ${numbers[1]} es ${division.toFixed(
        3
      )}.`
    );

    console.log(
      `La suma de ${numbers[0]} y ${numbers[1]} es ${sum.toFixed(3)}.`
    );
    console.log(
      `La resta de ${numbers[0]} y ${numbers[1]} es ${subtraction.toFixed(3)}.`
    );
    console.log(
      `El producto de ${numbers[0]} y ${numbers[1]} es ${multiplication.toFixed(
        3
      )}.`
    );
    console.log(
      `La división de ${numbers[0]} entre ${numbers[1]} es ${division.toFixed(
        3
      )}.`
    );
  } else {
    alert("Error: Has introducido un número incorrecto de argumentos.");
    return;
  }

  return results;
};

let anotherOperation = true;
const resultsArray = [];

while (anotherOperation) {
  const input = prompt("Introduce dos números separados por comas:");

  const numbers = input.split(",").map((n) => parseFloat(n));

  const results = calculator(...numbers);

  const answer = prompt("¿Deseas realizar otra operación? (S/N)");
  anotherOperation = answer.toLowerCase() === "s";
}