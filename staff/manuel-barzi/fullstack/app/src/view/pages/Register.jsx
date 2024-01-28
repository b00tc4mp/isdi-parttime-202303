import registerUser from '../../logic/registerUser'
import { Container, Form, Input, Button } from '../library'
import { useAppContext, useHandleErrors } from '../hooks'
import { Link } from 'react-router-dom'

export default function Register() {
    console.debug('Register -> render')

    const { alert, navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const handleRegister = function (event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        handleErrors(async () => {
            await registerUser(name, email, password)

            navigate('/login')
        })
    }

    return <Container tag="main">
        <h1 className="title">Register</h1>

        <Form onSubmit={handleRegister}>
            <Input type="text" name="name" placeholder="name" />
            <Input type="email" name="email" placeholder="email" />
            <Input type="password" name="password" placeholder="password" />
            <Button type="submit">Register</Button>
        </Form>

        <p>Go to <Link to="/login">Login</Link></p>
    </Container>
}