import { Component } from "../library/master-component.js"
import { context } from "../ui.js"

export default class SettingsMenu extends Component{
        constructor(){
            super(`
        <div class="profile-navigation-container">
            <div class="navigation-row nav-row-email">
                <a>Update email</a>
                <div class="icon-m-container"><span class="material-symbols-rounded icon-m">chevron_right</span></div>                       
            </div>

            <div class="navigation-row nav-row-password">
                <a>Update password</a>
                <div class="icon-m-container"><span class="material-symbols-rounded icon-m">chevron_right</span></div>
            </div>

            <div class="navigation-row nav-row-avatar">
                <a>Update avatar</a>
                <div class="icon-m-container"><span class="material-symbols-rounded icon-m">chevron_right</span></div>                      
            </div>
            <a class="link logout-link" id="logout">Log out</a>
        </div>`
        )

        this.container.querySelector('.nav-row-password').onclick = () => {

            this.onUpdatePasswordRow()
        }

        this.container.querySelector('.nav-row-email').onclick = () => {

            this.onUpdateEmailRow()
        }

        this.container.querySelector('.nav-row-avatar').onclick = () => {

            this.onUpdateAvatarRow()
        }

        this.container.querySelector('.logout-link').onclick = () => {
            delete context.userId

            this.onLogoutLink()
        }
    }

    onUpdatePasswordRow() {
        throw new Error ('not overriden')
    }

    onUpdateEmailRow() {
        throw new Error ('not overriden')
    }

    onUpdateAvatarRow() {
        throw new Error ('not overriden')
    }

    onLogoutLink(){
        throw new Error ('not overriden')
    }
}