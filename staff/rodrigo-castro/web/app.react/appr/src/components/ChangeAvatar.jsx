import PropTypes from 'prop-types'
import { updateUserAvatar } from '../logic/updateUserAvatar'
import { context } from '../ui'

export default function ChangeAvatar({onCancel, onAvatarChanged}) {
    ChangeAvatar.propTypes = {
        onCancel: PropTypes.func,
        onAvatarChanged: PropTypes.func
    }

    const handleCancel = () => onCancel()

    const handleChangeAvatar = (event) => {
        event.preventDefault()

        const avatar = event.target.avatarurl.value

        try{
            updateUserAvatar(context.userId, avatar)

            onAvatarChanged()
        } catch(error){
            alert(error.message)
        }
    }

    return <section className="modal-window" name="modal-change-avatar">
    <div className="updating-menus">
        <div className="red-text"></div>
        <form action="" className="inputs" onSubmit={handleChangeAvatar}>
            <input type="text" className="input-field" name="avatarurl" placeholder="Insert avatar url" autoComplete="off"/>
            <div>
                <button className="submit-buttons">Save</button>
                <button className="submit-buttons cancel-avatar-change" type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    </div>
</section>
}