import { context } from "../ui";
import Posts from "./Posts";


function Profile({onLikePost, onEditPost, onFavourite}) {

    function handleUpdateAvatar(event) {
        event.preventDefault()

        const avatarUrl = event.target.avatarUrl.value;

        try {
            updateUserAvatar(context.userId, avatarUrl)
            alert('avatar updated')

        }catch (error){
            alert(error.message)
        }
    }

    function handleUpdatePassword(event){
        event.preventDefault()

        const password = event.target.password.value,
        newPassword = event.target.newPassword.value,
        newPasswordConfirm = event.target.newPasswordConfirm.value;

        try {
            updateUserPassword(
                context.userId, 
                password, 
                newPassword, 
                newPasswordConfirm
            )

            alert('password updated')

        }catch (error){
            alert(error.message)
        }
    }

    function handleOpenEditPost(id){
        onEditPost(id)
    }

    function handleTogledLike(){
        onLikePost()
      }
  
    function handleToggleFavourite(){
        onFavourite()
    }

    return <div className="profile">
            <div className='update-options'>
                <h4>Update avatar</h4>
    
                <form className="profile-avatar-form" onSubmit={handleUpdateAvatar}>
                    <input className="input" type="url" name="avatarUrl" />
                    <button className="button" type="submit">Update</button>
                </form>

                <h4>Update password</h4>
    
                <form className="profile-password-form" onSubmit={handleUpdatePassword}>
                    <input className="input" type="password" name="password" placeholder="password" />
                    <input className="input" type="password" name="newPassword" placeholder="new password" />
                    <input className="input" type="password" name="newPasswordConfirm" placeholder="new password confirmation" />
                    <button className="button" type="submit">Update</button>
                </form>

            </div>
            <div className='profile-posts'>
                <Posts 
                    onLikePost={handleTogledLike}
                    onEditPost={handleOpenEditPost}
                    onFavourite={handleToggleFavourite}
                />
            </div>
        </div>
    }

export default Profile