import { posts, savePostsInStorage, saveUsersInStorage, users} from "../data.js"
import { Posts } from "../components/posts.js"
import { Component } from "../library/master-component.js"
import retrievePosts from "../logic/retrievePosts.js"
import { renderUser } from "../logic/renderUser.js"

export class Home extends Component{
    constructor(){
        super(`<div class="homepage">

        <div class="topbar-container">
            <div class="topbar-left-side">
                <div class="avatar-icon-m-container"><span class="material-symbols-rounded icon-s topbar">menu</span></div>
            </div>
            <div class="topbar-right-side">
                <div class="avatar-icon-m-container"><span class="material-symbols-rounded icon-s topbar">settings</span></div>
    
                <img src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" class="topbar-avatar"></img>
            </div>
        </div>
        <div class="content-container">
            <div class="left-container">
                <div class="sidebar">
                    <div class="sidebar-logo-and-actions">
                        <div class="logo-and-hello">
                        <img src="logo.png" class="home-logo"></img>
                        <p class="sidebar-logo-text">Helio</p>
                        </div>
    
                        <div class="sidebar-actions">
    
                            <div class="sidebar-actions-row sidebar-home">
                                <div class="icon-m-container"><span class="material-symbols-rounded icon-m">home</span></div><div class="body-text-bold">Home</div>
                            </div>
    
                            <div class="sidebar-actions-row">
                                <div class="icon-m-container"><span class="material-symbols-rounded icon-m">search</span></div><div class="body-text-bold">Search</div>
                            </div>
    
                            <div class="sidebar-actions-row">
                                <div class="icon-m-container"><span class="material-symbols-rounded icon-m">notifications</span></div><div class="body-text-bold">Notifications</div>
                            </div>
    
                            <div class="sidebar-actions-row">
                                <div class="icon-m-container"><span class="material-symbols-rounded icon-m">mail</span></div><div class="body-text-bold">Messages</div>
                            </div>
    
                            <div class="sidebar-actions-row sidebar-settings">
                                <div class="icon-m-container"><span class="material-symbols-rounded icon-m">settings</span></div><div class="body-text-bold">Settings</div>
                            </div>
    
                        </div>
                    </div>
    
                    <div class="sidebar-profile">
                        <div class="sidebar-profile-user-and-avatar">
                            <img class="sidebar-avatar" src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" alt="">
                            <div class="sidebar-profile-user-data">
                                <p class="body-text-bold sidebar-profile-username">username</p>
                                <p class="small-text sidebar-profile-email">email</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="main-container">
                <div class="middle-section">
                    <div class="feed">
                        <div class="header">
                            <p class="heading-M-bold">Home</p>
                            <button class="button-S primary-button create-post-button">Create</button>
                        </div>

                    </div>
                    
                </div>
                <div class="right-section"></div>
            </div>
        </div>
    </div>`)

        const posts = retrievePosts()
        const _posts = new Posts(posts)

        const sidebarUsername = this.container.querySelector('.sidebar-profile-username')
        const sidebarEmail = this.container.querySelector('.sidebar-profile-email')
        const sidebarAvatar = this.container.querySelector('.sidebar-avatar')
        const topbarAvatar = this.container.querySelector('.topbar-avatar')

        renderUser(sidebarUsername, sidebarEmail, sidebarAvatar, topbarAvatar)

        _posts.onPostLikeButton = () => {
            const posts = retrievePosts()

            _posts.refreshPosts(posts)
        }

        _posts.onPostSavedButton = () => {
            const posts = retrievePosts()

            _posts.refreshPosts(posts)
        }

        this.container.querySelector('.feed').append(_posts.container)

    }
}



// this.container.querySelector('.delete').onclick = () => {
//     const _users = users()
    // _users.forEach(_user => _user.likedPosts = [])
    // saveUsersInStorage(_users)

    // _users.length--
    // saveUsersInStorage(_users)
    // const _posts = posts()
    // for(let i = _posts.length - 1; i > -1; i--)
    // _posts.length--
    // savePostsInStorage(_posts)

    // const _users = users()

    // _users.forEach(user => delete user.likedPosts)
    // saveUsersInStorage(_users)

//     const _posts = retrievePosts()
//     _posts.forEach(post => post.date = new Date)

//    savePostsInStorage(_posts)
// }