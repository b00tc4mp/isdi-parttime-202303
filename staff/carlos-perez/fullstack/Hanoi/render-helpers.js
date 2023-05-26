const mostarMenu = () =>{
    console.clear();

    console.log("Torres de Hanoi");
    console.log(' ');
    console.log(' ');
    console.log('1. Jugar');
    console.log('2. Salir');
    console.log(' ');
    console.log(' ');

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Elija una opción: ', (opt)=>{
        console.log(opt);
        readline.close();
    })
}