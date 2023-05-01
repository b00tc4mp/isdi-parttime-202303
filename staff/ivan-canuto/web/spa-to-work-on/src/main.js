import { Component } from "./library/composito.js";
import App from "./app.js";

const app = new App()
const body = new Component(document.body)

body.add(app)