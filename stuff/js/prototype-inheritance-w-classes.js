class Shape {}

class Round extends Shape {}

class Circle extends Round {}

class Ellipse extends Circle {}

class HorizontalEllipse extends Ellipse {}

class VerticalEllipse extends Ellipse {}

var ve = new VerticalEllipse

console.dir(ve)
// VM8850:15 VerticalEllipse[[Prototype]]: Ellipseconstructor: class VerticalEllipse[[Prototype]]: Circleconstructor: class Ellipse[[Prototype]]: Roundconstructor: class Circle[[Prototype]]: Shapeconstructor: class Round[[Prototype]]: Object
// undefined
ve.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
ve.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// null