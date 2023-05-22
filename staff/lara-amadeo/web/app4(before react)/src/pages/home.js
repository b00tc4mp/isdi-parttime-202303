import { Posts } from "../components/posts.js"
import { Component } from "../library/master-component.js"
import retrievePosts from "../logic/retrievePosts.js"
import { renderUser } from "../logic/renderUser.js"
import { context } from "../ui.js"
import { Settings } from "./settings.js"
import { retrieveUser } from "../logic/helpers/data-managers.js"

export class Home extends Component {
    constructor() {
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
                <div class="middle-section"></div>
                <div class="right-section"></div>
            </div>
        </div>
    </div>`)

        try{
            const user = retrieveUser(context.userId)
            
            this.container.querySelector('.sidebar-profile-username').innerHTML = user.username
            this.container.querySelector('.sidebar-profile-email').innerHTML = user.email
            this.container.querySelector('.sidebar-avatar').innerHTML = user.avatar
            this.container.querySelector('.topbar-avatar').innerHTML = user.avatar
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast,
            })
        }
    
        const posts = new Posts

        this.container.querySelector('.middle-section').append(posts.container)

        let settings

        this.container.querySelector('.sidebar-settings').onclick = () => {
            settings = new Settings

            this.container.querySelector('.feed').remove(posts.container)
            this.container.querySelector('.middle-section').append(settings.container)
            settings.onLogOutLink = () => this.onLogOutLink()
        }

    }

    onLogOutLink() {
        throw new Error('not overriden')
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