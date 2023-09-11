class Car {
    motor = true;
    type;
    color;
    brand;

    constructor(type, color, brand){
        this.type = type;
        this.color = color;
        this.brand = brand;
    }

    turnOn() {
        alert("BRRRRMMMMM!!!");
    }
}

const newCar = new Car("4x4", "Yellow", "Toyota");
newCar.turnOn();

const secondCar = {
    motor: true,
    type: "4x4",
    color: "Yellow",
    brand: "Toyota",
}

console.log(newCar);
console.log(secondCar);