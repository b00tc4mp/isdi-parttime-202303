export class Component {
    constructor(htmlOrStringContainer){
        if (typeof htmlOrStringContainer === 'string'){
            this.container = new DOMParser().parseFromString(htmlOrStringContainer, 'text/html').body.children[0]
        } else this.container = htmlOrStringContainer
    }

    add(...components){
        components.forEach(compo => this.container.appendChild(compo.container))
    }

    remove(...components){
        components.forEach(compo => this.container.removeChild(compo.container))
    }
}