//------------ person ---------------------------
class Person {
    constructor (name, birthDate, gender){
    this.name = name
    this.birthDate = birthDate
    this.gender = gender
    }

    talk = function() {
        console.log("Hello !! ")
    }
    eat = function() {
        console.log("I'm eatting a salad")
    }
}

//------------ woman ---------------------------------
class Woman extends Person{
    constructor(name, birth){
        super(name, birth, "woman");
    }

    giveBirth = function (){
    console.log("🤰")
    }
}
//------------ man ---------------------------------
class Man extends Person{
    constructor(name, birth){
        super(name, birth, "male")
    }
    
    cum = function() {
    console.log("💧")
}
}
//-------------------------------------------------------

const sandra = new Woman ("Sandra", new Date(1992, 01, 01))


sandra.giveBirth();
sandra.eat();