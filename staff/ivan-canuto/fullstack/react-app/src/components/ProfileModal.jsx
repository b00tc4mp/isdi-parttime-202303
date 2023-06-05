import { context } from "../ui"
import updateUserPassword from "../logic/updateUserPassword"
import updateUserAvatar from "../logic/updateUserAvatar"
import './components-styles/ProfileModal.css'
import Context from "../Context"
import { useContext } from "react"
import ModalContainer from "../library/ModalContainer"
import Input from "../library/Input"
import Button from "../library/Button"
import Form from "../library/Form"

export default function Profile({ onCancel, onUpdatedAvatar}) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const closeProfile = () => {
    onCancel()
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
      unfreeze()
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
      unfreeze()
      alert(error.message, 'error')
      console.debug(error.stack);
    }
  }
  
  return <ModalContainer tag='section' onClick={(event) => {
    if(event.target === document.querySelector('.ModalContainer'))
      onCancel()
    }}>
    <Form className="change-avatar change-form" onSubmit={handleChangeAvatar}>
        <h2>Update avatar</h2>
        <div>
            <Input type="url" name="avatarUrl" placeholder="avatar url"/>
            <Input type="password" name="password" placeholder="password"/>
            <Button>Update</Button>
        </div>
    </Form>
    <Form className="change-password change-form" onSubmit={handleChangePassword}>
        <h2>Update password</h2>
        <div>
            <Input type="password" name="password" placeholder="password"/>
            <Input type="password" name="newPassword" placeholder="new password"/>
            <Input type="password" name="newPasswordConfirm" placeholder="new password confirmation"/>
            <Button>Update</Button>
        </div>
    </Form>
    <Button className="bg-red-400 hover:bg-red-500" onClick={closeProfile}>Close</Button>
</ModalContainer>
  
}
