const questions = [
  {
    letter: "a",
    status: 0,
    alternativeWords: [
      {
        answer: "abducir",
        question:
          "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien.",
      },
      {
        answer: "animar",
        question:
          "CON LA A. Ayudar a alguien a encontrarse mejor anímicamente, o alentarle a hacer algo.",
      },
      {
        answer: "abrazar",
        question:
          "CON LA A. Ceñir o rodear algo o a alguien con los brazos, especialmente como muestra de afecto o cariño.",
      },
    ],
  },
  {
    letter: "b",
    status: 0,
    alternativeWords: [
      {
        answer: "bingo",
        question:
          "CON LA B. Juego que ha sacado de quicio a todos los 'Coders' en las sesiones de precurso.",
      },
      {
        answer: "barco",
        question:
          "CON LA B. Embarcación con el fondo cóncavo y con cubierta, en especial la de gran o medio tonelaje, que sirve para navegar por el mar.",
      },
      {
        answer: "becerro",
        question:
          "CON LA B. Cría de la vaca que no pasa, o pasa muy poco, de dos años.",
      },
    ],
  },
  {
    letter: "c",
    status: 0,
    alternativeWords: [
      {
        answer: "churumbel",
        question: "CON LA C. Niño, crío, bebé.",
      },
      {
        answer: "cardo",
        question:
          "CON LA C. Planta silvestre de hojas grandes y espinosas y flores en cabezuela.",
      },
      {
        answer: "cazar",
        question:
          "CON LA C. Buscar o perseguir animales (en especial, los de tierra o aire) para atraparlos o matarlos.",
      },
    ],
  },
  {
    letter: "d",
    status: 0,
    alternativeWords: [
      {
        answer: "diarrea",
        question:
          "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida.",
      },
      {
        answer: "dialecto",
        question:
          "CON LA D. Variedad de una lengua que se habla en un determinado territorio.",
      },
      {
        answer: "dado",
        question:
          "CON LA D. Pieza cúbica que se usa en juegos de azar y en cuyas caras hay puntos, de uno hasta seis, o figuras distintas.",
      },
    ],
  },
  {
    letter: "e",
    status: 0,
    alternativeWords: [
      {
        answer: "ectoplasma",
        question:
          "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación.",
      },
      {
        answer: "electrocutar",
        question:
          "CON LA E. Matar mediante descargas eléctricas, en especial a un condenado a muerte.",
      },
      {
        answer: "exquisito",
        question:
          "CON LA E. Que es de una calidad, un refinamiento y un gusto extraordinarios.",
      },
    ],
  },
  {
    letter: "f",
    status: 0,
    alternativeWords: [
      {
        answer: "facil",
        question:
          "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad.",
      },
      {
        answer: "fragmento",
        question:
          "CON LA F. Parte o pedazo, generalmente irregular, de una cosa partida o quebrada.",
      },
      {
        answer: "fino",
        question: "CON LA F. Que es delgado o tiene poco grosor o espesor.",
      },
    ],
  },
  {
    letter: "g",
    status: 0,
    alternativeWords: [
      {
        answer: "galaxia",
        question:
          "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas.",
      },
      {
        answer: "gorra",
        question:
          "CON LA G. Prenda de vestir que cubre la cabeza, generalmente de tela o piel, en especial la que tiene forma redonda y lleva una visera.",
      },
      {
        answer: "guion",
        question:
          "CON LA G. Escrito que contiene los diálogos y las indicaciones técnicas necesarias, como planos, decorados, iluminación, etc., para la realización de una película, obra de teatro o programa de radio o televisión.",
      },
    ],
  },
  {
    letter: "h",
    status: 0,
    alternativeWords: [
      {
        answer: "harakiri",
        question: "CON LA H. Suicidio ritual japonés por desentrañamiento.",
      },
      {
        answer: "helicoptero",
        question:
          "CON LA H. Aeronave que vuela gracias a una gran hélice en su parte superior central y otra más pequeña en la cola.",
      },
      {
        answer: "herbivoro",
        question: "CON LA H. Animal que se alimenta de vegetales",
      },
    ],
  },
  {
    letter: "i",
    status: 0,
    alternativeWords: [
      {
        answer: "iglesia",
        question: "CON LA I. Templo cristiano.",
      },
      {
        answer: "isla",
        question:
          "CON LA I. Porción de tierra rodeada de agua por todas partes.",
      },
      {
        answer: "ingles",
        question:
          "CON LA I. Relativo a Inglaterra, parte integrante del Reino Unido, o a sus habitantes.",
      },
    ],
  },
  {
    letter: "j",
    status: 0,
    alternativeWords: [
      {
        answer: "jabali",
        question:
          "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba.",
      },
      {
        answer: "juguete",
        question:
          "CON LA J. Objeto que sirve para jugar los niños y está destinado expresamente a este fin.",
      },
      {
        answer: "jarra",
        question: "CON LA J. Recipiente cilíndrico con asa para beber cerveza.",
      },
    ],
  },
  {
    letter: "k",
    status: 0,
    alternativeWords: [
      {
        answer: "kamikaze",
        question:
          "CON LA K. Persona que se juega la vida realizando una acción temeraria.",
      },
      {
        answer: "kimono",
        question:
          "CON LA K. Prenda de vestir en forma de T, de tela ligera, con las mangas muy anchas, que cubre el cuerpo, tiene distintos largos y se abrocha por delante con un cinturón o faja; es una prenda típica de Japón y en Occidente se utiliza como una bata para estar en casa.",
      },
      {
        answer: "kiko",
        question: "CON LA K. Grano de maíz tostado y salado.",
      },
    ],
  },
  {
    letter: "l",
    status: 0,
    alternativeWords: [
      {
        answer: "licantropo",
        question: "CON LA L. Hombre lobo.",
      },
      {
        answer: "libro",
        question:
          "CON LA L. Conjunto de hojas de papel, pergamino, vitela, etc., manuscritas o impresas, unidas por uno de sus lados y normalmente encuadernadas, formando un solo volumen.",
      },
      {
        answer: "llorar",
        question: "CON LA L. Hombre lobo",
      },
    ],
  },
  {
    letter: "m",
    status: 0,
    alternativeWords: [
      {
        answer: "misogino",
        question:
          "CON LA M. Que siente aversión hacia las mujeres o no confía en ellas.",
      },
      {
        answer: "mariposa",
        question:
          "CON LA M. Insecto de boca chupadora, con dos pares de alas cubiertas de escamas y generalmente de colores brillantes, que constituye la fase adulta de los lepidópteros.",
      },
      {
        answer: "mañana",
        question:
          "CON LA M. Parte del día que transcurre desde el amanecer hasta el mediodía.",
      },
    ],
  },
  {
    letter: "n",
    status: 0,
    alternativeWords: [
      {
        answer: "necedad",
        question: "CON LA N. Demostración de poca inteligencia.",
      },
      {
        answer: "narcisismo",
        question:
          "CON LA N. Admiración excesiva y exagerada que siente una persona por sí misma, por su aspecto físico o por sus dotes o cualidades.",
      },
      {
        answer: "nombre",
        question:
          "CON LA N. Palabra o conjunto de palabras con las que se designan y se distinguen los seres vivos y los objetos físicos o abstractos.",
      },
    ],
  },
  {
    letter: "ñ",
    status: 0,
    alternativeWords: [
      {
        answer: "señal",
        question:
          "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.",
      },
      {
        answer: "ñu",
        question:
          "CON LA Ñ. Mamífero rumiante africano de la familia de los antílopes, de color pardo grisáceo, cuya cabeza recuerda la de un toro.",
      },
      {
        answer: "hazaña",
        question: "CONTIENE LA Ñ. Acción de gran esfuerzo y valor.",
      },
    ],
  },
  {
    letter: "o",
    status: 0,
    alternativeWords: [
      {
        answer: "orco",
        question:
          "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien.",
      },
      {
        answer: "oliva",
        question:
          "CON LA O. Fruto comestible, de pequeño tamaño, forma ovalada, color verde o negro y con un hueso o carozo grande y duro en su interior que encierra la semilla; de él se extrae aceite.",
      },
      {
        answer: "oligarquia",
        question:
          "CON LA O. Sistema de gobierno en la que el poder está en manos de unas pocas personas pertenecientes a una clase social privilegiada.",
      },
    ],
  },
  {
    letter: "p",
    status: 0,
    alternativeWords: [
      {
        answer: "procastinar",
        question: "CON LA P. Aplazar una obligación o un trabajo.",
      },
      {
        answer: "piña",
        question:
          "CON LA P. Planta tropical de hojas espinosas, largas y hendidas, flores de color morado y fruto carnoso y comestible.",
      },
      {
        answer: "polivalente",
        question:
          "CON LA P. Que tiene varias funciones o valores, o puede desempeñar varias funciones.",
      },
    ],
  },
  {
    letter: "q",
    status: 0,
    alternativeWords: [
      {
        answer: "queso",
        question:
          "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche.",
      },
      {
        answer: "quemar",
        question:
          "CON LA Q. Calentar demasiado una cosa, especialmente hasta el punto de estropearla, por estar mucho tiempo expuesta al fuego o a una temperatura elevada.",
      },
      {
        answer: "quieto",
        question: "CON LA Q. Que no tiene o no hace movimiento.",
      },
    ],
  },
  {
    letter: "r",
    status: 0,
    alternativeWords: [
      {
        answer: "raton",
        question:
          "CON LA R. Mamífero roedor de pequeño tamaño, pelo fino, cola larga, patas cortas, cabeza pequeña y orejas tiesas; se reproduce a gran velocidad y vive en las casas o en el campo; hay muchas especies.",
      },
      {
        answer: "robar",
        question:
          "CON LA R. Quitar a una persona algo que le pertenece con ánimo de lucro, por medio de la violencia o la intimidación o utilizando la fuerza.",
      },
      {
        answer: "rugoso",
        question:
          "CON LA R. Que tiene arrugas o asperezas en su superficie y resulta áspero al tacto.",
      },
    ],
  },
  {
    letter: "s",
    status: 0,
    alternativeWords: [
      {
        answer: "stackoverflow",
        question:
          "CON LA S. Comunidad salvadora de todo desarrollador informático.",
      },
      {
        answer: "silencio",
        question:
          "CON LA S. Estado en el que no hay ningún ruido o no se oye ninguna voz.",
      },
      {
        answer: "santo",
        question: "CON LA S. De Dios o de la religión o relacionado con ellos.",
      },
    ],
  },
  {
    letter: "t",
    status: 0,
    alternativeWords: [
      {
        answer: "terminator",
        question:
          "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984.",
      },
      {
        answer: "tactica",
        question:
          "CON LA T. Procedimiento o método que se sigue para conseguir un fin determinado o ejecutar algo.",
      },
      {
        answer: "tatuaje",
        question:
          "CON LA T. Dibujo grabado en la piel de una persona introduciendo sustancias colorantes bajo la epidermis.",
      },
    ],
  },
  {
    letter: "u",
    status: 0,
    alternativeWords: [
      {
        answer: "unamuno",
        question:
          "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914.",
      },
      {
        answer: "unguento",
        question:
          "CON LA U. Medicamento líquido o pastoso que se unta en una parte del cuerpo y sirve para aliviar o calmar dolores.",
      },
      {
        answer: "union",
        question:
          "CON LA U. Juntar dos o más elementos distintos para formar un todo.",
      },
    ],
  },
  {
    letter: "v",
    status: 0,
    alternativeWords: [
      {
        answer: "vikingos",
        question:
          "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa.",
      },
      {
        answer: "vigia",
        question:
          "CON LA V. Persona que se encarga de vigilar un lugar desde un punto apropiado, generalmente situado en alto, para poder avisar en caso de que exista un peligro o amenaza.",
      },
      {
        answer: "venganza",
        question: "CON LA V. Acción con la que una persona se venga de otra.",
      },
    ],
  },
  {
    letter: "w",
    status: 0,
    alternativeWords: [
      {
        answer: "sandwich",
        question:
          "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso.",
      },
      {
        answer: "wifi",
        question:
          "CON LA W. Tecnología que permite conectar diferentes equipos informáticos a través de una red inalámbrica de banda ancha.",
      },
      {
        answer: "wasabi",
        question:
          "CON LA W. Raíz de esta planta, de color verde claro, que se utiliza mucho en la cocina japonesa.",
      },
    ],
  },
  {
    letter: "x",
    status: 0,
    alternativeWords: [
      {
        answer: "botox",
        question:
          "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética.",
      },
      {
        answer: "toxico",
        question:
          "CONTIENE LA X. Que es venenoso o que puede causar trastornos o la muerte a consecuencia de las lesiones debidas a un efecto químico.",
      },
      {
        answer: "exhibicion",
        question: "CONTIENE LA X. Muestra o exposición en público.",
      },
    ],
  },
  {
    letter: "y",
    status: 0,
    alternativeWords: [
      {
        answer: "peyote",
        question:
          "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos.",
      },
      {
        answer: "yogur",
        question:
          "CON LA Y. Alimento líquido y espeso o pastoso, de sabor agrio, que se obtiene por fermentación de la leche de vaca entera o desnatada.",
      },
      {
        answer: "yema",
        question:
          "CON LA Y. Núcleo de los huevos de los vertebrados ovíparos; es esferoidal, de color amarillo y está rodeada por la clara.",
      },
    ],
  },
  {
    letter: "z",
    status: 0,
    alternativeWords: [
      {
        answer: "zen",
        question:
          "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional.",
      },
      {
        answer: "zapato",
        question:
          "CON LA Z. Calzado que cubre total o parcialmente el pie sin sobrepasar el tobillo, con una suela de un material casi siempre más duro que el resto.",
      },
      {
        answer: "zamora",
        question: "CON LA Z. Provincia y capital española.",
      },
    ],
  },
];