class NASACounter extends React.Component {
    constructor(props) {
        console.log('NASACounter -> constructor')

        super(props)

        this.state = {
            count: 10
        }
    }

    setState(newState) {
        console.log('NASACounter -> setState')

        super.setState(newState)
    }

    componentDidMount() {
        console.log('NASACounter -> componentDidMount')

        const timer = setInterval(() => {
            this.state.count > 0 ?
                this.setState({ count: this.state.count - 1 })
                :
                clearInterval(timer)
        }, 1000)
    }

    render() {
        console.log('NASACounter -> render')

        return (
            <div style={this.props}>
                <h1>
                    NASA Countdown: <br /> {this.state.count || "🪐"} <br />
                    {"⭐".repeat(this.state.count) || "🚀"}
                </h1>
                {this.state.count === 0 && <h2>LIFT OFF!!!</h2>}
            </div>
        )
    }
}