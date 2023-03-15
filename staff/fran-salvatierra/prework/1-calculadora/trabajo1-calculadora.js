// operadores

function sum(...numbers) {
    let result = 0;
    for (let i = 0; i < numbers.length; i++) {
        result += numbers[i];
    }
    return result 
}
function subtract(...numbers) {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result -= numbers[i];
    }
    return result;
}

function multiply(...numbers) {
    let result = 1;
    for (let i = 0; i < numbers.length; i++) {
        result *= numbers[i];
    }
    return result
}
function divide(...numbers) {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result /= numbers[i];
    }
    return result
    
}

let keepCalculating = true;

while (keepCalculating) {
        let numbers = [];
        let number = '';
        do {
            number = prompt('Introduce un número (Si ya has añadido todos los números, haz click en aceptar.)');
            if (number !== '') {
            numbers.push(Number(number));
            }
        } while (number !== '');
            

        if (numbers.length === 1) {
            alert('La raiz cuadrada de ' + numbers[0] + ' es ' + Math.sqrt(numbers[0]).toFixed(3))
        } else if (numbers.length > 1) {
            const result = [
                'La suma de ambos números es ' + sum(...numbers).toFixed(3),
                'La resta de ambos números es ' + subtract(...numbers).toFixed(3),
                'La multiplicación de ambos números es ' + multiply(...numbers).toFixed(3),
                'La división de ambos números es ' + divide(...numbers).toFixed(3),
                ];
        
                console.log(result)
                alert('El resultado de tus operaciones es: ' + result.join('. ') + '.');
        } else {
            alert('Debes introducir, al menos, un número.')
        }

        const questionToContinue = prompt('¿Quieres hacer otra operación? (Si/No)');

        if (questionToContinue.toLowerCase() !== 'si') {
            keepCalculating = false;
        }
    
}

alert('Gracias por usar este script');