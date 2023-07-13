import registerUser from '../logic/registerUser'
import { Container, Form, Input, Button } from '../library'
import { useAppContext } from '../hooks'
import { Link } from 'react-router-dom'

export default function Register() {
    console.debug('Register -> render')

    const { alert, navigate } = useAppContext()

    const handleRegister = function (event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            registerUser(name, email, password)
                .then(() => navigate('/login'))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
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