class Component {
    constructor(props) {
        this.props = props
    }
}

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return `<div>
            <h1>${this.props.title} ${this.props.version}</h1>
        </div>`
    }
}

// <App title="My App" version="1.0" />

const app = new App({ title: 'My App', version: '1.0' })

console.log(app.render())
// VM910:23 <div>
//             <h1>My App 1.0</h1>
//         </div>
// undefined