import { registerUser } from "../logic/registerUser.js"
// import { useContext } from 'react'
// import Context from '../components/Context.js'
// import Container from "../library/Container.jsx"
import { Container, Form, Input, Button } from "../library"
import useAppContext from "../hooks/useAppContext.js"

export default function Register({ onLoginClick, onUserRegistered }) {
    console.debug('Register->render')

    const { alert } = useAppContext()

    function handleLoginClick(event) {
        event.preventDefault()

        onLoginClick()
    }

    function handleRegister(event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        // hay que validar los errores sincronos y los asincronos
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

    return <Container tag="main">
        <h1 className="text-yellow-600">Register</h1>
        <Form onSubmit={handleRegister}>
            <Input type='text' name='name' placeholder='Name' />
            <Input type='email' name='email' placeholder='Email' />
            <Input type='password' name='password' placeholder='Password' />
            <Button type="submit">Register</Button>
        </Form>
        <p className="register-text-goToLogin"><a href="" onClick={handleLoginClick}> Go to login</a></p>
    </Container>

}

