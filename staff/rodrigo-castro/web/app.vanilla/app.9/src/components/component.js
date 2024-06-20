export default class Component {
    constructor(templateOrElement) {
        if(typeof templateOrElement === 'string'){
            const parser = new DOMParser

            this.container = parser.parseFromString(templateOrElement, 'text/html').body.children[0]
        } else this.container = templateOrElement
    }

    add(...components) {
        components.forEach(component => this.container.appendChild(component.container))
        
    }
}