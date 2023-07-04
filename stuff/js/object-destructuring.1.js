var peter = { name: 'Peter', surname: 'Pan', age: 18, info: { nid: '123456789X', country: 'Neverland' } }

//var name = peter.name
//var surname = peter.surname
//var age = peter.age
//var info = peter.info

var { name, surname, age, info } = peter

console.log(name, surname, age, info)

name = 'Pepito'
info.country = 'Wonderland'

console.log(peter)



// VM1646:10 Peter Pan 18 {nid: '123456789X', country: 'Neverland'}
// VM1646:15 {name: 'Peter', surname: 'Pan', age: 18, info: {…}}age: 18info: {nid: '123456789X', country: 'Wonderland'}name: "Peter"surname: "Pan"[[Prototype]]: Objectconstructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()__proto__: (...)get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()
// undefined