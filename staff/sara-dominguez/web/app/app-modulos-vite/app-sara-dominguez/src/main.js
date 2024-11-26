import App  from "./app.js"
import Component from "./components/library/composito.js"

const app = new App()
const body = new Component(document.body)

body.add(app)