import updateUserAvatar from "../logic/updateUserAvatar"
import updateUserPassword from "../logic/updateUserPassword"
import { context } from "../ui"
import './Profile.css'
import FavPosts from "./FavPosts"
import retrieveUser from "../logic/retrieveUser"
import { useState, useEffect} from "react"
import { useAppContext } from '../hooks'


export default function Profile({ onUserAvatarUpdated, onUpdatedUserPassword }) {
    const { alert } = useAppContext()

    const [view, setView] = useState('favPosts')
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if(error){
                    alert(error.message)
                    return
                }

                setUser(user)
            })

        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleUpdateAvatar = event => {
        event.preventDefault()

        const url = event.target.url.value

        try {
            updateUserAvatar(context.userId, url, error => {
                if(error){
                    alert(error.message)
                    return
                }
                onUserAvatarUpdated()
            })
            

        } catch (error) {
            alert(error.message)
        }
        
        
    }

    function handleUpdatePassword(event){
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        try {
            updateUserPassword(context.userId, password, newPassword,newPasswordConfirm, error => {
                if(error){
                    alert(error.message)
                    return
                }

                alert('Password succesfully updated')
                onUpdatedUserPassword()
            })

        } catch (error) {
            alert(error.message)
        } 
    }

    const handleSwitchMode = () => document.querySelector(':root').classList.toggle('dark')


    console.log('Profile -> render')

    return <div className='profile-page'>
        {user && <>
        <section className="user-account">
            <div className="user-data-container">
                <img className="profile-avatar" src={user.avatar} alt="" />
                <h1>{user.name}</h1>
            </div>
            <div className="edit-profile-container">
                <h1 className= 'title'>Update-avatar</h1>
                <form className='profile-avatar-form'  onSubmit={handleUpdateAvatar}>
                    <input className='input' type='url' name='url'/>
                    <button className='button update' type='submit'>Update</button>
                </form>

                <h1 className='title'>Update-password</h1>
                <form className='profile-password-form' onSubmit={handleUpdatePassword}>
                    <input className='input' type='password' name='password' placeholder='Old password*'/>
                    <input className='input' type='password' name='newPassword' placeholder='New password*'/>
                    <input className="input" type="password" name='newPasswordConfirm' placeholder='Confirm new password*'/>
                    <button className='button update' type='submit'>Update</button>
                </form>
            </div>
            <button onClick={handleSwitchMode} className='switchMode-button'>Switch Mode</button>   
        </section>

    <section className="user-favs">        
        {view === 'favPosts' && <FavPosts />}
    </section>
    </>}
</div>
}