import updateAvatar from '../logic/updateUserAvatar'
import changePassword from '../logic/updateUserPassword'
import { context } from '../ui'

export default function Profile ({ onUpdateUserAvatar, onUpdateUserPassword }) {
  const updateUserAvatar = event => {
    event.preventDefault()

    const avatar = event.target.url.value

    try {
      updateAvatar(context.userId, avatar)

      onUpdateUserAvatar()
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateUserPassword = event => {
    event.preventDefault()

    const password = event.target.oldpassword.value
    const newPassword = event.target.newpassword.value.trim()
    const newPasswordConfirm = event.target.repeatnewpassword.value.trim()

    try {
      changePassword(context.userId, password, newPassword, newPasswordConfirm)

      onUpdateUserPassword()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='profile'>
      <h1 className='title'>YOUR PROFILE</h1>

      <form className='form profile-avatar-form' onSubmit={updateUserAvatar}>
        <h2>UPDATE AVATAR</h2>
        <input className='input' type='url' name='url' placeholder='Your link' />

        <p className='update-avatar-error error off' />

        <button className='button change-avatar-button' type='submit'>
          UPDATE
        </button>
      </form>

      <form className='form profile-password-form' onSubmit={updateUserPassword}>
        <h2>UPDATE PASSWORD</h2>
        <input
          className='input'
          type='password'
          name='oldpassword'
          placeholder='Current password'
        />

        <input
          className='input'
          type='password'
          name='newpassword'
          placeholder='New password'
        />

        <input
          className='input'
          type='password'
          name='repeatnewpassword'
          placeholder='Repeat new password'
        />

        <p className='change-password-error error off' />

        <button className='button change-password-button' type='submit'>UPDATE</button>
      </form>
    </div>
  )
}
