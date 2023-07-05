import { useAppContext } from '../hooks'

import { Container, Form, Input, Button } from '../library'

import registerUser from "../logic/registerUser"

export default function Register({ onLoginClick, onRegistered}) {
    const { alert } = useAppContext()

    function handleLoginClick(event) {
        event.preventDefault()

        onLoginClick()
    }

    function handleRegister(event) {
        event.preventDefault()

        event.target.name.classList.remove("imput-highlight")
        event.target.email.classList.remove("imput-highlight")
        event.target.password.classList.remove("imput-highlight")
    
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
    
        try {
            registerUser(name, email, password)
                .then(() => {
                    event.target.reset()

                    onRegistered()
                })
                .catch(error => alert(error.message))
        }
        catch (error) {
            alert(error.message)
    
            if (error.cause === "email") { 
                event.target.email.focus()
                event.target.email.classList.add("imput-highlight")
            }
            else if (error.cause === "name") {
                event.target.name.focus()
                event.target.name.classList.add("imput-highlight")
            }
            else if (error.cause === "password") { 
                event.target.password.focus()
                event.target.password.classList.add("imput-highlight")
            }
        }    
    
    }

    return <>
        <Container tag="div" className="register page">
            <h1 className="text-[var(--primary)]">Register</h1>

            <Form onSubmit={handleRegister}>
                <label className="title" htmlFor="nameRegister">Name: </label>
                <Input type="text" name="name" placeholder="name" />
                <label className="title" htmlFor="emailRegister">E-mail: </label>
                <Input type="email" name="email" placeholder="usuario@dominio.com" />
                <label className="title" htmlFor="passwordRegister">Password: </label>
                <Input type="password" name="password" placeholder="password" /><br/>
                <Button type="submit">Register</Button>
            </Form>
            <p>Go to <a href="" onClick={handleLoginClick}>Login</a></p>
        </Container>
    </>
}