// la version jsx sería:
//Decirle a la app que ensamble todo el div del html "root"
const title = <h1>hola mundo</h1>

const oranges = <li>orange</li>
const apples = <li>apples</li>
const pears = <li>pears</li>

const list = <ul>{[oranges, apples, pears]}</ul>

const salute = () => alert('hola mundo')

const button = <button onClick= {salute }>hello world</button>



//link react with DOM

//vieja escuela:
// ReactDOM.render(title, document.querySelector('#root'))

//version actual:
const container = document.querySelector('#root')
const root = ReactDOM.createRoot(container)
root.render([title, list, button])

//refactorizacion de version actual:
// ReactDOM.createRoot(container).render(title)