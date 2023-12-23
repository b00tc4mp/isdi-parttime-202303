import { useEffect, useState } from 'react'

import { useAppContext } from '../hooks'
import { Link } from 'react-router-dom'
import { Container, Form, Input, Button } from '../library'

import { loginUser } from '../logic'

import retrieveRandomMotivationalQuote from '../logic/retrieveRandomMotivationalQuote'

export default function Login() {
    console.log('Login -> render')
    
    const { alert, freeze, unfreeze, navigate } = useAppContext()
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

    const handleLogin = async event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            freeze()
            loginUser(email, password)

            navigate('/')
            unfreeze()
        }
        catch (error){
            unfreeze()
            alert(error.message)
        }
    }
    
    return <>
        <Container tag="div" className="login page">
            <h1 className="title">Login</h1>

            { quote && <p><q>{quote}</q></p> }

            <Form onSubmit={handleLogin}>
                <Input type="email" name="email" placeholder="usuario@dominio.com" /><br/>
                <Input type="password" size="10" name="password" placeholder="password" /><br/>
                <Button className = "button" type="submit">Login</Button>
            </Form>
            <p>Go to <Link to="/register">Register</Link></p>
        </Container>
    </>
}