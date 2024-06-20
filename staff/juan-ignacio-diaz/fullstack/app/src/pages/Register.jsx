import { useAppContext } from '../hooks'
import { Link } from 'react-router-dom'
import { Container, Form, Input, Button } from '../library'

import { registerUser } from "../logic"

export default function Register() {
    console.log('Register -> render')

    const { alert, navigate } = useAppContext()

    const handleRegister = async (event) => {
        event.preventDefault()

        event.target.name.classList.remove("imput-highlight")
        event.target.email.classList.remove("imput-highlight")
        event.target.password.classList.remove("imput-highlight")
    
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
    
        try {
            await registerUser(name, email, password)

            event.target.reset()
            navigate('/login')
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
            <p>Go to <Link to="/login">Login</Link></p>
        </Container>
    </>
}