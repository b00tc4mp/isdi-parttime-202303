class Shape {}

class Round extends Shape {}

// dentro de round tiene 2 hijos diferentes (elipsis y circle)
class Circle extends Round{}

class Elipsis extends Round{}

// dentro de elipsis tiene 2 hijos diferentes (Horizontal y Vertical)

class HorizontalElipsis extends Elipsis{}

class VerticalHelipsis extends Elipsis{}

var ver = new VerticalHelipsis;
// mirar ver 
