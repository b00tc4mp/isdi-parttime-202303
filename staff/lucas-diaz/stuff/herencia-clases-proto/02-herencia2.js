function Shape() {}

function Round() {}

Round.prototype = Object.create(Shape.prototype)
Round.prototype.constructor = Round

// dentro de round tiene 2 hijos diferentes (elipsis y circle)

function Circle (){}

Circle.prototype = Object.create(Round.prototype)
Circle.prototype.constructor = Circle

function Elipsis(){}

Elipsis.prototype = Object.create(Round.prototype)
Elipsis.prototype.constructor = Elipsis

// dentro de elipsis tiene 2 hijos diferentes (Horizontal y Vertical)

function HorizontalElipsis(){}
HorizontalElipsis.prototype = Object.create(Elipsis.prototype)
HorizontalElipsis.prototype.constructor = HorizontalElipsis

function VerticalHelipsis(){}
VerticalHelipsis.prototype = Object.create(Elipsis.prototype)
VerticalHelipsis.prototype.constructor = VerticalHelipsis

var ver = new VerticalHelipsis;
// mirar ver 
