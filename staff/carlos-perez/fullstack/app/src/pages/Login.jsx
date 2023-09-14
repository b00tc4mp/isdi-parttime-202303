import authenticateUser from '../logic/authenticateUser.js'
import context from '../logic/context.js'
import { useContext, useEffect, useState } from 'react'
import Context from '../Context.js'
import retrieveRandomMotivationalQuote from '../logic/retrieveRandomMotivationalQuote'

export default function Login({ onRegisterClick, onAuthClick }) {
    const { alert, freeze, unfreeze } = useContext(Context)
    const [quote, setQuote] = useState(null)

    useEffect(() => {
        try {
            //freeze()

            retrieveRandomMotivationalQuote((error, quote) => {
                //unfreeze()

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

    const handleAuthClick = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) {
                    alert(error.message, 'error')

                    return
                }

                context.token = token
                onAuthClick();
            })

        } catch (error) {
            alert(error.message, 'warn')
        }
    }

    console.debug('Login -> render')

    return <div>
        <header className="header">
            <h1>App</h1>
        </header>
        <div className="login contenedor">
            <h3 className="centrar-texto">Acceso</h3>

            {quote && <p><q>{quote}</q></p>}

            <form className="formulario-login" onSubmit={handleAuthClick}>
                <div className="campo">
                    <label className="campo__label" for="email">E-mail</label>
                    <input className="campo__field" type="email" placeholder="Tu E-mail" id="email" required />
                </div>
                <div className="campo">
                    <label className="campo__label" for="password">Contraseña</label>
                    <input className="campo__field" type="password" placeholder="Tu contraseña" id="password" required />
                </div>

                <div className="campo">
                    <input type="submit" value="Acceder" className="boton boton--primario" />
                </div>
            </form>
            <p>Ir a <a href="" onClick={handleRegisterClick}>Registro</a></p>

        </div>
    </div>

}