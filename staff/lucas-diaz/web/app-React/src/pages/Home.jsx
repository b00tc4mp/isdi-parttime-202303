import retrieveUser from "../logic/retrieveUser";
import { context } from "../ui"
import { useState } from "react";
import Posts from "../components/Posts"
import AddPostModal from "../components/AddPostModal";
import UpdateAvatar from "../components/UpdateAvatar";
import UpdatePassword from "../components/UpdatePassword";
import UpdatePost from "../components/UpdatePost";

export default function Home({ onLogOutClick }) {
    const [view, setView] = useState("posts");
    const [modal, setModal] = useState(null);
    const [postId, setPostId] = useState(null);
    const [lastPostUpdate, setLastPostUpdate] = useState(Date.now())

    let _user
    try {
        _user = retrieveUser(context.userId)
    } catch (error) {
        alert(error.message)
    }

    const [user, setUser] = useState(_user);

    //? SETTINGS Y LOG OUT 
    const handleSettingsClick = () => setView(null);
    const handleLogOutClick = () => {
        delete context.userId
        onLogOutClick();
    }
    //? SETTINGS --> AVATAR 
    const handleAvatarAnchor = (event) => {
        event.preventDefault();
        setView("avatar");
    }
    const handleUpdatedAvatar = () => setView("posts")
    const handleCancelUpdatedAvatar = () => setView("posts")

    //? SETTINGS --> PASSWORD 
    const handlePasswordAnchor = (event) => {
        event.preventDefault();
        setView("password");
    }
    const handleUpdatedPassword = () => setView("posts");
    const handleCancelUpdatedPassword = () => setView("posts");

    //? ADD POST MODAL 
    const handleFooterButtonClick = () => setModal("addPost")
    const handleCancelAddPost = () => setModal(null)
    const handleCreatedPost = () => {
        setModal(null);
        setLastPostUpdate(Date.now())
    }

    //? UPDATE POST  MODAL
    const openEditPostModal = (id) => {
        setModal("updatePost")
        setPostId(id)
    }
    const CloseUpdatePostModal = () => setModal(null)

    const HandleUpdatedPost = () => {
        setModal(null);
        setLastPostUpdate(Date.now());
    }

    console.log("Home -> render")

    return <div className="home">
        <header className="home-header">
            <h1 className="home-header-tittle">Home</h1>
            <div className="home-header-left-items">
                <img className="home-header-left-items-config-icon" src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png" alt="" onClick={handleSettingsClick} />
                <button className="home-header-left-items-log-out-button button" onClick={handleLogOutClick} >Log out</button>
            </div>
            <div className="home-header-user">
                <img className="home-header-user-avatar" src={user.avatar} alt="default avatar" />
                <h2 className="home-header-user-welcome-msj"></h2>
            </div>
            <nav className={`home-menu ${view === null ? "home-menu-transition" : ""} ${view === "avatar" || view === "posts" || view === "password" ? "" : "home-menu-transition"}`}>
                <ul>
                    <li><a href="" className="home-menu-change-pass-anchor" onClick={handlePasswordAnchor}>change password</a></li>
                    <li><a href="" className="home-menu-avatar-anchor" onClick={handleAvatarAnchor}>Avatar</a></li>
                    <li><a href="" className="home-menu-option3">option 3</a></li>
                </ul>
            </nav>
        </header>

        <main className={`container ${modal === "addPost" || view === null || modal === "updatePost" ? "fade" : ""} ${view === "avatar" || view === "posts" || view === "password" || modal === null ? "" : "fade"}`}>
            {view === "posts" && <Posts
                onEditPostButtonClick={openEditPostModal}
                lastPostsUpdate={lastPostUpdate}
            />}
            {view === "avatar" && <UpdateAvatar
                onUpdatedAvatar={handleUpdatedAvatar}
                onCancelClick={handleCancelUpdatedAvatar}
            />}
            {view === "password" && <UpdatePassword
                onUpdatedPassword={handleUpdatedPassword}
                onCancelClick={handleCancelUpdatedPassword}
            />
            }
        </main>

        <footer className="footer">
            {modal === "updatePost" && <UpdatePost
                postId={postId}
                onUpdatedPost={HandleUpdatedPost}
                onCancelClick={CloseUpdatePostModal}
            />}
            {modal === "addPost" && <AddPostModal
                onCancelClick={handleCancelAddPost}
                onCreatedPost={handleCreatedPost}
            />}

            <button className="footer-button button" onClick={handleFooterButtonClick}> + </button>
        </footer>
    </div>

}
