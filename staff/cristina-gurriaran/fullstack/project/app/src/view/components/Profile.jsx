import updateUserAvatar from '../../logic/updateUserAvatar'
import updateUserPassword from '../../logic/updateUserPassword'
import { context } from '../../ui'
import retrieveUser from '../../logic/retrieveUser'
import { useState, useEffect} from "react"
import { useAppContext , useHandleErrors} from '../hooks'
import { Container, Form, Input, Button } from '../library'
import FavWorkspots from './FavWorkspots'

export default function Profile({ onUserAvatarUpdated, onUpdatedUserPassword }) {
    const { alert } = useAppContext()
    const handleErrors = useHandleErrors()

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

    function handleUpdatePassword(event){
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        handleErrors(async () => {
            await updateUserPassword(password, newPassword, newPasswordConfirm)

            onUpdatedUserPassword()
        })
    }

    console.log('Profile -> render')

    return <div className="flex flex-row gap-10">
        {user && <>
        <section>
            <div>
                <img className="w-80 h-80 mr-2 rounded-full mt-40" src={user.avatar} alt="" />
                <h1>{user.name}</h1>
            </div>
            <div>
                <h1>Update avatar</h1>
                    <Form onSubmit={handleUpdateAvatar}>
                    <Input type='url' name='url'/>
                    <Button type='submit'>Update</Button>
                    </Form>

                <h1>Update password</h1>
                    <Form onSubmit={handleUpdatePassword}>
                    <Input type='password' name='password' placeholder='Old password*'/>
                    <Input type='password' name='newPassword' placeholder='New password*'/>
                    <Input type="password" name='newPasswordConfirm' placeholder='Confirm new password*'/>
                    <Button type='submit'>Update</Button>
                    </Form>
            </div>  
        </section>

        <section className="w-1/2 flex flex-col items-center justify-center gap-10">
            {view === 'fav-workspots' && <FavWorkspots />}
        </section>
    </>}
    </div>
}