import { context } from "../ui.js"
import { logOut } from "../logic/helpers/logout.js"
import { pushUserDataToHeader } from "./helpers/push-user-to-header.js"
import { pushUserDataInForm } from "./helpers/push-user-data-in-form.js"
import { Component } from "react"


export default class Header extends Component {

constructor(props) {
    super(props)
}

    handleHome = () => {
        try {
            props.onHomeClick
        } catch (error) {
            console.log(message.error)
        }
    }

    handleLogout = () => {
        try {
            delete context.userId
            this.props.onLoggedOut()
            document.body.classList.remove('logged-in')
        } catch (error) {
            console.log(error.stack)
        }
    }
    handleUserProfile = () => {
        try {
            this.props.onUserProfile()
        } catch (error) {
            console.log(error.message)
        }
    }
    renderUser = () => {
        try {
            const userId = context.userId
            if(userId) {
                document.body.classList.add('logged-in')
              }
            if(userId && document.body.classList.contains('logged-in'))
                pushUserDataToHeader(userId)
        } catch (error) {
            console.log(error.message)
        }
    }
    render() {
        return <header onLoad={this.renderUser}>
        <div className="header-wrapper">
            
            <div className="logo">
                <img src="/logo.svg" alt="Ikea Hacks" />
            </div>
            <nav className="menu">
                <ul>
                    <li className="login has-submenu">Login
                        <ul className="submenu">
                            <li className="submenu-element register">Register</li>
                            <li className="submenu-element login">Login</li>
                        </ul>
                    </li>
                    <li className="homepage" onClick={this.handleHome}>Homepage</li>
                    <li className="user-account">
                        <div className="avatar">
                            <div className="letter"></div>
                            <img className="image-profile hidden" src="" alt="" />
                        </div>
                        <div className="user-name">Account settings</div>
                        <ul className="submenu user-options">
                            <li>User settings</li>
                            <li onClick={this.handleUserProfile}>User profile</li>
                        </ul>
                    </li>
                    <li className="logout" onClick={this.handleLogout}>Logout</li>
                </ul>
            </nav>
        </div>
    </header>
    }
}




// menuHeader.querySelector('.submenu-element.login').onclick = function(event) {
//     event.preventDefault()
//     toggleOffClassInSection(registerPage, loginPage)
// }
// menuHeader.querySelector('.submenu-element.register').onclick = function(event) {
//     event.preventDefault()
//     toggleOffClassInSection(registerPage, loginPage)
// }
// menuHeader.querySelector('.user-account').onclick = function(event) {
//     event.preventDefault()
//     toggleOffClassInSection(homePage, userAccount)
//     pushUserDataToHeader(userId)
//     pushUserDataInForm(userId)
// }
// menuHeader.querySelector('.logout').onclick = function(event) {
//     event.preventDefault()
//     deleteClassOnContainer(bodyPage, 'logged-in')
//     deleteClassOnContainer(loginPage, 'off')
//     addClassOnContainer(registerPage, 'off')
//     addClassOnContainer(homePage, 'off')
//     logOut()
// }
// menuHeader.querySelector('.homepage').onclick = function(event) {
//     event.preventDefault()
//     if(document.querySelector('body').classList.contains('logged-in')) {
//         deleteClassOnContainer(homePage, 'off')
//         addClassOnContainer(loginPage, 'off')
//         addClassOnContainer(registerPage, 'off')
//         addClassOnContainer(userAccount, 'off')
//         addClassOnContainer(editPostForm, 'off')
//     }
// }
// header.querySelector('.logo').onclick = function(event) {
//     event.preventDefault()
//     if(document.querySelector('body').classList.contains('logged-in')) {
//         deleteClassOnContainer(homePage, 'off')
//         addClassOnContainer(loginPage, 'off')
//         addClassOnContainer(registerPage, 'off')
//         addClassOnContainer(userAccount, 'off')
//         addClassOnContainer(editPostForm, 'off')
//     }
// }