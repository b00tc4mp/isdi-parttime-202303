console.log('main.js')
import App from './app.js'
import Component from './library/component.js'
import { getTheme } from './logic/helpers/get-theme.js'
getTheme()
const app = new App()
const body = new Component(document.body)

body.add(app)


/* TO DO
    - header to class
    - logout
    - session storage
    - user settings
    -  comments
    - refresh likes and comments
    - new post
    - edit post
    - single post

*/