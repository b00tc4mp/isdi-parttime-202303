console.log('Composito v0.1');

export class Component {
  constructor(templateOrElement) {
    if (typeof templateOrElement === 'string') {
      const doc = new DOMParser().parseFromString(
        templateOrElement,
        'text/html'
      );

      this.container = doc.body.children[0];
    } else this.container = templateOrElement;
  }

  add(...components) {
    components.forEach((component) =>
      this.container.appendChild(component.container)
    );
  }

  remove(component) {
    this.container.removeChild(component.container);
  }
}
