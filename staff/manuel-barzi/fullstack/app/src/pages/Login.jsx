import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'
import { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import retrieveRandomMotivationalQuote from '../logic/retrieveRandomMotivationalQuote'
// import Container from '../library/Container'
// import Form from '../library/Form'
// import Input from '../library/Input'
// import Button from '../library/Button'
import { Container, Form, Input, Button } from '../library'

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    const { alert, freeze, unfreeze } = useContext(Context)
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
        <h1 className="text-3xl text-[var(--primary)]">Login</h1>

        {quote && <p><q>{quote}</q></p>}

        <Form onSubmit={handleLogin}>
            <Input type="email" name="email" placeholder="email" />
            <Input type="password" name="password" placeholder="password" />
            <Button type="submit">Login</Button>
        </Form>

        <p className="pepito">Go to <a href="" onClick={handleRegisterClick}>Register</a></p>
    </Container >
}