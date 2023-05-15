import PropTypes from 'prop-types'
import { useState } from 'react'
import { retrieveUser } from '../logic/retrieveUser'
import { context } from '../ui'
import './Profile.css'

export default function Profile({onCancel, onSavedPosts, onChangeEmail, onChangePassword, onChangeAvatar}) {
    Profile.propTypes = {
        onCancel: PropTypes.func,
        onChangeEmail: PropTypes.func,
        onChangePassword: PropTypes.func,
        onChangeAvatar: PropTypes.func
    }

    const [mode, setMode] = useState(context.mode ? context.mode : 'light')

    const handleCancel = () => onCancel()

    const handleSavedPosts = () => onSavedPosts()

    const handleChangeEmail = () => onChangeEmail()

    const handleChangePassword = () => onChangePassword()

    const handleChangeAvatar = () => onChangeAvatar()

    const handleSwitchMode = () => {
        document.querySelector(':root').classList.toggle('dark')

        context.mode = document.querySelector(':root').classList.contains('dark') ? 'dark' : 'light'

        setMode(context.mode)
    }

        // TODO wrap in try-catch
        const user = retrieveUser(context.userId)

        return <section className="modal-window" name="modal-profile-options">
            <div className="modal-profile-options">
                <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className="user-avatar-big" onClick={handleChangeAvatar}/>
                <ul className="profile-options">
                    <li className={`mode ${mode}`}><button onClick={handleSwitchMode} className='mode-button'><span className="material-symbols-rounded icon-color">{(mode === 'dark') ? 'nightlight' : 'light_mode'}</span></button></li>
                    <li onClick={handleSavedPosts}>Saved posts</li>
                    <li onClick={handleChangeEmail}>Change email</li>
                    <li onClick={handleChangePassword}>Change password</li>
                </ul>
                <button className="submit-buttons close-profile-options" type="button" onClick={handleCancel}>Back</button>
            </div>
        </section>
}

// className={`like-button ${likedBy && likedBy.includes(context.userId) ? 'liked' : ''}`}