function Shape() {}

function Round() {}

Round.prototype = Object.create(Shape.prototype)
Round.prototype.constructor = Round

function Circle() {}

Circle.prototype = Object.create(Round.prototype)
Circle.prototype.constructor = Circle

function Ellipse() {}

Ellipse.prototype = Object.create(Round.prototype)
Ellipse.prototype.constructor = Ellipse

function HorizontalEllipse() {}

HorizontalEllipse.prototype = Object.create(Ellipse.prototype)
HorizontalEllipse.prototype.constructor = HorizontalEllipse

function VerticalEllipse() {}

VerticalEllipse.prototype = Object.create(Ellipse.prototype)
VerticalEllipse.prototype.constructor = VerticalEllipse


var ve = new VerticalEllipse

console.dir(ve)
// VM8300:31 VerticalEllipse[[Prototype]]: Ellipseconstructor: ƒ VerticalEllipse()[[Prototype]]: Roundconstructor: ƒ Ellipse()[[Prototype]]: Shapeconstructor: ƒ Round()[[Prototype]]: Objectconstructor: ƒ Shape()[[Prototype]]: Object
// undefined