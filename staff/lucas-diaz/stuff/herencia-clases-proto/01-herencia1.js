//------------ person ---------------------------
function Person (name, birthDate, gender){
    this.name = name
    this.birthDate = birthDate
    this.gender = gender
}

Person.prototype.talk = function() {
    console.log("Hello !! ")
}
Person.prototype.eat = function() {
    console.log("I'm eatting a salad")
}
//------------ woman ---------------------------------
function Woman (name, birth){
    Person.call(this, name, birth, "woman");
}
Woman.prototype = Object.create(Person.prototype)


Woman.prototype.giveBirth = function (){
    console.log("🤰")
}

//------------ man ---------------------------------
function Man (name, birth){
    Person.call(this, name, birth, "man");
}
Man.prototype = Object.create(Person.prototype)

Man.prototype.cum = function() {
    console.log("💧")
}

//-------------------------------------------------------

const sandra = new Woman ("Sandra", new Date(1992, 01, 01))


sandra.giveBirth();