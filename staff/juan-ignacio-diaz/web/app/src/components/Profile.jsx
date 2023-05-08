import { context } from '../ui' 

import updateUserAvatar from "../logic/updateUserAvatar"
import updateUserPassword from "../logic/updateUserPassword"

export default function Profile({onEditedProfile, onMenssageAlert}){
    console.log('Profile ->render')

    function handleEditAvatar(event) {
        event.preventDefault()

        const url = event.target.url.value

        try{
            updateUserAvatar (context.userId, url)

            alert("avatar updated")

            event.target.reset()
            onEditedProfile()
        }
        catch(error) {
            onMenssageAlert(error.message)
        }
    }

    function handleChangePassword(event) {
        event.preventDefault()

        event.target.password.classList.remove("imput-highlight")
        event.target.newPassword.classList.remove("imput-highlight")
        event.target.newPasswordConfirm.classList.remove("imput-highlight")

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        try {
            updateUserPassword(context.userId, password, newPassword, newPasswordConfirm)
            
            alert("the password is update")

            event.target.reset()

            onEditedProfile()
        }
        catch (error) {
            alert(error.message)

            if (error.cause === "password") {
                event.target.newPassword.focus()
                event.target.password.classList.add("imput-highlight")
                event.target.newPassword.classList.add("imput-highlight")
            }
            else if (error.cause === "newPassword") { 
                event.target.newPassword.focus()
                event.target.newPassword.classList.add("imput-highlight")
            }
            else if (error.cause === "newPasswordConfirm") { 
                event.target.newPasswordConfirm.focus()
                event.target.newPasswordConfirm.classList.add("imput-highlight")
            }
        }
    }


    return <section className="profile container">
    <h2>Update avatar</h2>

    <form className="profile-avatar-form" onSubmit={handleEditAvatar}>
        <input className="input" type="url" name="url"/>
        <button className="button" type="submit">Update</button>
    </form>

    <h2>Update password</h2>

    <form className="profile-password-form" onSubmit={handleChangePassword}>
        <input className="input" type="password" name="password" placeholder="password"/>
        <input className="input" type="password" name="newPassword" placeholder="new password"/>
        <input className="input" type="password" name="newPasswordConfirm" placeholder="new password confirmation"/>
        <button className="button" type="submit">Update</button>
    </form>
</section>
}