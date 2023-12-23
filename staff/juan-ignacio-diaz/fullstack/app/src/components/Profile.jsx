import { useAppContext } from '../hooks'
import Container from '../library/Container'

import { updateUserMode, updateUserAvatar, updateUserPassword } from "../logic"

import './Profile.css'

export default function Profile({ onEditedProfile, user }){
    const { alert, freeze, unfreeze } = useAppContext()

    const handleSwitchMode = () => {
        let mode

        if (user.mode) {
            if (user.mode === 'dark') mode = 'light'
            else mode = 'dark'
        }          
        else mode = 'dark'

        try{
            freeze()
            updateUserMode(mode)
                .then(() => {
                    alert("mode updated")

                    onEditedProfile()
                })
                .catch(error => alert(error.message))
                .finally(() => unfreeze())    
        }
        catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handleEditAvatar = (event) => {
        event.preventDefault()

        const url = event.target.url.value

        try{
            freeze()
            updateUserAvatar (url)
                .then(() => {
                    alert("avatar updated")
                    event.target.reset()
                    onEditedProfile()
                })
                .catch(error => alert(error.message))
                .finally(() => unfreeze())            
        }
        catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    const  handleChangePassword = (event) => {
        event.preventDefault()

        event.target.password.classList.remove("imput-highlight")
        event.target.newPassword.classList.remove("imput-highlight")
        event.target.newPasswordConfirm.classList.remove("imput-highlight")

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        try {
            freeze()
            updateUserPassword(password, newPassword, newPasswordConfirm)
                .then(() => {
                    alert("the password is update")
                    event.target.reset()
                    onEditedProfile()
                })
                .catch(error => alert(error.message))
                .finally(() => unfreeze())  
        }
        catch (error) {
            unfreeze()
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

    console.log('Profile ->render')
    return <>
            <Container tag="section" className="profile">
                <article>
                    <button className="button" onClick={handleSwitchMode}>Switch Mode</button>
                </article>
                <article>
                    <h2>Update avatar</h2>

                    <form className="profile-avatar-form" onSubmit={handleEditAvatar}>
                        <input className="input" type="url" name="url"/>
                        <button className="button" type="submit">Update</button>
                    </form>
                </article>
                <article>
                    <h2>Update password</h2>

                    <form className="profile-password-form" onSubmit={handleChangePassword}>
                        <input className="input" type="password" name="password" placeholder="password"/>
                        <input className="input" type="password" name="newPassword" placeholder="new password"/>
                        <input className="input" type="password" name="newPasswordConfirm" placeholder="new password confirmation"/>
                        <button className="button" type="submit">Update</button>
                    </form>
                </article>
            </Container>
        </>
}