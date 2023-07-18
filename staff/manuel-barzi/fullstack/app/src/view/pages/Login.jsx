import loginUser from '../../logic/loginUser'
import { useEffect, useState } from 'react'
import retrieveRandomMotivationalQuote from '../../logic/retrieveRandomMotivationalQuote'
import { Container, Form, Input, Button } from '../library'
import { useAppContext, useHandleErrors } from '../hooks'
import { Link } from 'react-router-dom'

export default function Login() {
    console.debug('Login -> render')

    const { alert, freeze, unfreeze, navigate } = useAppContext()
    const [quote, setQuote] = useState(null)

    const handleErrors = useHandleErrors()

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

        handleErrors(async () => {
            await loginUser(email, password)

            navigate('/')
        })
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