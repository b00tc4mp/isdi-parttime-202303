class App extends React.Component {
  constructor() {
      console.log('App -> construct')
      super()

      this.state = { view: 'countdown' }
  }

  setState(newState) {
      console.log('App -> setState')

      super.setState(newState)
  }

  handleLeave = () => this.setState({ view: null })

  render() {
      console.log('App -> render')

      return <>
          {this.state.view === 'countdown' && <NASACounter />}
          {this.state.view !== 'countdown' && <h1>bye bye</h1>}
          
          <button onClick={this.handleLeave}>leave</button>
      </>
  }
}