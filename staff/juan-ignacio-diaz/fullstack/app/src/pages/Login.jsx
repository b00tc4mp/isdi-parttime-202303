import { useEffect, useState } from 'react'

import { context } from '../ui'
import { useAppContext } from '../hooks'

import { Container, Form, Input, Button } from '../library'

import authenticateUser from '../logic/authenticateUser'

import retrieveRandomMotivationalQuote from '../logic/retrieveRandomMotivationalQuote'

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    const { alert, freeze, unfreeze } = useAppContext()
    const [quote, setQuote] = useState(null)
    
    useEffect(() => {
        try {
            freeze()
            retrieveRandomMotivationalQuote(() => {})
                .then(quote => setQuote(quote)) 
                .finally(() => unfreeze())
        } catch(error) {
            unfreeze()
            alert(error.message)
        }
    }, [])

    function handleRegisterClick(event) {
        event.preventDefault()

        onRegisterClick()
    }

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            freeze()
            authenticateUser(email, password)
                .then(token => {
                    context.token = token

                    onUserLoggedIn() 
                })
                .catch(error => alert(error.message))
                .finally(() => unfreeze())
        }
        catch (error){
            unfreeze()
            alert(error.message)
        }   
    }

    console.log('Login -> render')
    
    return <>
        <Container tag="div" className="login page">
            <h1 className="title">Login</h1>

            { quote && <p><q>{quote}</q></p> }

            <Form onSubmit={handleLogin}>
                <Input type="email" name="email" placeholder="usuario@dominio.com" /><br/>
                <Input type="password" size="10" name="password" placeholder="password" /><br/>
                <Button className = "button" type="submit">Login</Button>
            </Form>
            <p>Go to <a href="" onClick={handleRegisterClick}>Register</a></p>
        </Container>
    </>
}