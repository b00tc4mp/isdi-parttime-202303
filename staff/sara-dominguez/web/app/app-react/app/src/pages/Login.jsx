import { context } from '../ui.js'
import { authenticateUser } from '../logic/authenticateUser.js'
import { useContext, useEffect, useState } from 'react'
import Context from '../components/Context.js'
import retrieveRandomMotivationalQuote from '../logic/retrieveRandomMotivationalQuote.js'
import Container from '../library/Container.jsx'

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    console.debug('Login->render')

    const { alert } = useContext(Context)
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
    },[])


    function handleRegisterClick(event) {
        event.preventDefault()

        onRegisterClick()
    }

    function handleLogin(event) {
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

    return <Container tag="main">
        <h1>Login</h1>
        {quote && <p>{quote.author}, <q>{quote.content}</q></p>}
        <form className="login-form" onSubmit={handleLogin}>
            <input className="login-input" type='text' name='email' placeholder='email' />
            <input className="login-input" type='text' name='password' placeholder='password' />
            <button className="login-button" type="submit">Enter</  button>
        </form>
        <p className="login-text-goToRegister"> <a href="" onClick={handleRegisterClick}> Go to register</a></p>
    </Container>
}

