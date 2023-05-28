const [, , a, b, op = '+'] = process.argv //esto es un string!

switch (op) {
    case '+':
        console.log(Number(a) + Number(b))
        break

    case '-':
        console.log(Number(a) - Number(b))
        break


    case '/':
        console.log(Number(a) / Number(b))
        break

    case '*':
        console.log(Number(a) * Number(b))
        break
}