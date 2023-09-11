const nombre = ['R', 'O', 'D', 'R', 'I', 'G', 'O', 'C', 'A', 'S', 'T', 'R', 'O'];
//for (let i = 0; i < myName.length; i++){
//
//};
console.log(nombre.join('/'));
let myLastName = nombre.splice(7);
console.log(myLastName.join('|'));

for(let i = 0; i < nombre.length; i++) {
    let position = i+1;
    console.log(position + 'º' + nombre[i]);
};