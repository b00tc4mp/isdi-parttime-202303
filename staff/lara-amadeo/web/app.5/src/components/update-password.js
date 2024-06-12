import { Component } from "../library/master-component.js"
import { updatePassword } from "../logic/updatePassword.js"
import { generateToast, errorToast, successToast, context } from "../ui.js"

export default class UpdatePassword extends Component{
    constructor(){
        super(`
        <div class="update-password">
        
            <div class="centered-containers">
                <h1 class="title">Profile settings</h1>
                <h2 class="subtitle">Password update</h2>
            
                <form class="centered-form">

                    <label for="currentPassword" class="text-field-label">Current password</label>
                    <input type="password" name="currentPassword" class="text-field">

                    <label for="newPassword" class="text-field-label">New password</label>
                    <input type="password" name="newPassword" class="text-field">

                    <label for="confirmNewPassword" class="text-field-label">Confirm new password</label>
                    <input type="password" name="confirmNewPassword" class="text-field">

                    <div class="button-bar">
                    <button class="button-S secondary-button" id="cancel-update-password" type="submit">Cancel</button>
                    <button class="button-S primary-button" id="save-update-password" type="submit">Save</button>
                    </div>
                </form>
            </div>

        </div>`)

        this.container.querySelector('#save-update-password').onclick = event => {
            event.preventDefault()
        
            const currentPassword = this.container.querySelector('input[name=currentPassword]').value
            const newPassword = this.container.querySelector('input[name=newPassword]').value
            const confirmNewPassword = this.container.querySelector('input[name=confirmNewPassword]').value
        
        
            try {
                updatePassword(context.userId, currentPassword, newPassword, confirmNewPassword)
                generateToast({
                    message: 'Your password has been updated!',
                    type: successToast, 
                    length: '3000ms'
                })

                this.SaveUpdatePassword()
            } catch (error) {
                generateToast({
                    message: error.message,
                    type: errorToast, 
                    length: '3000ms'
                })
            } finally {
                this.container.querySelector('input[name=currentPassword]').value = ''
                this.container.querySelector('input[name=newPassword]').value = ''
                this.container.querySelector('input[name=confirmNewPassword]').value = ''
            }
        }

        this.container.querySelector('#cancel-update-password').onclick = event => {
            this.cancelUpdatePassword()
        }
    }

    cancelUpdatePassword(){
        throw new Error ('not overriden')
    }

    SaveUpdatePassword(){
        throw new Error ('not overriden')
    }
}