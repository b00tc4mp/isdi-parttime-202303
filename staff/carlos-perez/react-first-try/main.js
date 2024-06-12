const title = React.createElement('h1', null, 'hola mundo')

const oranges = React.createElement('li', {key: 'fruit-1'}, 'oranges')
const apples = React.createElement('li', {key: 'fruit-2'}, 'apples')
const pears = React.createElement('li', {key: 'fruit-3'}, 'pears')
const list = React.createElement('ul', null, oranges, apples, pears)
const salute = () => alert('hola mundo')
const button = React.createElement('button', { onClick: salute }, 'hello world')

//Link react with DOM
const container = document.querySelector('#root')

ReactDOM.createRoot(container).render([title, list, button])

