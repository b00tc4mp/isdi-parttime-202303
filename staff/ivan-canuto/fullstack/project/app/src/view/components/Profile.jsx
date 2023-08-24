import { updateUserPassword, updateUserAvatar, retrieveUser } from "../../logic"
import { ModalContainer, Input, Button, Form } from "../library"
import { useAppContext, useHandleErrors } from "../hooks"
import { useEffect, useState } from "react"

export default function Profile({ onUpdatedAvatar, handleLogout, page, setPage, setOpenedProfile }) {
  const { alert, navigate } = useAppContext()
  const handleErrors = useHandleErrors()

  const [user, setUser] = useState()

  useEffect(() => {
    handleErrors(async () => {
      const _user = await retrieveUser()

      setUser(_user)

      console.log('profile -> render')
    })
  }, [])

  const handleCloseProfile = () => {
    console.log(page)
    if(page === 'Home') {
      setPage('Home')
      navigate('/')
    }
    else {
      setPage(`/${page}`)
      navigate(`/${page}`)
    }

    setOpenedProfile(false)
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
  
  return <ModalContainer tag='section' className="w-full h-full absolute top-14 left-0 z-10 bg-white">
    <div className="flex flex-col items-center gap-4 overflow-scroll">
      <div className="w-48 flex justify-center">
        {user && <h1 className="text-2xl border-b-2 border-black w-fit font-mono p-1">{user.name}</h1>}
      </div>
      <Button className='w-full bg-white border border-slate-300' onClick={handleLogout}>Log out</Button>
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
    <Button className="bg-red-200 absolute top-14 left-4 z-20" onClick={handleCloseProfile}>Close</Button>
    {/* <div className="w-full h-full absolute top-0 z-10 bg-slate-100"></div> */}
</ModalContainer>
}
