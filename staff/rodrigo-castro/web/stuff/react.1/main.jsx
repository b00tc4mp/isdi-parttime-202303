const title = <h1>hola mundo</h1>

const oranges = <li>oranges</li>
const apples = <li>apples</li>
const pears = <li>pears</li>

const list = <ul>{[oranges, apples, pears]}</ul>

const salute = () => alert('hola mundo')

const button = <button onClick={salute}>hello world</button>

// link react with DOM

const container = document.querySelector('#root')

// ReactDOM.render(title, container)

// const root = ReactDOM.createRoot(container)
// root.render(title)

ReactDOM.createRoot(container).render([title, list, button])