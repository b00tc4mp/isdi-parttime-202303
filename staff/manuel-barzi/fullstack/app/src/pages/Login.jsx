import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'
import { useEffect, useState } from 'react'
import retrieveRandomMotivationalQuote from '../logic/retrieveRandomMotivationalQuote'
import { Container, Form, Input, Button } from '../library'
import { useAppContext } from '../hooks'

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    const { alert, freeze, unfreeze } = useAppContext()
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

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    const handleLogin = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    alert(error.message, 'error')

                    return
                }

                context.userId = userId

                onUserLoggedIn()
            })

        } catch (error) {
            alert(error.message, 'warn')
        }
    }

    console.debug('Login -> render')

    return <Container tag="main">
        <h1 className="text-[var(--primary)]">Login</h1>

        {quote && <p><q>{quote}</q></p>}

        <Form /*className="content-hidden"*/ onSubmit={handleLogin}>
            <Input type="email" name="email" placeholder="email" />
            <Input type="password" name="password" placeholder="password" />
            <Button type="submit">Login</Button>
        </Form>

        <p>Go to <a href="" onClick={handleRegisterClick}>Register</a></p>

        <p className="helloworld helloworld--fluo bg-[orange]">
            Hello, World!
        </p>
    </Container >
}