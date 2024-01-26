import { registerUser } from "../logic/registerUser.js"
// import { useAppContext } from 'react'
// import AppContext from '../components/AppContext.js'
// import Container from "../library/Container.jsx"
import { Container, Form, Input, Button } from "../library"
import useAppAppContext from "../hooks/useAppContext.js"
import { Link } from "react-router-dom"
import { errors } from "com"

const { DuplicityError, ContentError } = errors



export default function Register() {
    console.debug('Register->render')

    const { alert, navigate } = useAppAppContext()


    function handleRegister(event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value


        try {

            registerUser(name, email, password)
                .then(() => navigate('/login'))
                .catch(error => {
                    if (error instanceof DuplicityError)
                        alert(error.message, 'warn')
                })
        } catch (error) {
            if (error instanceof ContentError)
                alert(error.message, 'errors')
            if (error instanceof RangeError)
                alert(error.message, 'errors')
        }
    }

    return <Container tag="main">
        <h1 className="text-yellow-600">Register</h1>
        <Form onSubmit={handleRegister}>
            <Input type='text' name='name' placeholder='Name' />
            <Input type='email' name='email' placeholder='Email' />
            <Input type='password' name='password' placeholder='Password' />
            <Button type="submit">Register</Button>
        </Form>
        <p className="register-text-goToLogin"><Link to="/login"> Go to login</Link></p>
    </Container>

}

