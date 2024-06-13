export default class Component {
    constructor(templateOrElement) {
        if (typeof templateOrElement === 'string') {
            const document = new DOMParser().parseFromString(templateOrElement, 'text/html')

            this.container = document.body.children[0]
        } else this.container = templateOrElement
    }

    add(...components) {
        components.forEach(component => this.container.appendChild(component.container))
    }

    remove(component) {
        this.container.removeChild(component.container)
    }
}