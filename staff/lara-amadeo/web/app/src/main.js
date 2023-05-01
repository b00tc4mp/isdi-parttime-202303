import { Component } from "./library/master-component.js"
import { App } from "./app.js"

const app = new App()
const  body = new Component(document.body)

body.add(app)