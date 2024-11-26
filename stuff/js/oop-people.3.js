function Person(name, birth, gender) {
    this.name = name
    this.birth = birth
    this.gender = gender
}

Person.prototype.salute = function() {
    return '👋'
}

Person.prototype.pee = function() {
    return '💦'
}

Person.prototype.poo = function() {
    return '💩'
}

// Woman

function Woman(name, birth) {
    Person.call(this, name, birth, 'female')
}

Woman.prototype = Object.create(Person.prototype)
Woman.prototype.constructor = Woman

Woman.prototype.giveBirth = function() {
    return '👶🏻'
}

// Man

function Man(name, birth) {
    Person.call(this, name, birth, 'male')
}

Man.prototype = Object.create(Person.prototype)
Man.prototype.constructor = Man

Man.prototype.giveSperm = function() {
    return '🤍'
}

const wendy = new Woman('Wendy Darling', new Date(1992, 0, 1))
const peter = new Man('Peter Pan', new Date(1990, 0, 1))

console.log(wendy, peter)
console.log(wendy instanceof Man) // false
console.log(wendy instanceof Woman) // true
console.log(wendy instanceof Person) // true

console.log(peter.giveSperm(), wendy.giveBirth())




// VM7354:48 Woman {name: 'Wendy Darling', birth: Wed Jan 01 1992 00:00:00 GMT+0100 (Central European Standard Time), gender: 'female'} Man {name: 'Peter Pan', birth: Mon Jan 01 1990 00:00:00 GMT+0100 (Central European Standard Time), gender: 'male'}
// VM7354:49 false
// VM7354:50 true
// VM7354:51 true
// VM7354:53 🤍 👶🏻
// undefined
wendy.giveSperm()
// VM7385:1 Uncaught TypeError: wendy.giveSperm is not a function
//     at <anonymous>:1:7
// (anonymous) @ VM7385:1
peter.giveBirth()
// VM7415:1 Uncaught TypeError: peter.giveBirth is not a function
//     at <anonymous>:1:7
// (anonymous) @ VM7415:1