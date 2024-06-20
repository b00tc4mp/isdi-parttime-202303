import Posts from "../components/Posts.jsx"
import { Component } from "react"
import AddPostModal from "../components/AddPostModal.jsx"


export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: null }
    }

    handleAddPost = () => this.setState({ view: 'add-post' })
    handleCloseAddPost = () => this.setState({ view: null })



    render() {
        console.log('Home -> render')

        return <div className="home container">
            <header className="home-header">
                <h1 className="title">Home</h1>

                <nav className="home-header-nav">
                    <img className="home-header-avatar" src="" alt="" />
                    <a href="">Profile</a>
                </nav>

                <button className="home-header-logout">Logout</button>
            </header>

            <main className="container">
                <Posts />

                {this.state.view === 'add-post' && <AddPostModal onCancel={this.handleCloseAddPost}/>}
            </main>

            <footer className="home-footer">
                <button className="add-post-button" onClick={this.handleAddPost}>+</button>
            </footer>
        </div>
    }
}