class Component {
    constructor(props) {
        this.props = props
    }

    setState(newState) {
        for (const key in newState)
            this.state[key] = newState[key]

        this.render()
    }
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { time: new Date }
    }

    handleUpdateTime() {
        const time = new Date

        this.setState({ time })
    }

    render() {
        console.log(`<div>
            <h1>${this.props.title} ${this.props.version}</h1>

            <time>${this.state.time.toISOString()}</time>
        </div>`)
    }
}

// <App title="My App" version="1.0" />

const app = new App({ title: 'My App', version: '1.0' })
app.render()

// VM1951:28 <div>
//             <h1>My App 1.0</h1>

//             <time>2023-05-04T19:46:44.557Z</time>
//         </div>
// undefined

app.handleUpdateTime()
// VM1951:28 <div>
//             <h1>My App 1.0</h1>

//             <time>2023-05-04T19:46:52.861Z</time>
//         </div>
// undefined

app.handleUpdateTime()
// VM1951:28 <div>
//             <h1>My App 1.0</h1>

//             <time>2023-05-04T19:46:58.548Z</time>
//         </div>
// undefined
app.handleUpdateTime()
// VM1951:28 <div>
//             <h1>My App 1.0</h1>

//             <time>2023-05-04T19:46:59.803Z</time>
//         </div>
// undefined
app.handleUpdateTime()
// VM1951:28 <div>
//             <h1>My App 1.0</h1>

//             <time>2023-05-04T19:47:00.779Z</time>
//         </div>
// undefined