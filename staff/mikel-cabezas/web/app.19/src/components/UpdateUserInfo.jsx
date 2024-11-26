import { context } from "../ui"
import { findUserById } from "../logic/helpers/dataManagers"
import updateUserName from "../logic/users/updateUserName"
import updateUserEmail from "../logic/users/updateUserEmail"
import uploadImage from "../logic/users/updateUserImage"

export default function UpdateUserInfo() {
    // TODO PREGUNTAR PORQUE NO VA EN EL TRY
    const userId = context.userId
    const user = findUserById(userId)
    const separateUserName = user['name'].split(' ')

    let newImage
    let letters
    if (!context.image && separateUserName.length === 1) {
        letters = separateUserName[0][0] + separateUserName[0][1]
    } else if (!context.image && separateUserName.length > 1) {
        letters = separateUserName[0][0] + separateUserName[1][0]
    }
    function handleConvertImageToBase64(event) {
        const file = event.target
        const imagePostPreview = document.querySelector('.data.user-info .avatar img')
        const imageTarget = document.querySelector('input[type="file"]')
        const printImage = file.onchange = function (event) {
            const file = event.target.files[0]
            const image = new FileReader()
            image.onload = () => {
                const base64 = image.result
                newImage = base64
                imagePostPreview.src = base64
                imageTarget.src = base64
            }
             image.readAsDataURL(file)
             return file
        }
        imagePostPreview.classList.remove('hidden')
    }

    function handleUpdateProfile(event) {
        event.preventDefault()
        try {
            event.target.parentElement.querySelector('[name="name"]').removeAttribute('disabled')
            event.target.parentElement.querySelector('[type="email"]').removeAttribute('disabled')
            event.target.parentElement.querySelector('[type="file"]').removeAttribute('disabled')
            event.target.parentElement.querySelector('.buttons').classList.remove('off')
        } catch(error) {
            console.log(error.message)
        }
    }
    function handleSavelUpdateProfile(event) {
        event.preventDefault()
        try {
            const name = event.target.parentElement.parentElement.querySelector('[name]')
            const email = event.target.parentElement.parentElement.querySelector('[type="email"]')
            const image = event.target.parentElement.parentElement.querySelector('[type="file"]')
            user.name !== name.value && updateUserName(userId, name.value)
            user.email !== email.value && updateUserEmail(userId, email.value)
            user.image !== image && uploadImage(userId, image)

            event.target.parentElement.parentElement.querySelector('[type="file"]').setAttribute('disabled', '')
            event.target.parentElement.parentElement.querySelector('[name]').setAttribute('disabled', '')
            event.target.parentElement.parentElement.querySelector('[type="email"]').setAttribute('disabled', '')
            event.target.parentElement.parentElement.querySelector('.buttons').classList.add('off')

        } catch(error) {
            console.log(error.stack)
        }
    }

    function handleCancelUpdateProfile(event) {
        event.preventDefault()
        try {
            debugger
            event.target.parentElement.parentElement.querySelector('[name="name"]').setAttribute('disabled', '')
            event.target.parentElement.parentElement.querySelector('[type="email"]').setAttribute('disabled', '')
            event.target.parentElement.parentElement.querySelector('[type="file"]').setAttribute('disabled', '')
            event.target.parentElement.parentElement.querySelector('.buttons').classList.add('off')
        } catch(error) {
            console.log(error.stack)
        }
    }

    return <> 
        <div className="container user-account">
            <div className="update update-info" id="update-profile">
                <h2>Update profile</h2>
                <p>Press de pencil icon for edit your name or your email</p>
                <button className="button--update-info__profile" onClick={handleUpdateProfile} >Edit profile <i className="uil uil-pen"></i></button>
                <form className="data user-info">
                    <label htmlFor="">Your name</label>
                    <input type="text" defaultValue={user.name} name="name" disabled />
                    <label htmlFor="">Your email</label>
                    <input type="email" defaultValue={user.email} name="email" disabled />
                    <div className="avatar">
                        <div className="letter">{letters}</div>
                        <img className={!context.image || context.image === 'undefined' && separateUserName.length === 1 ? 'image-profile hidden' : 'image-profile'} src={user.image} alt="" />
                    </div>
                    <label htmlFor="">Update image profile</label>
                    <input type="file" name="file" id="" accept=".jpg, .jpeg, .png, .webp" onClick={handleConvertImageToBase64}  />
                    <div className="buttons off" >
                        <button className="button--update-info__cancel-info" type="cancel" onClick={handleCancelUpdateProfile}>Cancel</button>
                        <button className="button--update-info__save-info" onClick={handleSavelUpdateProfile}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}