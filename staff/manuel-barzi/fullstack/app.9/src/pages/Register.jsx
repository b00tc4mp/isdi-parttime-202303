import registerUser from '../logic/registerUser'
import { Container, Form, Input, Button } from '../library'
import { useAppContext } from '../hooks'
import { Link } from 'react-router-dom'
import { errors } from 'com'

const {
    ContentError,
    DuplicityError
} = errors

export default function Register() {
    console.debug('Register -> render')

    const { alert, navigate } = useAppContext()

    const handleRegister = async function (event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            await registerUser(name, email, password)

            navigate('/login')
        } catch (error) {
            if (error instanceof DuplicityError)
                alert(error.message, 'error')
            if (error instanceof RangeError)
                alert(error.message, 'warn')
            else if (error instanceof ContentError)
                alert(error.message, 'warn')
            else alert(error.message)
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