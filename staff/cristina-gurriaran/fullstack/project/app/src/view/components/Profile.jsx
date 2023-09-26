import updateUserAvatar from '../../logic/updateUserAvatar'
import updateUserPassword from '../../logic/updateUserPassword'
import { context } from '../../ui'
import retrieveUser from '../../logic/retrieveUser'
import { useState, useEffect } from "react"
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'
import FavWorkspots from './FavWorkspots'
import logoutUser from '../../logic/logoutUser'




export default function Profile({ onUserAvatarUpdated, onUpdatedUserPassword }) {
    const { alert } = useAppContext()
    const handleErrors = useHandleErrors()
    const { navigate } = useAppContext()

    const [view, setView] = useState('fav-workspots')
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

    function handleUpdatePassword(event) {
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        handleErrors(async () => {
            await updateUserPassword(password, newPassword, newPasswordConfirm)

            onUpdatedUserPassword()
        })
    }

    const handleLogout = () => {
        logoutUser()

        navigate('/login')
    }

    console.log('Profile -> render')

    return <div className="px-10 pt-4">

        {user && (
            <div className="mx-auto">
                <section className="flex flex-col items-center gap-4">
                    <img
                        className="w-40 h-40 rounded-full border-4 border-gray-light"
                        src={user.avatar}
                        alt={user.name}
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-dark">{user.name}</h1>
                </section>

                <section className="mx-auto mt-10 max-w-md space-y-6">
                    <div className="pb-2">
                        <h1 className="text-lg font-bold text-gray-dark">Profile Picture</h1>
                        <form onSubmit={handleUpdateAvatar} className="flex flex-col gap-2">
                            <Input
                                type="url"
                                name="url"
                                placeholder="Image URL"
                                className="flex-1"
                            />
                            <Button type="submit" className="bg-indigo-dark text-white">
                                Update
                            </Button>
                        </form>
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-gray-dark">Change Your Password</h1>
                        <form onSubmit={handleUpdatePassword} className="space-y-2">
                            <Input
                                type="password"
                                name="oldPassword"
                                placeholder="Old Password"
                            />
                            <Input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                            />
                            <Input
                                type="password"
                                name="newPasswordConfirm"
                                placeholder="Confirm New Password"
                            />
                            <Button type="submit" className="bg-indigo-dark text-white">
                                Update
                            </Button>
                        </form>
                    </div>

                    <Button onClick={handleLogout} className="bg-indigo-light text-white">
                        Logout
                    </Button>
                </section>
            </div>
        )}

    </div>
}