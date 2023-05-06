//Decirle a la app que ensamble todo el div del html "root"
const title = React.createElement('h1', null, 'hola mundo')

const oranges = React.createElement('li', null, 'oranges')
const apples = React.createElement('li', null, 'apples')
const pears = React.createElement('li', null, 'pears')

const list = React.createElement('ul', null, oranges, apples, pears)

const salute = () => alert('hola mundo')

const button = React.createElement('button',{ onClick: salute },'hello world')






//link react with DOM

//vieja escuela:
// ReactDOM.render(title, document.querySelector('#root'))

//version actual:
const container = document.querySelector('#root')
const root = ReactDOM.createRoot(container)
root.render([title, list, button])

//refactorizacion de version actual:
// ReactDOM.createRoot(container).render(title)