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

//const peter = new Person('Peter Pan', new Date(1990, 0, 1), 'male')
//const john = new Person('John Doe', new Date(1990, 0, 1), 'male')
//const wendy = new Person('Wendy Darling', new Date(1992, 0, 1), 'female')

function Woman(name, birth) {
    Person.call(this, name, birth, 'female')
}

//Woman.prototype = new Person
Woman.prototype = Object.create(Person.prototype)
Woman.prototype.constructor = Woman

const wendy = new Woman('Wendy Darling', new Date(1992, 0, 1))
//const peter = new Man('Peter Pan', new Date(1990, 0, 1))

console.log('...')


