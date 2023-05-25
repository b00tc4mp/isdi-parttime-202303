import './Profile.css'

export default function Profile() {
    console.log('Profile -> render')

    return <section className="profile container">
        <h2>Update avatar</h2>

        <form className="profile-avatar-form">
            <input className="input" type="url" name="url" />
            <button className="button" type="submit">Update</button>
        </form>

        <h2>Update password</h2>

        <form className="profile-password-form">
            <input className="input" type="password" name="password" placeholder="password" />
            <input className="input" type="password" name="newPassword" placeholder="new password" />
            <input className="input" type="password" name="newPasswordConfirm" placeholder="new password confirmation" />
            <button className="button" type="submit">Update</button>
        </form>
    </section>
}