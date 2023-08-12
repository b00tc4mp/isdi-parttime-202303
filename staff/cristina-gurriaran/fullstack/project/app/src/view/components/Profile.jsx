import updateUserAvatar from '../../logic/updateUserAvatar'
import updateUserPassword from '../../logic/updateUserPassword'
import { context } from '../../ui'
import retrieveUser from '../../logic/retrieveUser'
import { useState, useEffect} from "react"
import { useAppContext , useHandleErrors} from '../hooks'
import Container from '../library/Container'


export default function Profile({ onUserAvatarUpdated, onUpdatedUserPassword }) {
    const { alert } = useAppContext()
    const handleErrors = useHandleErrors()

    const [view, setView] = useState('favPosts')
    const [user, setUser] = useState()

    useEffect(() => {
        handleErrors(async () => {
            const user = await retrieveUser()
            setUser(user)
        })
    }, [])

    const handleUpdateAvatar = event => {
        event.preventDefault()

        const avatar = event.target.url.value

        handleErrors(async () => {
            await updateUserAvatar(avatar)

            onUserAvatarUpdated()
        })
    }

    function handleUpdatePassword(event){
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        handleErrors(async () => {
            await updateUserPassword(password, newPassword, newPasswordConfirm)

            onUpdatedUserPassword()
        })
    }

    const handleSwitchMode = () => document.querySelector(':root').classList.toggle('dark')


    console.log('Profile -> render')

    return <Container type="row" className="profile-page">
        {user && <>
        <section className="user-account">
            <div className="user-data-container">
                <img className="profile-avatar" src={user.avatar} alt="" />
                <h1>{user.name}</h1>
            </div>
            <div className="edit-profile-container">
                <h1 className= 'title'>Update avatar</h1>
                <form className='profile-avatar-form'  onSubmit={handleUpdateAvatar}>
                    <input className='input' type='url' name='url'/>
                    <button className='button update' type='submit'>Update</button>
                </form>

                <h1 className='title'>Update password</h1>
                <form className='profile-password-form' onSubmit={handleUpdatePassword}>
                    <input className='input' type='password' name='password' placeholder='Old password*'/>
                    <input className='input' type='password' name='newPassword' placeholder='New password*'/>
                    <input className="input" type="password" name='newPasswordConfirm' placeholder='Confirm new password*'/>
                    <button className='button update' type='submit'>Update</button>
                </form>
            </div>
            <button onClick={handleSwitchMode} className='switchMode-button'>Switch Mode</button>   
        </section>


    </>}
    </Container>
}