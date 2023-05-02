const title = React.createElement('h1', null, 'hola mundo')

const oranges = React.createElement('li', 'oranges')
const apples = React.createElement('li', 'apples')
const pears = React.createElement('li', 'pears')

const list = React.createElement('ul', null, oranges, apples, pears)

const salute = () => alert('hola mundo')

const button = React.createElement('button', { onClick: salute }, 'hello world')


// link react with dom

const container = document.querySelector('#root')

// ReactDOM.render(title, container)

// const root = ReactDOM.createRoot(container)
// root.render(title)
ReactDOM.createRoot(container).render([title, list, button])