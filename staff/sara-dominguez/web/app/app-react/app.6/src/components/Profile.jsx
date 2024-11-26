

export default function Profile () {
    console.log('profile -> render')

    return  <div className="profile-edit">
        <div>
            <h3><a href="" className="updateAvatar">Update Avatar</a></h3>
            <form className="profile-edit-avatar-form off">
                <input className="input" type="url" name="avatarUrl" placeholder="insert url" />
                <button className="button" type="submit">Uptate</button>
            </form> 

            <h3><a href="" className="updatePassword">Update Password</a></h3>
            <div className="profile-edit-password off">
                <form className="profile-edit-password-form">
                    <input type="text" name="password" placeholder="Enter your   password" />
                    <input type="text" name="newPassword" placeholder="Enter new password" />
                    <input type="text"  name="confirmNewPassword" placeholder="Confirm new  password" />
                    <button   className="profile-edit-password-form-button"     type='submit'>Confirm</button>
                </form>
            </div>
        </div>
    </div>
}