import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'
import { useEffect, useState } from 'react'
import retrieveRandomMotivationalQuote from '../logic/retrieveRandomMotivationalQuote'
import { Container, Form, Input, Button } from '../library'
import { useAppContext } from '../hooks'
import { Link } from 'react-router-dom'

export default function Login() {
    console.debug('Login -> render')

    const { alert, freeze, unfreeze, navigate } = useAppContext()
    const [quote, setQuote] = useState(null)

    useEffect(() => {
        try {
            freeze()

            retrieveRandomMotivationalQuote((error, quote) => {
                unfreeze()

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

    const handleLogin = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            authenticateUser(email, password)
                .then(token => {
                    context.token = token

                    navigate('/')
                })
                .catch(error => alert(error.message, 'error'))
        } catch (error) {
            alert(error.message, 'warn')
        }
    }

    return <Container tag="main">
        <h1 className="text-[var(--primary)]">Login</h1>

        {quote && <p><q>{quote}</q></p>}

        <Form /*className="content-hidden"*/ onSubmit={handleLogin}>
            <Input type="email" name="email" placeholder="email" />
            <Input type="password" name="password" placeholder="password" />
            <Button type="submit">Login</Button>
        </Form>

        <p>Go to <Link to="/register">Register</Link></p>

        <p className="helloworld helloworld--fluo bg-[orange]">
            Hello, World!
        </p>
    </Container >
}