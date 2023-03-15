// Creamos una lista para almacenar los resultados de los jugadores
let results = [];

while (true) {
  // Pedimos al usuario que ingrese su nombre
  let playerName = prompt("Ingresa tu nombre:");
  
  // Preguntamos al usuario si está listo para comenzar a jugar
  let startGame = prompt("¿Estás listo para comenzar a jugar? (s/n)");
  
  // Si el usuario no está listo para jugar, terminamos el juego
  if (startGame !== "s") {
    break;
  }
  
  // Inicializamos el contador de clics a 0
  let clicks = 0;
  
  // Iniciamos un temporizador para contar durante 10 segundos
  let timer = setInterval(function() {
    // Incrementamos el contador de clics cada vez que se hace clic
    clicks++;
  }, 1000);
  
  // Esperamos 10 segundos antes de detener el temporizador
  setTimeout(function() {
    clearInterval(timer);
  }, 10000);
  
  // Mostramos el resultado del jugador
  console.log(`${playerName}, alcanzaste ${clicks} clics en 10 segundos.`);
  
  // Almacenamos el resultado del jugador en la lista de resultados
  results.push({ name: playerName, score: clicks });
}

// Ordenamos la lista de resultados de mayor a menor
results.sort(function(a, b) {
  return b.score - a.score;
});

// Mostramos el ranking de resultados
console.log("Ranking de resultados:");
for (let i = 0; i < results.length; i++) {
  console.log(`${i + 1}. ${results[i].name}: ${results[i].score} clics`);
}
