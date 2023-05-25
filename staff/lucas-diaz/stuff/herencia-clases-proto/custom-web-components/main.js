class Component {
    constructor(templateOrElement){
        if (typeof templateOrElement === "string"){
            const parser = new DOMParser
            this.container = parser.parseFromString(templateOrElement, "text/html").body.children[0];

        } else this.container = templateOrElement;
    }

    add(...components){
        components.forEach(component => this.container.appendChild(component.container))
    }

}

class HeloWorld extends Component{
    constructor(){
        super(`<h1>Hello World</h1>`)
    }
}

class Helo extends Component{
    constructor(name){
        super(`<h1>Hello ${name}</h1>`)
    }
}

class List extends Component{
    constructor(...elements){
        super(`<ul></ul>`)
        
        elements.forEach(element => {
            const item = new Item(element)

            //this.container.append(item.container);
            this.add(item)
        })
    }
}

class Item extends Component{
    constructor(elementName){
        super(`<li>
            <h2><a href="https://google.com/search?q=${elementName}" target="_blank">${elementName}</a></h2>
            <button>Show</button>
            </li>`)
        
        this.container.querySelector("button").onclick = function() {
            alert(elementName);
        }
    }
}


const helloWorld = new HeloWorld();
const helloLucas = new Helo("Lucas");
const fruitList = new List("Banana", "Orange", "Mango");
const carList = new List('ferrari', 'tesla', 'lexus', 'dacia')


const body = new Component(document.body)


body.add(helloWorld ,helloLucas, fruitList, carList)
