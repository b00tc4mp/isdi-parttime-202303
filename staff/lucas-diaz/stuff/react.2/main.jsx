const title = <h1>Hola mundo!</h1>

const oranges = <li>oranges</li>
const apples = <li>apples</li>
const pears = <li>pears</li>

const list = <ul>{[oranges, apples, pears]}</ul>

const salute = () => {
    alert("hola mundo!")
}
const button = <button onClick={ salute }>hola Mundo!</button>


const container = document.querySelector("#root");
ReactDOM.createRoot(container).render([title, list, button]);

