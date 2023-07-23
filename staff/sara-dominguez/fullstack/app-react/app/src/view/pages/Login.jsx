import { loginUser } from '../../logic/loginUser'
import { useEffect, useState } from 'react'
// import AppContext from '../components/AppContext.js'
import retrieveRandomMotivationalQuote from '../../logic/retrieveRandomMotivationalQuote'
// import Container from '../library/Container.jsx'
import { Container, Form, Input, Button } from '../library'
import { useAppContext, useHandleErrors } from '../hooks'
import { Link } from 'react-router-dom'


export default function Login() {
    console.debug('Login->render')

    const { alert, navigate } = useAppContext()
    const [quote, setQuote] = useState(null)
    const handleErrors = useHandleErrors()

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

    const handleLogin = async function (event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        handleErrors(async () => {
            await loginUser(email, password)

            navigate('/')
        })

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

