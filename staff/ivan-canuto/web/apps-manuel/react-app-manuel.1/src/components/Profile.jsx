import { context } from "../ui";
import updateUserPassword from "../logic/updateUserPassword";
import updateUserAvatar from "../logic/updateUserAvatar";

export default function Profile(props) {

  const closeProfile = () => {
    props.onCloseModal()
  }

  const handleChangeAvatar = (event) => {
    event.preventDefault()

    const avatarUrl = event.target.avatarUrl.value
    const password = event.target.password.value

    try {
      updateUserAvatar(context.userId, avatarUrl, password)
      onUpdatedAvatar()

    } catch (error) {
      alert(error.message)
      console.log(error);
    }
  }

  const handleChangePassword = (event) => {
    event.preventDefault()

    const password = event.target.password.value
    const newPassword = event.target.newPassword.value
    const newPasswordConfirm = event.target.newPasswordConfirm.value

    try {
      updateUserPassword(context.userId, password, newPassword, newPasswordConfirm)
      closeProfile()

    } catch (error) {
      alert(error.message)
      console.log(error);
    }
  }
  
  return <div className="profile page">
  <form className="change-avatar change-form" onSubmit={handleChangeAvatar}>
        <h2>Update avatar</h2>
        <div>
            <input className="input" type="url" name="avatarUrl" placeholder="avatar url"/>
            <input className="input" type="password" name="password" placeholder="password"/>
            <button className="button">Update</button>
        </div>
    </form>
    <form className="change-password change-form" onSubmit={handleChangePassword}>
        <h2>Update password</h2>
        <div>
            <input className="input" type="password" name="password" placeholder="password"/>
            <input className="input" type="password" name="newPassword" placeholder="new password"/>
            <input className="input" type="password" name="newPasswordConfirm" placeholder="new password confirmation"/>
            <button className="button">Update</button>
        </div>
    </form>
    <button className="close-changeform-button" onClick={closeProfile}>Close</button>
</div>
  
}
