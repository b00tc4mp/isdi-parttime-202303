import { useState } from 'react'

import { useAppContext } from '../../hooks'
import { Link } from 'react-router-dom'
import { Container, Form, Input, Button } from '../library'

import { loginUser } from '../../logic'

export default function Login() {
    console.log('Login -> render')
    
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const handleLogin = async (event) => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value
        
        try {
            freeze()
            await loginUser(email, password)
            unfreeze()

            navigate('/')
        }
        catch (error){
            unfreeze()
            alert(error.message)
        }

    }
    
    return <>
        <Container tag="div" className="login page">
            <h1 className="title">Login</h1>

            <Form onSubmit={handleLogin}>
                <Input type="email" name="email" placeholder="usuario@dominio.com" /><br/>
                <Input type="password" size="10" name="password" placeholder="password" /><br/>
                <Button className = "button" type="submit">Login</Button>
            </Form>
            <p>Go to <Link to="/register">Register</Link></p>
        </Container>
    </>
}