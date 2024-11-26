import App from './app.js'
import Component from './library/component.js'

const app = new App()
const body = new Component(document.body)

body.add(app)