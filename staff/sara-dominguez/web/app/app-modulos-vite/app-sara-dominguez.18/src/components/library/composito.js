console.log('Composito v0')

export default class Component {
    constructor(templateOrElement) {
        if(typeof templateOrElement === 'string') {
            const doc = new DOMParser().parseFromString(templateOrElement, 'text/html')

            this.container = doc.body.children[0]
        } else this.container = templateOrElement
    }

    add(...components) {
        components.forEach(component => this.container.appendChild(component.container))
        //este this apunta a la clase, al haber una arro function
    }

    remove(component) {
        this.container.removeChild(component.container)
    }
}
