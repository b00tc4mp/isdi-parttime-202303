let words = [
  {
    letter: "A",
    word: "abrazar",
    definition: "Tomar con los brazos a alguien para mostrar afecto.",
  },
  {
    letter: "B",
    word: "besar",
    definition: "Tocar con los labios la boca o la mejilla de alguien.",
  },
  {
    letter: "C",
    word: "cangrejo",
    definition:
      "Animal acuático de aspecto muy distintivo, con cuerpo aplanado y patas articuladas.",
  },
  { letter: "D", word: "dar", definition: "Entregar o ceder algo a alguien." },
  {
    letter: "E",
    word: "elefante",
    definition:
      "Mamífero grande y de patas gruesas, con una trompa y dos colmillos prominentes.",
  },
  {
    letter: "F",
    word: "flor",
    definition: "Parte de la planta que se encarga de la reproducción.",
  },
  {
    letter: "G",
    word: "gato",
    definition: "Mamífero domestico de pequeño tamaño y pelo suave.",
  },
  { letter: "H", word: "hablar", definition: "Comunicarse con palabras." },
  {
    letter: "I",
    word: "iris",
    definition: "Parte del ojo que controla la cantidad de luz que entra.",
  },
  {
    letter: "J",
    word: "jabón",
    definition: "Producto utilizado para limpiar y lavar.",
  },
  {
    letter: "K",
    word: "kilo",
    definition: "Unidad de medida de masa equivalente a mil gramos.",
  },
  {
    letter: "L",
    word: "leer",
    definition: "Examinar y comprender el significado de lo escrito.",
  },
  {
    letter: "M",
    word: "manzana",
    definition:
      "Fruto de piel comestible, de color verde, rojo o amarillo, con semillas en su interior.",
  },
  {
    letter: "N",
    word: "necesidad",
    definition: "Cosa que se necesita o se requiere.",
  },
  {
    letter: "Ñ",
    word: "ñandú",
    definition: "Ave muy parecida al avestruz que habita en América del Sur.",
  },
  {
    letter: "O",
    word: "ojal",
    definition:
      'Abreviación de "ojo de la cerradura", que es una pieza de metal con forma de ojo, que se usa para colgar o sostener algo.',
  },
  {
    letter: "P",
    word: "pájaro",
    definition: "Animal vertebrado que puede volar y tiene plumas.",
  },
  {
    letter: "Q",
    word: "queja",
    definition: "Expresión de descontento o molestia.",
  },
  {
    letter: "R",
    word: "rosa",
    definition: "Flor de pétalos suaves y fragantes, de diversos colores.",
  },
  {
    letter: "S",
    word: "sopa",
    definition:
      "Plato hecho con caldo y otros ingredientes, que se come caliente.",
  },
  {
    letter: "T",
    word: "tijera",
    definition:
      "Herramienta para cortar, formada por dos hojas de metal afiladas que se mueven una respecto de la otra.",
  },
  {
    letter: "U",
    word: "unicornio",
    definition:
      "Animal imaginario con forma de caballo y un cuerno en la cabeza.",
  },
  {
    letter: "V",
    word: "vaca",
    definition:
      "Mamífero de gran tamaño, de pelo largo y suave, que produce leche.",
  },
  {
    letter: "W",
    word: "walmart",
    definition: "Cadena de tiendas de descuento con sede en Estados Unidos.",
  },
  {
    letter: "X",
    word: "xilófono",
    definition:
      "Instrumento de percusión con varias barras de madera de diferentes tamaños y sonidos.",
  },
  {
    letter: "Y",
    word: "yema",
    definition:
      "Parte de un huevo que contiene la célula que puede convertirse en un pollo.",
  },
  {
    letter: "Z",
    word: "zapato",
    definition: "Prenda de vestir que se usa para cubrir y proteger los pies.",
  },
];

let name = prompt('Enter your name:');
let score = 0;
let timeLimit = 130; // 130 segundos

let skippedWords = [];

let skippedWords = [];

function playRound(letter, word, definition) {
  // Mostrar la letra y la definición y pedir al usuario que adivine la palabra
  let guess = prompt(`Letter: ${letter}\nDefinition: ${definition}\nGuess the word:`);

  // Si el usuario responde "pasapalabra", guardar la palabra y su definición en el array temporal
  if (guess === 'pasapalabra') {
    skippedWords.push({ letter: letter, word: word, definition: definition });
  }
  // Continuar con la ronda sin importar si la respuesta es correcta o incorrecta
  return true;
}

for (let i = 0; i < words.length; i++) {
  let currentWord = words[i];
  let keepPlaying = playRound(currentWord.letter, currentWord.word, currentWord.definition);
  if (!keepPlaying) {
    break;
  }
}

// Si hay palabras guardadas como "pasapalabra", preguntar al usuario por ellas
if (skippedWords.length > 0) {
  for (let i = 0; i < skippedWords.length; i++) {
    let currentWord = skippedWords[i];
    let guess = prompt(`Definition: ${currentWord.definition}\nGuess the word:`);
    if (guess !== currentWord.word) {
      alert('Incorrect. Better luck next time!');
    }
  }
}


// Iniciar una cuenta regresiva de 130 segundos
let countdown = setInterval(() => {
timeLimit--;
if (timeLimit === 0) {
  clearInterval(countdown);
  alert('Time\'s up!');
}
}, 1000);



alert(`Game over! Your score is ${score}.`);

// Almacenar el nombre del usuario y su puntuación en un array
let scores = [];
scores.push({ name: name, score: score });

// Ordenar el array de puntuaciones de mayor a menor
scores.sort((a, b) => b.score - a.score);

// Mostrar el ranking de puntuaciones
console.log('Ranking:');
for (let i = 0; i < scores.length; i++) {
console.log(`${i + 1}. ${scores[i].name} - ${scores[i].score} points`);
}
