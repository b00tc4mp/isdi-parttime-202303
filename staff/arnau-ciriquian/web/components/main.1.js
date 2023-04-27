class Component {
    constructor(template) {
        const parser = new DOMParser

        this.container = parser.parseFromString(template, 'text/html').body.children[0]
    }
}

class HelloTrainer extends Component {
    constructor(name) {
        super(`<h1>Hello, ${name || 'trainer'}!</h1>`)
        
        document.body.append(this.container)
    }
}

class AddInfo extends Component {
    constructor(info) {
        super(`<h2>${info || `I'll get back to you soon!`}</h2>`)
        
        document.body.append(this.container)
    }
}

class AddButton extends Component {
    constructor(buttonText) {
        super(`<button>${buttonText}</button>`)

        document.body.append(this.container)
    }
}

class AddProposal extends Component {
    constructor() {
        super(`<div></div>`)

        //const typeOne = new AddType('Fire')
        const pokemonOne = new AddPokemon('Fire')
        const pokemonTwo = new AddPokemon('Water')
        const pokemonThree = new AddPokemon('Grass')

        this.container.append(pokemonOne.container, pokemonTwo.container, pokemonThree.container)

        document.body.append(this.container)
    }
}

class AddType extends Component {
    constructor(type) {
        super(`<p>${type}</p>`)
    }
}

class AddPokemon extends AddType {
    constructor(type) {
        if (type === 'Fire') {
            super(`Charmander`)
        }
        if (type === 'Water') {
            super(`Squirtle`)
        }
        if (type === 'Grass') {
            super(`Bulbasaur`)
        }
    }
}

const helloTrainer = new HelloTrainer('Arnau')
const newMessage = new AddInfo('Chose your new pokemon!')
const startButton = new AddButton(`Let's go!`)

startButton.container.onclick = function() {
    const presentPokemons = new AddProposal()
    startButton.container.style.display = 'none'
}
