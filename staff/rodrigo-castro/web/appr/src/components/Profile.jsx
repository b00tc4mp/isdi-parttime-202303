import PropTypes from 'prop-types'

export default function Profile({onCancel}) {
    Profile.propTypes = {
        onCancel: PropTypes.func,
    }
    
    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    return <section className="modal-window" name="modal-profile-options">
    <div className="modal-profile-options">
        <ul className="profile-options">
            <li>My profile</li>
            <li>Settings</li>
            <li className="change-email">Change email</li>
            <li className="change-password">Change password</li>
            <li className="change-avatar">Change avatar</li>
        </ul>
        <button className="submit-buttons close-profile-options" type="button" onClick={handleCancel}>Cancel</button>
    </div>
</section>
}