import { updateUserPassword, updateUserAvatar } from "../../logic"
import { ModalContainer, Input, Button, Form } from "../library"
import { useAppContext, useHandleErrors } from "../hooks"

export default function Profile({ onUpdatedAvatar, handleLogout, page, handleCloseModal }) {
  const { alert, navigate } = useAppContext()
  const handleErrors = useHandleErrors()

  const handleCloseProfile = () => {
    navigate(`/${page}`)
    handleCloseModal()
  }

  const handleChangeAvatar = (event) => {
    event.preventDefault()

    const avatarUrl = event.target.avatarUrl.value
    const password = event.target.password.value

    handleErrors(async () => {
      await updateUserAvatar(avatarUrl, password)

      alert('Avatar changed successfully.')

      onUpdatedAvatar()
      handleCloseProfile()
    })
  }

  const handleChangePassword = (event) => {
    event.preventDefault()

    const password = event.target.password.value
    const newPassword = event.target.newPassword.value
    const newPasswordConfirm = event.target.newPasswordConfirm.value

    handleErrors(async () => {
      await updateUserPassword(password, newPassword, newPasswordConfirm)

      alert('Password changed successfully.')
      handleCloseProfile()
    })
  }
  
  return <ModalContainer tag='section' className="w-full h-full absolute top-10 left-0 z-10 bg-slate-100">
    <div className="flex flex-col items-center gap-6">
      <Button className='w-full bg-white border-2 border-slate-300' onClick={handleLogout}>Log out</Button>
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
    </div>
    <Button className="bg-red-200 absolute top-24 left-4 z-20" onClick={handleCloseProfile}>Close</Button>
    {/* <div className="w-full h-full absolute top-0 z-10 bg-slate-100"></div> */}
</ModalContainer>
}
