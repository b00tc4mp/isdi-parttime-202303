let users = [];

users.push({
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123'
})

users.push({
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
})

users.push({
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123'
})

console.log('Bucle for'+'\n');

for(let i=0; i<users.length; i++){
    console.log(users[i].name);
}
console.log('\n');

console.log('Bucle for...in'+'\n');

for(let i in users){
    console.log(users[i].name);
}
console.log('\n');

console.log('Bucle for...of'+'\n');

for(let user of users){
    console.log(user.name);
}
console.log('\n');

console.log('Array.prototype.forEach()'+'\n');

function imprime(objeto){
    console.log(objeto.name);
}

users.forEach(imprime);