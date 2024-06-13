import { Component } from "react"
import { getLoggedUser } from "../logic/getLoggedUser"
import { DEFAULT_AVATAR_URL } from "../logic/registerUser"
import { context } from "../ui"
import Posts from "../logic/components/posts"

let user

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'page' }
        
        user = getLoggedUser(context.userId)
    }


    
    render() {
       return <div className="home">
        <header className="home__navigation">
            <nav className="home__navigation--profile">
                <img className="avatar" src={user.avatar} />
                <p className="text"><a className="home__anchor--profile" href="">{user.name}</a></p>
            </nav>
            <div>
                <a className="navigation__anchor--logout" href=""><img className="anchor__logout--icon" src="images/rocket-launch.svg" /></a>
            </div>
        </header>
        <main>
            { this.state.view === 'page' && <Posts />}
        </main>
        <footer>
            <p className="add-post-anchor"><a className="home__anchor--new-post" href="">Add new post</a></p>
        </footer>
    </div> 
    } 
}