import { Component } from 'react'
import updateUserAvatar from '../logic/updateUserAvatar'
import updateUserPassword from '../logic/updateUserPassword'
import { context } from '../ui'

class Profile extends Component {
    constructor(props){
        super(props)

    }

     handleUpdateAvatar = (event) => {
        event.preventDefault()

        const avatarUrl = event.target.avatarUrl.value;

        try {

            updateUserAvatar(context.userId, avatarUrl)
            alert('avatar updated')

        }catch (error){
            alert(error.message)
        }

     }

     handleUpdatePassword = (event) => {
        event.preventDefault()

        const password = event.target.password.value,
        newPassword = event.target.newPassword.value,
        newPasswordConfirm = event.target.newPasswordConfirm.value;

        try {
            
            updateUserPassword(
                context.userId, 
                password, 
                newPassword, 
                newPasswordConfirm
            )

            alert('password updated')

        }catch (error){
            alert(error.message)
        }
     }

     handleHomeClick = (event) => {
        event.preventDefault()
        
        this.props.onHomeClick()
     }
        
        render() {
            return <div className="profile container">
                <h4>Update avatar</h4>
    
                <form className="profile-avatar-form" onSubmit={this.handleUpdateAvatar}>
                    <input className="input" type="url" name="avatarUrl" />
                    <button className="button" type="submit">Update</button>
                </form>
    
                <h4>Update password</h4>
    
                <form className="profile-password-form" onSubmit={this.handleUpdatePassword}>
                    <input className="input" type="password" name="password" placeholder="password" />
                    <input className="input" type="password" name="newPassword" placeholder="new password" />
                    <input className="input" type="password" name="newPasswordConfirm" placeholder="new password confirmation" />
                    <button className="button" type="submit">Update</button>
                </form>

                <p> Go to{' '} <a href="" onClick={this.handleHomeClick}> Home </a> </p>
            </div>
        }
}

export default Profile