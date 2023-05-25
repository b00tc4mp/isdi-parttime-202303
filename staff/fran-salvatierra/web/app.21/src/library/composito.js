console.log('composito v0');

export default class Component {
    constructor(templateOrElement) {
        if (typeof templateOrElement === 'string') {
            const doc = new DOMParser().parseFromString(templateOrElement, 'text/html');

            this.container = templateOrElement
        }
    }

    add(...components) {
        components.forEach(component => this.container.appendChild(component.container));
    }


}