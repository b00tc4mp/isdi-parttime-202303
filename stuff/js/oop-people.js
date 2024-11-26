class Person {
    constructor(name, birth, gender) {
        this.name = name
        this.birth = birth
        this.gender = gender
    }

    salute() {
        return '👋'
    }
    
    pee() {
        return '💦'
    }
    
    poo() {
        return '💩'
    }
}

// Woman

class Woman extends Person {
    constructor(name, birth) {
        super(name, birth, 'female')
    }

    giveBirth() {
        return '👶🏻'
    }
}

// Man

class Man extends Person {
    constructor(name, birth) {
        super(name, birth, 'male')
    }
    
    giveSperm() {
        return '🤍'
    }
}

const wendy = new Woman('Wendy Darling', new Date(1992, 0, 1))
const peter = new Man('Peter Pan', new Date(1990, 0, 1))

console.log(wendy, peter)
console.log(wendy instanceof Man) // false
console.log(wendy instanceof Woman) // true
console.log(wendy instanceof Person) // true

console.log(peter.giveSperm(), wendy.giveBirth())


// VM9624:48 Woman {name: 'Wendy Darling', birth: Wed Jan 01 1992 00:00:00 GMT+0100 (Central European Standard Time), gender: 'female'}birth: Wed Jan 01 1992 00:00:00 GMT+0100 (Central European Standard Time) {}gender: "female"name: "Wendy Darling"[[Prototype]]: Personconstructor: class WomangiveBirth: ƒ giveBirth()[[Prototype]]: Object Man {name: 'Peter Pan', birth: Mon Jan 01 1990 00:00:00 GMT+0100 (Central European Standard Time), gender: 'male'}
// VM9624:49 false
// VM9624:50 true
// VM9624:51 true
// VM9624:53 🤍 👶🏻
// undefined