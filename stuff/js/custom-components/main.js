class Component {
    constructor(templateOrElement) {
        if (typeof templateOrElement === 'string') {
            const doc = new DOMParser().parseFromString(templateOrElement, 'text/html')

            this.container = doc.body.children[0]
        } else this.container = templateOrElement
    }

    add(...components) {
        components.forEach(component => this.container.appendChild(component.container))
    }
}

class HelloWorld extends Component {
    constructor() {
        super(`<h1>Hello, World!</h1>`)
    }
}

class Hello extends Component {
    constructor(name) {
        super(`<h1>Hello, ${name}!</h1>`)
    }
}

class List extends Component {
    constructor(...elements) {
        super(`<ul></ul>`)

        elements.forEach(element => {
            const item = new Item(element)

            //this.container.appendChild(item.container)
            this.add(item)
        })
    }
}

class Item extends Component {
    constructor(element) {
        super(`<li>
            <h2><a href="https://google.com/search?q=${element}" target="_blank">${element}</a></h2>
            <button>alert</button>
        </li>`)

        this.container.querySelector('button').onclick = function () {
            alert(element)
        }
    }
}

const compo = new Component('<h1>hello compo</h1>')
const helloWorld = new HelloWorld
const helloPepito = new Hello('Pepito')
const fruitList = new List('banana', 'orange', 'mango', 'lemon')
const carList = new List('ferrari', 'tesla', 'lexus', 'dacia')

const body = new Component(document.body)

body.add(helloWorld, helloPepito, fruitList, carList)