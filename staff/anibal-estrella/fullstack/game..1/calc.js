// two first array pòsitions point to NODE and FILE (calc.js)
// destructure the process.argv array to add 3 arguments
const [, , a, b, op = '+'] = process.argv

switch (op) {
    case '+':
        console.log(Number(a) + Number(b))
        break;

    case '-':
        console.log(Number(a) - Number(b))
        break;
    case '/':
        console.log(Number(a) / Number(b))
        break;
        //scape the asterisc to use it
    case '\*':
        console.log(Number(a) * Number(b))
        break;
}