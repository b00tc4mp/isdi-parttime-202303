import { context } from "../ui"
import {updateUserAvatar} from "../logic/updateUserAvatar"
import { useContext } from 'react'
import Context from '../components/Context.js'
import Container from '../library/Container.jsx'

export default function Profile ({onUserAvatarUpdated}) {
    console.debug('profile->render')
    
    const { alert, freeze, unfreeze } = useContext(Context)
    
    const handleUpdateAvatar = (event) => {
        event.preventDefault()

        const avatarUrl= event.target.avatarUrl.value

        try {
            freeze()
            updateUserAvatar(context.userId, avatarUrl, error => {
                unfreeze()
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

    return  <Container className="profile-edit">
        <div>
            <h3><a href="" className="updateAvatar">Update Avatar</a></h3>
            <form className="profile-edit-avatar-form" onSubmit={handleUpdateAvatar}>
                <input className="input" type="url" name="avatarUrl" placeholder="insert url" />
                <button className="button" type="submit">Uptate</button>
            </form> 

            <h3><a href="" className="updatePassword">Update password</a></h3>
            <div className="profile-edit-password">
                <form className="profile-edit-password-form">
                    <input type="text" name="password" placeholder="Enter your password" />
                    <input type="text" name="newPassword" placeholder="Enter new password" />
                    <input type="text"  name="confirmNewPassword" placeholder="Confirm new  password" />
                    <button   className="profile-edit-password-form-button"     type='submit'>Confirm</button>
                </form>
            </div>
        </div>
    </Container>
}