import { context } from "../ui"
import { updateUserAvatar } from "../logic/updateUserAvatar"
import useAppContext from "../hooks/UseAppContext"
import { Container, Form, Input, Button } from '../library'

export default function Profile({ onUserAvatarUpdated }) {
    console.debug('profile->render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleUpdateAvatar = (event) => {
        event.preventDefault()

        const avatarUrl = event.target.avatarUrl.value

        try {
            freeze()
            updateUserAvatar(context.userId, avatarUrl, error => {
                unfreeze()
                if (error) {
                    alert(error.message)

                    return
                }
                onUserAvatarUpdated()
            })


        } catch (error) {
            alert(error.message)
        }
    }

    return <Container className="profile-edit">
        <div>
            <h3><a href="" className="updateAvatar">Update Avatar</a></h3>
            <Form className="profile-edit-avatar-form" onSubmit={handleUpdateAvatar}>
                <Input type="url" name="avatarUrl" placeholder="Insert url" />
                <Button className="button" type="submit">Uptate</Button>
            </Form>

            <h3><a href="" className="updatePassword">Update password</a></h3>
            <div className="profile-edit-password">
                <Form className="profile-edit-password-form">
                    <Input type="text" name="password" placeholder="Actual password" />
                    <Input type="text" name="newPassword" placeholder="New password" />
                    <Input type="text" name="confirmNewPassword" placeholder="Confirm new  password" />
                    <Button className="profile-edit-password-form-button" type='submit'>Confirm</Button>
                </Form>
            </div>
        </div>
    </Container>
}