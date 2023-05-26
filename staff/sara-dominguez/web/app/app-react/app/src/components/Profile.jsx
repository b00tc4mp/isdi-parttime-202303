// import { Component } from 'react'

// export default class Profile  extends Component {
//     constructor(props) {
//         super(props)

//         this.state = { view: 'profile'}
//     }

//     render() {
//         console.debug('render profile')
    
//     return <div className="profile-edit">
//         <div>
//             <h3><a href="" className="updateAvatar">Update Avatar</a></h3>
//             <form className="profile-edit-avatar-form off">
//                 <input className="input" type="url" name="avatarUrl" placeholder="insert url" />
//                 <button className="button" type="submit">Uptate</button>
//             </form> 

//             <h3><a href="" className="updatePassword">Update password</a></h3>
//             <div className="profile-edit-password">
//                 <form className="profile-edit-password-form off">
//                     <input type="text" name="password" placeholder="Enter your   password" />
//                     <input type="text" name="newPassword" placeholder="Enter new password" />
//                     <input type="text"  name="confirmNewPassword" placeholder="Confirm new  password" />
//                     <button   className="profile-edit-password-form-button"     type='submit'>Confirm</button>
//                 </form>
//             </div>
//         </div>
//     </div>
//     }
// }


import { context } from "../ui"
import {updateUserAvatar} from "../logic/updateUserAvatar"

export default function Profile ({onUserAvatarUpdated}) {
    console.debug('profile->render')

    const handleUpdateAvatar = (event) => {
        event.preventDefault()

        const avatarUrl= event.target.avatarUrl.value

        try {
            updateUserAvatar(context.userId, avatarUrl, error => {
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

    return  <div className="profile-edit">
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
    </div>
}