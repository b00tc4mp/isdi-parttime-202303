import { registerUser } from "../../logic/registerUser.js"
// import { useAppContext } from 'react'
// import AppContext from '../components/AppContext.js'
// import Container from "../library/Container.jsx"
import { Container, Form, Input, Button } from "../library"
import { useAppAppContext, useHandleErrors } from "../hooks"
import { Link } from "react-router-dom"


export default function Register() {
    console.debug('Register->render')

    const { navigate } = useAppAppContext()
    const handleErrors = useHandleErrors()


    const handleRegister = async function (event) {
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

