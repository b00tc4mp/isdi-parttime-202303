import retrieveUser from "../logic/retrieveUser";
import { context } from "../ui"
import { Component } from "react";
import Posts from "../components/Posts"
import AddPostModal from "../components/AddPostModal";
import UpdateAvatar from "../components/UpdateAvatar";
import UpdatePassword from "../components/UpdatePassword";

export default class Home extends Component {
    constructor(props) {
        super(props)

        try {
            const user = retrieveUser(context.userId)

            this.state = {
                view: "posts",
                modal: null,
                // postId: null,
                // lastPostsUpdate: Date.now(),
                user
            }

        } catch (error) {
            alert(error.message)
        }
    }

    //? SETTINGS Y LOG OUT 
    handleSettingsClick = () => {
        const headerMenu = document.querySelector(".home-menu");
        headerMenu.classList.toggle("home-menu-transition");
        document.querySelector("main").classList.toggle("fade");
    }
    handleLogOutClick = () => {
        delete context.userId
        this.props.onLogOutClick();
    }
    //? SETTINGS --> AVATAR 
    handleAvatarAnchor = (event) => {
        event.preventDefault();
        document.querySelector("main").classList.remove("fade");
        const headerMenu = document.querySelector(".home-menu");
        //headerMenu.classList.toggle("home-menu-transition");
        this.setState({ view: "avatar" });
    }
    handleUpdatedAvatar = () => {
        const headerMenu = document.querySelector(".home-menu");
        headerMenu.classList.toggle("home-menu-transition");
        this.setState({ view: "posts" })
    }
    handleCancelUpdatedAvatar = () => {
        const headerMenu = document.querySelector(".home-menu");
        headerMenu.classList.toggle("home-menu-transition");
        this.setState({view: "posts"})
    }
    //? SETTINGS --> PASSWORD 
    handlePasswordAnchor = (event) => {
        event.preventDefault();
        document.querySelector("main").classList.remove("fade");
        const headerMenu = document.querySelector(".home-menu");
        //headerMenu.classList.toggle("home-menu-transition");
        this.setState({ view: "password" });
    }

    handleUpdatedPassword = () => {
        const headerMenu = document.querySelector(".home-menu");
        headerMenu.classList.toggle("home-menu-transition");
        this.setState({ view: "posts" });
    }

    handleCancelUpdatedPassword = () =>{
        const headerMenu = document.querySelector(".home-menu");
        headerMenu.classList.toggle("home-menu-transition");
        this.setState({ view: "posts" });
    }

    //? ADD POST MODAL 
    handleFooterButtonClick = () => {
        this.setState({ modal: "add-post" })
        document.querySelector("main").classList.add("fade");
    }
    handleCancelAddPost = () => {
        this.setState({ modal: null })
        document.querySelector("main").classList.remove("fade");
    }
    handleCreatedPost = () => {
        this.setState({ modal: null })
        document.querySelector("main").classList.remove("fade");
    }

    render() {
        console.log("Home -> render")

        return <div className="home">
            <header className="home-header">
                <h1 className="home-header-tittle">Home</h1>
                <div className="home-header-left-items">
                    <img className="home-header-left-items-config-icon" src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png" alt="" onClick={this.handleSettingsClick} />
                    <button className="home-header-left-items-log-out-button button" onClick={this.handleLogOutClick} >Log out</button>
                </div>
                <div className="home-header-user">
                    <img className="home-header-user-avatar" src={this.state.user.avatar} alt="default avatar" />
                    <h2 className="home-header-user-welcome-msj"></h2>
                </div>
                <nav className="home-menu">
                    <ul>
                        <li><a href="" className="home-menu-change-pass-anchor" onClick={this.handlePasswordAnchor}>change password</a></li>
                        <li><a href="" className="home-menu-avatar-anchor" onClick={this.handleAvatarAnchor}>Avatar</a></li>
                        <li><a href="" className="home-menu-option3">option 3</a></li>
                    </ul>
                </nav>
            </header>

            <main className="container">
                {this.state.view === "posts" && <Posts />}
                {this.state.view === "avatar" && <UpdateAvatar
                    onUpdatedAvatar={this.handleUpdatedAvatar}
                    onCancelClick={this.handleCancelUpdatedAvatar}
                />}
                {this.state.view === "password" && <UpdatePassword
                    onUpdatedPassword={this.handleUpdatedPassword}
                    onCancelClick={this.handleCancelUpdatedPassword}
                />
                }
            </main>

            <footer className="footer">
                {this.state.modal === "add-post" && <AddPostModal
                    onCancelClick={this.handleCancelAddPost}
                    onCreatedPost={this.handleCreatedPost}
                />}
                <button className="footer-button button" onClick={this.handleFooterButtonClick}> + </button>
            </footer>
        </div>
    }
}
