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

        this.state = { 
            time: new Date,
            temp: Math.random()
        }
    }

    handleUpdateTime() {
        const time = new Date

        this.setState({ time })
    }

    handleUpdateTemp() {
        const temp = Math.random()

        this.setState({ temp })
    }

    handleUpdateTimeAndTemp() {
        const time = new Date
        const temp = Math.random()

        this.setState({ time, temp })
    }

    render() {
        console.log(`<div>
            <h1>${this.props.title} ${this.props.version}</h1>

            <time>${this.state.time.toISOString()}</time>

            <temp>${this.state.temp}</temp>
        </div>`)
    }
}

// <App title="My App" version="1.0" />

const app = new App({ title: 'My App', version: '1.0' })
app.render()

// VM2568:44 <div>
//             <h1>My App 1.0</h1>

//             <time>2023-05-04T19:54:02.605Z</time>

//             <temp>0.7407003620635775</temp>
//         </div>
// undefined
app.handleUpdateTime()
// VM2568:44 <div>
//             <h1>My App 1.0</h1>

//             <time>2023-05-04T19:54:32.668Z</time>

//             <temp>0.7407003620635775</temp>
//         </div>
// undefined
app.handleUpdateTemp()
// VM2568:44 <div>
//             <h1>My App 1.0</h1>

//             <time>2023-05-04T19:54:32.668Z</time>

//             <temp>0.17413211555634178</temp>
//         </div>
// undefined
app.handleUpdateTimeAndTemp()
// VM2568:44 <div>
//             <h1>My App 1.0</h1>

//             <time>2023-05-04T19:54:54.828Z</time>

//             <temp>0.2744271565715535</temp>
//         </div>
// undefined