import { useState } from "react"
import deleteAccount from "../logic/deleteAccount"
import { context, getTheme, setTheme } from "../ui"

export default function Profile({ onExitProfileClick, onGoToUpdateAvatarClick, onGoToUpdateEmailClick, onGoToUpdateUsernameClick, onGoToUpdatePasswordClick, onDeleteAccountClick, onGoToFavoriteFeed, onGoToMainFeed }) {
    //
    const [dark, setDark] = useState(getTheme() === 'dark')

    const handleToggleDarkMode = () => {
        const dark = getTheme() === 'light'

        const theme = dark ? 'dark' : 'light'

        setTheme(theme)
        setDark(dark)
    }
    //

    const handleExitProfile = () => onExitProfileClick()
    
    const handleGoToUpdateAvatar = () => onGoToUpdateAvatarClick()

    const handleGoToUpdatEmail = () => onGoToUpdateEmailClick()

    const handleGoToUpdateUsername = () => onGoToUpdateUsernameClick()

    const handleGoToUpdatePassword = () => onGoToUpdatePasswordClick()

    const handleGoToFavoriteFeed = () => onGoToFavoriteFeed()
    
    const handleGoToMainFeed = () => onGoToMainFeed()

    const handleDeleteAccount = () => {
        const confirmation = confirm('Are you sure that you want to delete this account? This action cannot be undone!')

        if (confirmation) {
            try{
                deleteAccount(context.userId, error => {
                    if(error) {
                        alert(error.message)


                        return
                    }

                    onDeleteAccountClick()
                })
            }catch (error) {
                alert(error.message)
            }
        }
    }

    return <div className="modal">
        <div className="home__profile page">
            <button className="dark-mode" href="" onClick={handleToggleDarkMode}>Dark mode</button>
            <h2 className="text profile__user">My feed</h2>
            <button className="profile__anchor--avatar" href="" onClick={handleGoToMainFeed}>Main Feed</button>
            <button className="profile__anchor--avatar" href="" onClick={handleGoToFavoriteFeed}>Favs</button>
            <h2 className="text profile__user">Update your profile</h2>
            <button className="profile__anchor--avatar" href="" onClick={handleGoToUpdateAvatar}>Change avatar</button>
            <button className="profile__anchor--username" href="" onClick={handleGoToUpdateUsername}>Change username</button>
            <button className="profile__anchor--email" href="" onClick={handleGoToUpdatEmail}>Change email</button>
            <button className="profile__anchor--password" href="" onClick={handleGoToUpdatePassword}>Change password</button>
            <button className="profile__anchor--delete" href="" onClick={handleDeleteAccount}>Delete account</button>
            <button className="profile__anchor--home" href="" onClick={handleExitProfile}>Back</button>
        </div>
    </div>
}