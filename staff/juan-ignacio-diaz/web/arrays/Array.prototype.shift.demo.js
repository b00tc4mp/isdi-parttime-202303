var miPescado = ['ángel', 'payaso', 'mandarín', 'cirujano'];

console.log('miPescado antes: ' + miPescado);
// "miPescado antes: ángel,payaso,mandarín,cirujano"

var eliminado = miPescado.shift();

console.log('miPescado después: ' + miPescado);
// "miPescado after: payaso,mandarín,cirujano"

console.log('Elemento eliminado: ' + eliminado);
// "Elemento eliminado: ángel"