import { useAppContext } from '../hooks';
import updateUserAvatar from '../logic/updateUserAvatar';
import updateUserPassword from '../logic/updateUserPassword';
import { context } from '../ui';

const ProfileUpdateModal = ({onUserAvatarUpdated, onUserPasswordUpdated}) => {
  const { alert } = useAppContext()

  const handleUpdateAvatar = (event) => {
    event.preventDefault()

    const avatarUrl = event.target.avatarUrl.value;

    try {
      updateUserAvatar(context.token, avatarUrl, (error) => {
        if (error) {
          alert(error.message)

          return
      }

      onUserAvatarUpdated()
      alert('avatar updated')
      })

    }catch (error){
        alert(error.message)
    }
  },

  handleUpdatePassword = (event) => {
    event.preventDefault()

    const password = event.target.password.value,
    newPassword = event.target.newPassword.value,
    newPasswordConfirm = event.target.newPasswordConfirm.value;

    try {
      updateUserPassword(
          context.token, 
          password, 
          newPassword, 
          newPasswordConfirm, (error) => {
            if (error) {
              alert(error.message)

              return
            }
            
          onUserPasswordUpdated()
          alert('password updated')
          })

      }catch (error){
          alert(error.message)
      }
    };

  return <div className="profile-update-options">
  <h4>Update avatar</h4>
  <form className="profile-avatar-form" onSubmit={handleUpdateAvatar}>
    <input className="input" type="url" name="avatarUrl" placeholder="Enter avatar URL" />
    <button className="button" type="submit">Update</button>
  </form>

  <h4>Update password</h4>
  <form className="profile-password-form" onSubmit={handleUpdatePassword}>
    <input className="input" type="password" name="password" placeholder="Current password" />
    <input className="input" type="password" name="newPassword" placeholder="New password" />
    <input className="input" type="password" name="newPasswordConfirm" placeholder="Confirm new password" />
    <button className="button" type="submit">Update</button>
  </form>

  </div>
}

export default ProfileUpdateModal