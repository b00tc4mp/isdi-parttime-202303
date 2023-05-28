import updateUserAvatar from "../logic/updateUserAvatar"
import updateUserPassword from "../logic/updateUserPassword"
import { context } from "../ui"
import './Profile.css'



export default function Profile({ onUserAvatarUpdated }) {

    const handleUpdateAvatar = event => {
        event.preventDefault()

        const url = event.target.url.value

        try {
            updateUserAvatar(context.userId, url)

            onUserAvatarUpdated()
        } catch (error) {
            alert(error.message)
        }
    }

    function handleUpdatePassword(event){
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        try {
            updateUserPassword(context.userId, password, newPassword,newPasswordConfirm)
            alert('Password succesfully updated')
            props.onUpdatedUserPassword()

        } catch (error) {
            alert(error.message)
        } 

    }



    console.log('Profile -> render')

    return <section className='page'>
    <div className="profile-container">
    <h1 className= 'title'>Update avatar</h1>
    <form className='profile-avatar-form'  onSubmit={handleUpdateAvatar}>
        <input className='input' type='url' name='url'/>
        <button className='button update' type='submit'>Update</button>
    </form>

    <h1 className='title'>Update password</h1>
    
    <form className='profile-password-form' onSubmit={handleUpdatePassword}>
        <input className='input' type='password' name='password' placeholder='Old password*'/>
        <input className='input' type='password' name='newPassword' placeholder='New password*'/>
        <input className="input" type="password" name='newPasswordConfirm' placeholder='Confirm new password*'/>
        <button className='button update' type='submit'>Update</button>

    </form>
    </div>
</section>
}