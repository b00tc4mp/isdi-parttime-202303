import Posts from "../components/Posts"
import retrieveUser from "../logic/retrieveUser";
import { context } from "../ui"

export default function Home(props) {

    function handleLogOutClick() {
        delete context.userId
        props.onLogOutClick();
    }

    let user;
    
    try{
        user = retrieveUser(context.userId);
    }catch(error){
        alert(error.message)
    }

    return <div className="home">
        <header className="home-header">
            <h1 className="home-header-tittle">Home</h1>
            <div className="home-header-left-items">
                <img className="home-header-left-items-config-icon" src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png" alt="" />
                <button className="home-header-left-items-log-out-button button" onClick={handleLogOutClick} >Log out</button>
            </div>
            <div className="home-header-user">
                <img className="home-header-user-avatar" src={user.avatar} alt="default avatar" />
                <h2 className="home-header-user-welcome-msj"></h2>
            </div>
            <nav className="home-menu">
                <ul>
                    <li><a href="" className="home-menu-change-pass-anchor">change password</a></li>
                    <li><a href="" className="home-menu-avatar-anchor">Avatar</a></li>
                    <li><a href="" className="home-menu-option3">option 3</a></li>
                </ul>
            </nav>
        </header>

        <main className="home-posts-content">
            <Posts />
        </main>

        <footer className="footer">
            <button className="footer-button button"> + </button>
        </footer>
    </div>
}