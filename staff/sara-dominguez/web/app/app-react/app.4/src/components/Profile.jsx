// import { Component } from 'react'

// export default class Profile  extends Component {
//     constructor(props) {
//         super(props)

//         this.state = { view: 'profile'}
//     }

//     render() {
//         console.log('render profile')
    
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




export default function Profile () {

    return  <div className="profile-edit">
        <div>
            <h3><a href="" className="updateAvatar">Update Avatar</a></h3>
            <form className="profile-edit-avatar-form">
                <input className="input" type="url" name="avatarUrl" placeholder="insert url" />
                <button className="button" type="submit">Uptate</button>
            </form> 

            <h3><a href="" className="updatePassword">Update password</a></h3>
            <div className="profile-edit-password">
                <form className="profile-edit-password-form">
                    <input type="text" name="password" placeholder="Enter your   password" />
                    <input type="text" name="newPassword" placeholder="Enter new password" />
                    <input type="text"  name="confirmNewPassword" placeholder="Confirm new  password" />
                    <button   className="profile-edit-password-form-button"     type='submit'>Confirm</button>
                </form>
            </div>
        </div>
    </div>
}