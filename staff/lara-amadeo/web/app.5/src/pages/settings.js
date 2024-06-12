import { Component } from "../library/master-component.js"
import SettingsMenu from "../components/settings-menu.js"
import UpdatePassword from "../components/update-password.js"
import UpdateEmail from "../components/update-email.js"
import UpdateAvatar from "../components/update-avatar.js"

export class Settings extends Component{
    constructor(){
        super(`<div class="settings">
        <div class="header">
            <p class="heading-M-bold">Settings</p>
        </div>
        <div class="centered-content-container"></div>`)

        const settingsMenu = new SettingsMenu
        const updatePassword = new UpdatePassword
        const updateEmail = new UpdateEmail
        const updateAvatar = new UpdateAvatar

        const centeredContainer = this.container.querySelector('.centered-content-container')

        centeredContainer.append(settingsMenu.container)

        settingsMenu.onUpdatePasswordRow = () => {
            centeredContainer.removeChild(settingsMenu.container)
            centeredContainer.appendChild(updatePassword.container)
        }

        settingsMenu.onUpdateEmailRow = () => {
            centeredContainer.removeChild(settingsMenu.container)
            centeredContainer.appendChild(updateEmail.container)
        }

        settingsMenu.onUpdateAvatarRow = () => {
            centeredContainer.removeChild(settingsMenu.container)
            centeredContainer.appendChild(updateAvatar.container)
        }

        settingsMenu.onLogoutLink = () => this.onLogOutLink()

        updatePassword.cancelUpdatePassword = () => {
            centeredContainer.removeChild(updatePassword.container)
            centeredContainer.appendChild(settingsMenu.container)
        }

        updatePassword.SaveUpdatePassword = () => {
            centeredContainer.removeChild(updatePassword.container)
            centeredContainer.appendChild(settingsMenu.container)
        }

        updateEmail.cancelUpdateEmail = () => {
            centeredContainer.removeChild(updateEmail.container)
            centeredContainer.appendChild(settingsMenu.container)
        }

        updateEmail.saveUpdateEmail = () => {
            centeredContainer.removeChild(updateEmail.container)
            centeredContainer.appendChild(settingsMenu.container)
        }

        updateAvatar.cancelUpdateAvatar = () => {
            centeredContainer.removeChild(updateAvatar.container)
            centeredContainer.appendChild(settingsMenu.container)
        }

        updateAvatar.saveUpdateAvatar = () => {
            centeredContainer.removeChild(updateAvatar.container)
            centeredContainer.appendChild(settingsMenu.container)
        }
    }

    onLogOutLink(){
        throw new Error ('not overriden')
    }
}