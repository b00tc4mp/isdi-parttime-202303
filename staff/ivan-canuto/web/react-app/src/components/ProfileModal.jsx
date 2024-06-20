import { context } from "../ui"
import updateUserPassword from "../logic/updateUserPassword"
import updateUserAvatar from "../logic/updateUserAvatar"
import './components-styles/ProfileModal.css'
import Context from "../Context"
import { useContext } from "react"
import Container from "../library/Container"


export default function Profile(props) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const closeProfile = () => {
    props.onCloseModal()
  }

  const handleChangeAvatar = (event) => {
    event.preventDefault()

    const avatarUrl = event.target.avatarUrl.value
    const password = event.target.password.value

    try {
      freeze()

      updateUserAvatar(context.userId, avatarUrl, password, (error) => {
        unfreeze()

        if(error) {
          alert(error.message, 'error')
          console.debug(error.stack);
          return
        }
        
        onUpdatedAvatar()
      })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack);
    }
  }

  const handleChangePassword = (event) => {
    event.preventDefault()

    const password = event.target.password.value
    const newPassword = event.target.newPassword.value
    const newPasswordConfirm = event.target.newPasswordConfirm.value

    try {
      freeze()

      updateUserPassword(context.userId, password, newPassword, newPasswordConfirm, (error) => {
        unfreeze()

        if(error) {
          alert(error.message, 'error')
          console.debug(error.stack);
          return
        }
        
        closeProfile()
      })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack);
    }
  }
  
  return <Container tag='section'>
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
</Container>
  
}
