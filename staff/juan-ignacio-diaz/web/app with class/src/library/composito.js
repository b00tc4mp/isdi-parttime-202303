export class Component {
    constructor(templateOrElement) {
        if(typeof templateOrElement === 'string') {
            this.container = new DOMParser().parseFromString(templateOrElement, 'text/html').body.children[0]
        }
        else 
            this.container = templateOrElement
    }
    
    add(...components) {
        components.forEach(component => this.container.appendChild(component.container))
    }

    remove(component) {
        this.container.removeChild(component.container)
    }
}