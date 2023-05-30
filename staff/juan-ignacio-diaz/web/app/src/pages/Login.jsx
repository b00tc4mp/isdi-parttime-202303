import { useContext, useEffect, useState } from 'react'

import { context } from '../ui'
import Context from '../Context'

import Container from '../library/Container'

import authenticateUser from '../logic/authenticateUser'

import retrieveRandomMotivationalQuote from '../logic/retrieveRandomMotivationalQuote'

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
        } catch(error) {
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
            authenticateUser(email, password, (error, userId) => {
                unfreeze()
                if (error) {
                    alert(error.message)

                    return
                }
                context.userId = userId

                onUserLoggedIn() 
            })
        }
        catch (error){
            alert(error.message)
        }   
    }

    console.log('Login -> render')
    
    return <>
        <Container tag="div" className="login page">
            <h1 className="title">Login</h1>

            { quote && <p><q>{quote}</q></p> }

            <form className="form" action="" onSubmit={handleLogin}>
                <input className="input" type="email" name="email" placeholder="usuario@dominio.com" /><br/>
                <input className="input" type="password" size="10" name="password" placeholder="password" /><br/>
                <button className = "button" type="submit">Login</button>
            </form>
            <p>Go to <a href="" onClick={handleRegisterClick}>Register</a></p>
        </Container>
    </>
}