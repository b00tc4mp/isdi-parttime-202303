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
        super(`<div class="proposal"></div>`)

        const pokemonOne = new AddPokemon()
        const pokemonTwo = new AddPokemon()
        const pokemonThree = new AddPokemon()

        this.container.append(pokemonOne.container, pokemonTwo.container, pokemonThree.container)

        document.body.append(this.container)
    }
}

class AddType extends Component {
    constructor(newType, newPokemon) {
        let type = newType
        let pokemon = newPokemon

        if (type && newPokemon)
            super(`<p>${pokemon}</p>`)

        if (!pokemon){
            if (!type)
                type = randomType(types)
            super(`<p>${pokemon}</p>`)
        }

    }
}

class AddPokemon extends AddType {
    constructor(newType) {
        let type = newType

        if (!type)
            type = randomType(types)

        if (type === 'Fire')
            super(type, `Charmander`)
        else if (type === 'Water')
            super(type, `Squirtle`)
        else if (type === 'Grass')
            super(type, `Bulbasaur`)
    }
}

const helloTrainer = new HelloTrainer('Arnau')
const newMessage = new AddInfo('Chose your new pokemon!')
const startButton = new AddButton(`Let's go!`)

startButton.container.onclick = function() {
    const proposalDiv = document.querySelector('.proposal')
    if (proposalDiv)
        proposalDiv.parentNode.removeChild(proposalDiv)
    types = ['Fire', 'Water', 'Grass']
    const presentPokemons = new AddProposal()
    startButton.container.innerText = 'Refresh!'
}

let types = ['Fire', 'Water', 'Grass']

function randomType(types) {
    const index = Math.floor(Math.random()*types.length)
    const newType = types[index]
    types.splice(index, 1)
    return newType
}

