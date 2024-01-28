import registerUser from '../logic/registerUser'
import { Container, Form, Input, Button } from '../library'
import { useAppContext } from '../hooks'

export default function Register({ onLoginClick, onUserRegistered }) {
    const { alert } = useAppContext()

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    const handleRegister = function (event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            registerUser(name, email, password, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onUserRegistered()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    console.debug('Register -> render')

    return <Container tag="main">
        <h1 className="title">Register</h1>

        <Form onSubmit={handleRegister}>
            <Input type="text" name="name" placeholder="name" />
            <Input type="email" name="email" placeholder="email" />
            <Input type="password" name="password" placeholder="password" />
            <Button type="submit">Register</Button>
        </Form>

        <p>Go to <a href="" onClick={handleLoginClick}>Login</a></p>
    </Container>
}