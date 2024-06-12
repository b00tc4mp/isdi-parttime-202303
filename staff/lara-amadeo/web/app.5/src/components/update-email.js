import { Component } from "../library/master-component.js"
import { context, generateToast, errorToast, successToast } from "../ui.js"
import { updateEmail } from "../logic/updateEmail.js"
import { findUserbyId } from "../logic/helpers/data-managers.js"

export default class UpdateEmail extends Component {
    constructor(){
        super(`
        <div class="update-mail">

            <div class="centered-containers">
                <h1 class="title">Profile settings</h1>
                <h2 class="subtitle">Email update</h2>
            
                <form class="centered-form">

                    <label for="currentEmail" class="text-field-label">Current email</label>
                    <input type="text" name="currentEmail" class="text-field">

                    <label for="newEmail" class="text-field-label">New email</label>
                    <input type="text" name="newEmail" class="text-field">

                    <label for="confirmNewEmail" class="text-field-label">Confirm new email</label>
                    <input type="text" name="confirmNewEmail" class="text-field">

                    
                    <div class="button-bar">
                    <button class="button-S secondary-button" id="cancel-update-email" type="submit">Cancel</button>
                    <button class="button-S primary-button" id="save-update-email" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>`
        )

        this.container.querySelector('#save-update-email').onclick = event => {
            event.preventDefault()
        
            const currentEmail = this.container.querySelector('input[name=currentEmail]').value
            const newEmail = this.container.querySelector('input[name=newEmail]').value
            const confirmNewEmail = this.container.querySelector('input[name=confirmNewEmail]').value
        
            const user = findUserbyId(context.userId)
        
            try {
                updateEmail(user.email, currentEmail, newEmail, confirmNewEmail)
                generateToast({
                    message: 'Your email has been updated!',
                    type: successToast, 
                    length: '3000ms'
                })

                this.saveUpdateEmail()
                // renderUser()
            } catch (error) {
                generateToast({
                    message: error.message,
                    type: errorToast, 
                    length: '3000ms'
                })
            } finally {
                this.container.querySelector('input[name=currentEmail]').value = ''
                this.container.querySelector('input[name=newEmail]').value = ''
                this.container.querySelector('input[name=confirmNewEmail]').value = ''
        
            }
        }

        this.container.querySelector('#cancel-update-email').onclick = event => {
            event.preventDefault()
            
            this.cancelUpdateEmail()
        }
    }

    cancelUpdateEmail(){
        throw new Error ('not overriden')
    }

    saveUpdateEmail() {
        throw new Error ('not overriden')
    }
}