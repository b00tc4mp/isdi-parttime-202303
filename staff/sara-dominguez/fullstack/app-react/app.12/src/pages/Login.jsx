import { loginUser } from '../logic/loginUser.js'
import { useEffect, useState } from 'react'
// import AppContext from '../components/AppContext.js'
import retrieveRandomMotivationalQuote from '../logic/retrieveRandomMotivationalQuote.js'
// import Container from '../library/Container.jsx'
import { Container, Form, Input, Button } from '../library'
import useAppContext from '../hooks/useAppContext.js'
import { Link } from 'react-router-dom'

export default function Login() {
    console.debug('Login->render')

    const { alert, navigate } = useAppContext()
    const [quote, setQuote] = useState(null)


    useEffect(() => {
        try {
            retrieveRandomMotivationalQuote((error, quote) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setQuote(quote)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            loginUser(email, password)
                .then(() => navigate('/'))
                .catch(error => alert(error.message, 'error'))
        } catch (error) {
            alert(error.message, 'warn')
        }

    }

    return <Container tag="main">
        <h1>My App nº 11</h1>
        <h1 className="text-yellow-600">Login</h1>
        {quote && <p>{quote.author}, <q>{quote.content}</q></p>}
        <Form onSubmit={handleLogin}>
            <Input type='email' name='email' placeholder='Email' />
            <Input type='password' name='password' placeholder='Password' />
            <Button type="submit">Login</  Button>
        </Form>
        <p className="login-text-goToRegister"> <Link to="/register"> Go to register</Link></p>
    </Container>
}

