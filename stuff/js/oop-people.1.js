function Person() {}

Person.prototype.salute = function() {
    return '👋'
}

Person.prototype.pee = function() {
    return '💦'
}

Person.prototype.poo = function() {
    return '💩'
}

const peter = new Person

//console.log(peter.salute())