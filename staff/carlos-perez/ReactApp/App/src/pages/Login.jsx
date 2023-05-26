
import {authenticateUser} from '../logic/authenticateUser.js'
import {context} from '../main.js'

export default function Login(props) {
    function handleRegisterClick(event) {
        event.preventDefault()

        props.onRegisterClick()
    }

    function handleAuthClick(event){
        event.preventDefault();
        //login
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        try {
            let activeUser=authenticateUser(email, password);
            context.userId=activeUser.id;
            context.userName=activeUser.name;
            props.onAuthClick();
        }
        catch (error) {
           alert(error.message);
        }
    }

    return <div>
        <header className="header">
            <h1>App</h1>
        </header>
        <div className="login contenedor">
            <h3 className="centrar-texto">Acceso</h3>

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