import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { retrieveUser } from '../logic/retrieveUser'
import { context } from '../ui'
import './Profile.css'

export default function Profile({ onCancel, onSavedPosts, onChangeEmail, onChangePassword, onChangeAvatar }) {
    Profile.propTypes = {
        onCancel: PropTypes.func,
        onChangeEmail: PropTypes.func,
        onChangePassword: PropTypes.func,
        onChangeAvatar: PropTypes.func
    }

    const [mode, setMode] = useState(localStorage.mode ? localStorage.mode : 'light')
    const [user, setUser] = useState()

    const handleCancel = () => onCancel()

    const handleSavedPosts = () => onSavedPosts()

    const handleChangeEmail = () => onChangeEmail()

    const handleChangePassword = () => onChangePassword()

    const handleChangeAvatar = () => onChangeAvatar()

    const handleSwitchMode = () => {
        document.querySelector(':root').classList.toggle('dark')

        localStorage.mode = document.querySelector(':root').classList.contains('dark') ? 'dark' : 'light'

        setMode(localStorage.mode)
    }

    useEffect(() => {
        try{
            retrieveUser(context.userId, (error, user) => {
                if(error){
                    alert(error.message)
    
                    return
                }
    
                setUser(user)
            })
        } catch(error){
            alert(error.message)
        }
    }, [])
    
    
    return <section className="modal-window" name="modal-profile-options">
        <div className="modal-profile-options">
            {user && <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className="user-avatar-big" onClick={handleChangeAvatar} />}
            <ul className="profile-options">
                <li className={`mode ${mode}`}><button onClick={handleSwitchMode} className='mode-button'><span className="material-symbols-rounded icon-color">{(localStorage.mode === 'dark') ? 'nightlight' : 'light_mode'}</span></button></li>
                <li onClick={handleSavedPosts}>Saved posts</li>
                <li onClick={handleChangeEmail}>Change email</li>
                <li onClick={handleChangePassword}>Change password</li>
            </ul>
            <button className="submit-buttons close-profile-options" type="button" onClick={handleCancel}>Back</button>
        </div>
    </section>
}