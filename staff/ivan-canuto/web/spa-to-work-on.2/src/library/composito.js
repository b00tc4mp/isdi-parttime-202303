export class Component {
  constructor(templateOrElement) {
    if (typeof templateOrElement === 'string') {
      const doc = new DOMParser().parseFromString(templateOrElement, 'text/html')

      this.container = doc.body.children[0]
      // Lo de .body.children se hace porque cuando usas el método parseFromString te crea un documento con el html, el body y el elemento creado dentro, y nosotros solo queremos lo que está dentro del body, que es el elemento que hemos creado
    } else this.container = templateOrElement
  }

  add(...components) {
    components.forEach(component => this.container.appendChild(component.container))
  }

  remove(component) {
    this.container.removeChild(component.container)
  }
}