const [, , a, b, op = '+'] = process.argv

switch(op) {
  case '+':
    console.log(Number(a) + Number(b), 'hola')
    return
  case '-':
    console.log(Number(a) - Number(b))
    return
  case '*':
    console.log(Number(a) * Number(b))
    return
  case '/':
    console.log(Number(a) / Number(b))
    return
}