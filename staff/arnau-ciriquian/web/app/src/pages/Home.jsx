import { Component } from "react"
import { getLoggedUser } from "../logic/getLoggedUser.js"
import { context } from "../ui.js"
import Posts from "../components/Posts.jsx"
import App from "../App.jsx"

let user

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: 'posts',
        }
        
        user = getLoggedUser(context.userId)    
    }

    handleLogOut = () => {
        delete context.userId
        this.props.onLoggedOut()
    }
    
    handleToggledLike = () => {
        this.forceUpdate()
    }
    
    render() {
        return <div className="home">
            <header className="home__navigation">
                <nav className="home__navigation--profile">
                    <img className="avatar" src={user.avatar} />
                    <p className="text"><a className="home__anchor--profile" href="">{user.name}</a></p>
                </nav>
                <div>
                    <button className="navigation__anchor--logout" href="" onClick={this.handleLogOut}><img className="anchor__logout--icon" src="images/rocket-launch.svg" /></button>
                </div>
            </header>
            <main>
                { this.state.view === 'posts' && <Posts onToggleLike={this.handleToggledLike}/>}
            </main>
            <footer>
                <p className="add-post-anchor"><a className="home__anchor--new-post" href="">Add new post</a></p>
            </footer>
        </div> 
    }
}