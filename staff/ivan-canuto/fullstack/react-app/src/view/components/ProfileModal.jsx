import updateUserPassword from "../../logic/updateUserPassword"
import updateUserAvatar from "../../logic/updateUserAvatar"
import ModalContainer from "../library/ModalContainer"
import Input from "../library/Input"
import Button from "../library/Button"
import Form from "../library/Form"
import { useAppContext } from "../hooks"

export default function Profile({ onCancel, onUpdatedAvatar}) {
  const { alert, freeze, unfreeze } = useAppContext()

  const closeProfile = () => {
    onCancel()
  }
  
  const handleChangeAvatar = (event) => {
    event.preventDefault()

    const avatarUrl = event.target.avatarUrl.value
    const password = event.target.password.value

    try {
      freeze()

      updateUserAvatar(avatarUrl, password)
        .then(() => {
          unfreeze()

          alert('Avatar changed successfully.')
          onUpdatedAvatar()
          closeProfile()
        })
        .catch(error => {
          unfreeze()

          alert(error.message, 'error')
          console.log(error.stack)
        })

    } catch (error) {
      unfreeze()

      console.log(error.message)
      alert(error.message, 'error')
    }
  }

  const handleChangePassword = (event) => {
    event.preventDefault()

    const password = event.target.password.value
    const newPassword = event.target.newPassword.value
    const newPasswordConfirm = event.target.newPasswordConfirm.value

    try {
      updateUserPassword(password, newPassword, newPasswordConfirm)
        .then(() => {
          alert('Password changed successfully.')
          closeProfile()
        })
        .catch(error => {
          alert(error.message, 'error')
          console.log(error.stack)
        })

    } catch (error) {
      alert(error.message, 'error')
      console.log(error.stack)
    }
  }
  
  return <ModalContainer className='gap-3' tag='section' onClick={(event) => {
    if(event.target === document.querySelector('.ModalContainer'))
      onCancel()
    }}>
    <Form className='bg-white w-80 sm:w-96' onSubmit={handleChangeAvatar}>
        <h2>Update avatar</h2>
        <div className="flex flex-col gap-2 py-5">
            <Input type="url" name="avatarUrl" placeholder="avatar url"/>
            <Input type="password" name="password" placeholder="password"/>
            <Button>Update</Button>
        </div>
    </Form>
    <Form className='bg-white w-80 sm:w-96' onSubmit={handleChangePassword}>
        <h2>Update password</h2>
        <div className="flex flex-col gap-2 py-5">
            <Input type="password" name="password" placeholder="password"/>
            <Input type="password" name="newPassword" placeholder="new password"/>
            <Input type="password" name="newPasswordConfirm" placeholder="new password confirmation"/>
            <Button>Update</Button>
        </div>
    </Form>
    <Button className="bg-red-400 hover:bg-red-500 w-28" onClick={closeProfile}>Close</Button>
</ModalContainer>
  
}
