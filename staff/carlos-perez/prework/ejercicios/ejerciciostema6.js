//Ejercicio 1

console.log('Ejercicio 1');

showNums = () => {
    const nums = [1,2,3,4,5,6,7,8,9]
    for(let i = 0; i < nums.length-1; i++){
        let pairs = [nums[i],nums[i+1]];
        console.log(pairs[0]*2+' '+pairs[1]*2);
    }
}

showNums();

//Ejercicio 1.1

console.log('\nEjercicio 1.1');
const showNums2 = (vector) => {
    for(let i = 0; i < vector.length-1; i++){
        let pairs = [vector[i],vector[i+1]];
        console.log(pairs[0]*2+' '+pairs[1]*2);
    }
}

showNums2([1,2,3,4,5,6,7,8,9]);

//Ejercicio 1.2

console.log('\nEjercicio 1.2');

const showNums3=(vector)=>{
    console.log('El número escogido es '+vector[vector.length-1]);
    for(let i = 0; i < vector.length-2; i++){
        let pairs = [vector[i],vector[i+1]];
        console.log(pairs[0]*vector[vector.length-1]+' '+pairs[1]*vector[vector.length-1]);
    }
}

showNums3([1,2,3,4,5,6,7,8,9,12]);

//Ejercicio 1.3

console.log('\nEjercicio 1.3');

const showNums4=(vector) =>{
    console.log('El número escogido es '+vector[vector.length-2]);
    console.log('El número de parejas a mostrar es '+vector[vector.length-1]);
    for(let i = 0; i < vector[vector.length-1]; i++){
        let pairs = [vector[i],vector[i+1]];
        console.log(pairs[0]*vector[vector.length-2]+' '+pairs[1]*vector[vector.length-2]);
    } 
}

showNums4([1,2,3,4,5,6,7,8,9,12,3]);

//Ejercicio 2

console.log('\nEjercicio 2');

const fibo = (limite) =>{
    const inicio = [0,1];
    let solucion='';
    for(let i=2; i<=limite-1; i++){
        const aux = inicio[i-2]+inicio[i-1];
        inicio.push(aux);
    }
    for(let i in inicio){
        solucion+=inicio[i]+' ';
    }
    console.log(solucion);
}

fibo(8);

//Ejercicio 2.1

console.log('\nEjercicio 2.1');

const fibo2 = (limite) =>{
    const inicio = [0,1];
    let solucion='';
    for(let i=2; i<=limite-1; i++){
        const aux = inicio[i-2]+inicio[i-1];
        inicio.push(aux);
    }
    for(let i in inicio){
        solucion+=inicio[i]+' - posición '+(Number(i)+1)+'\n';
    }
    console.log(solucion);
}

fibo2(8);

// 2.2 y 2.3 están hechos en el propio 2 y 2.1

//Ejercicio 2.4

console.log('\nEjercicio 2.4');

const fibo3 = (limite) =>{
    const inicio = [0,1];
    for(let i=2; i<=limite-1; i++){
        const aux = inicio[i-2]+inicio[i-1];
        inicio.push(aux);
    }
    return inicio;
}

const fiboPiramide=(serie)=>{
    for(let i = 0; i<serie.length-1; i++){
        let solucion='';
        for(let j=0; j<=i; j++){
            solucion+=serie[j]+' ';
        }
        console.log(solucion);
    }
    for(let i = serie.length-1; i>=0; i--){
        let solucion='';
        for(let j=0; j<=i; j++){
            solucion+=serie[j]+' ';
        }
        console.log(solucion);
    }
}

fiboPiramide(fibo3(8));

//Ejercicio 3

console.log('\nEjercicio 3');

const codeScript = (numeros) =>{
    const vectorNumeros=numeros.toString().split('');
    vectorNumeros.push(vectorNumeros.shift());
    return vectorNumeros.join('');
}
console.log(codeScript(3712));
console.log(codeScript(codeScript(3712)));
console.log(codeScript(codeScript(codeScript(3712))));
console.log(codeScript(codeScript(codeScript(codeScript(3712)))));