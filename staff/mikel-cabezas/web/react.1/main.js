const title = React.createElement('h1', null, 'hola mundo')
const container = document.querySelector('#root')

const oranges = React.createElement('li', null, 'oranges')
const apples = React.createElement('li', null, 'apples')
const pears = React.createElement('li', null, 'pears')

const list = React.createElement('ul', null, oranges, apples, pears )

const salute = () => alert('hola mundo')

const button = React.createElement('button', { onClick: salute }, 'click me')

ReactDOM.createRoot(container).render([title, list, button])