import { useContext } from 'react'

import { context } from '../ui' 
import Context from '../Context'

import updateUserMode from "../logic/updateUserMode"
import updateUserAvatar from "../logic/updateUserAvatar"
import updateUserPassword from "../logic/updateUserPassword"

import './Profile.css'

export default function Profile({ onEditedProfile, user }){
    const { alert } = useContext(Context)

    const handleSwitchMode = () => {

        let mode

        if (user.mode ) {
    console.log(user.mode)
            if (user.mode === 'dark') {
                mode = 'light'
                document.querySelector(':root').classList.remove('dark')
            }
            else {
                mode = 'dark'
                document.querySelector(':root').classList.add('dark')
            }
    console.log(user.mode)  
        }          
        else {
            mode = 'dark'
            document.querySelector(':root').classList.add('dark')
        }

        try{
            updateUserMode(context.userId, mode, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                alert("mode updated")
                onEditedProfile()
            })
        }
        catch(error) {
            alert(error.message)
        }
        document.querySelector(':root').classList.toggle('dark')
    }

    const handleEditAvatar = (event) => {
        event.preventDefault()

        const url = event.target.url.value

        try{
            updateUserAvatar (context.userId, url, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                alert("avatar updated")
                event.target.reset()
                onEditedProfile()
            })
        }
        catch(error) {
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
            updateUserPassword(context.userId, password, newPassword, newPasswordConfirm, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                alert("the password is update")
                event.target.reset()
                onEditedProfile()
            })
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

    console.log('Profile ->render')
    return <>
            <section className="profile container">
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
            </section>
        </>
}