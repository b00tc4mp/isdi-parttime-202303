import './Profile.css'
import { context } from '../ui'
import updateUserAvatar from '../logic/updateUserAvatar'

export default function Profile({ onUserAvatarUpdated }) {
    const handleUpdateAvatar = event => {
        event.preventDefault()

        const url = event.target.url.value

        try {
            updateUserAvatar(context.userId, url, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                
                onUserAvatarUpdated()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Profile -> render')

    return <section className="profile container">
        <h2>Update avatar</h2>

        <form className="profile-avatar-form" onSubmit={handleUpdateAvatar}>
            <input className="input" type="url" name="url" />
            <button className="button" type="submit">Update</button>
        </form>

        <h2>Update password</h2>

        <form className="profile-password-form">
            <input className="input" type="password" name="password" placeholder="password" />
            <input className="input" type="password" name="newPassword" placeholder="new password" />
            <input className="input" type="password" name="newPasswordConfirm" placeholder="new password confirmation" />
            <button className="button" type="submit">Update</button>
        </form>
    </section>
}