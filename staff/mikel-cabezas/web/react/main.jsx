const title = React.createElement('h1', null, 'hola mundo')
const container = document.querySelector('#root')

const oranges = <li>oranges</li>
const apples = <li>apples</li>
const pears = <li>pears</li>

const list = <ul>{[oranges, apples, pears]}</ul>

const salute = () => alert('hola mundo')

const button = <button onClick={salute}>click me</button>

ReactDOM.createRoot(container).render([title, list, button])