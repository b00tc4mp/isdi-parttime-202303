import { updateUserPassword, updateUserAvatar } from "../../logic"
import { ModalContainer, Input, Button, Form } from "../library"
import { useAppContext } from "../hooks"

export default function Profile({ onCancel, onUpdatedAvatar }) {
  const { alert } = useAppContext()

  const closeProfile = () => {
    onCancel()
  }

  const handleChangeAvatar = (event) => {
    event.preventDefault()

    const avatarUrl = event.target.avatarUrl.value
    const password = event.target.password.value

    try {
      // freeze()

      updateUserAvatar(avatarUrl, password)
        .then(() => {
          // unfreeze()

          alert('Avatar changed successfully.')
          onUpdatedAvatar()
          closeProfile()
        })
        .catch(error => {
          // unfreeze()

          alert(error.message, 'error')
          console.log(error.stack)
        })

    } catch (error) {
      // unfreeze()

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
  
  return <ModalContainer tag='section' >
    <div className="absolute top-36 z-20 flex flex-col items-center gap-6">
      <Form className='bg-transparent wx-44 sm:w-96' onSubmit={handleChangeAvatar}>
          <h2 className="font-bold">Update avatar</h2>
          <div className="flex flex-col gap-2">
              <Input type="url" name="avatarUrl" placeholder="avatar url"/>
              <Input type="password" name="password" placeholder="password"/>
              <Button>Update</Button>
          </div>
      </Form>
      <Form className='bg-transparent wx-44 sm:w-96' onSubmit={handleChangePassword}>
          <h2 className="font-bold">Update password</h2>
          <div className="flex flex-col gap-2">
              <Input type="password" name="password" placeholder="password"/>
              <Input type="password" name="newPassword" placeholder="new password"/>
              <Input type="password" name="newPasswordConfirm" placeholder="new password confirmation"/>
              <Button>Update</Button>
          </div>
      </Form>
      <Button className="bg-red-400 hover:bg-red-500 w-28" onClick={closeProfile}>Close</Button>
    </div>
    <div className="w-full h-full absolute top-0 z-10 bg-slate-100"></div>
</ModalContainer>
  
}
