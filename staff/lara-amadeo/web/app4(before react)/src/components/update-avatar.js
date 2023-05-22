import { Component } from "../library/master-component.js"
import { updateAvatar } from "../logic/updateAvatar.js"
import { context, generateToast, errorToast, successToast } from "../ui.js"
import { getImageFromLocal } from "../logic/getImageFromLocal.js"
import { retrieveUser } from "../logic/helpers/data-managers.js"

export default class UpdateAvatar extends Component {
    constructor(){
        super(`
            <div class="update-avatar">
            
            <div class="centered-containers">
                <h1 class="title">Profile settings</h1>
                <h2 class="subtitle">Avatar update</h2>
            
                <form class="centered-form">

                    <p class="body-text">Select an image for your avatar
                    </p>

                    <input type="file" name="avatar">
                    <div class="update-avatar-image-preview-container">
                    <img src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" class="update-avatar-image-preview">
                    </div>

                    <div class="button-bar">
                    <button class="button-S secondary-button" id="cancel-update-avatar" type="submit">Cancel</button>
                    <button class="button-S primary-button" id="save-update-avatar" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>`
        )

        this.container.querySelector('input[name=avatar]').onchange = event => {

            event.preventDefault()
            const uploadedFile = event.target.files[0]
            const imagePreview = this.container.querySelector('.update-avatar-image-preview')
            try {
                getImageFromLocal(uploadedFile, imageUrl => {
                    const srcData = imageUrl
                    imagePreview.src = srcData
                })
            } catch (error) {
                generateToast({
                    message: error.message,
                    type: errorToast, 
                    length: '3000ms'
                })
            }
        }

        this.container.querySelector('#save-update-avatar').onclick = event => {
            event.preventDefault()
        
            const localImage = this.container.querySelector('.update-avatar-image-preview').src
            const user = retrieveUser(context.userId)
        
            try {
        
                const image = updateAvatar(context.userId, localImage)
                // this.container.querySelector('.sidebar-avatar').src = image
                context.userAvatar = image
                user.avatar = image
                // showPosts()
                generateToast({
                    message: 'Avatar updated!',
                    type: successToast, 
                    length: '3000ms'
                })

                this.saveUpdateAvatar()
            } catch (error) {
                generateToast({
                    message: error.message,
                    type: errorToast, 
                    length: '3000ms'
                })
            }
        }

        this.container.querySelector('#cancel-update-avatar').onclick = event => {
            event.preventDefault()

            this.cancelUpdateAvatar()
        }
    }

    cancelUpdateAvatar(){
        throw new Error ('not overriden')
    }

    saveUpdateAvatar() {
        throw new Error ('not overriden')
    }
}