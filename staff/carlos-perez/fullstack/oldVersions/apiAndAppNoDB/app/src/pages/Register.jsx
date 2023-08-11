import registerUser from '../logic/registerUser.js'

export default function Register({ onLoginClick, onUserRegistered }) {
    function handleLoginClick(event) {
        event.preventDefault()

        onLoginClick()
    }

    const handleRegister = function (event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            registerUser(name, email, password, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onUserRegistered()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    console.debug('Register -> render');

    return <div>
        <header className="header">
            <h1>App</h1>
        </header>
        <div className="registro contenedor">
            <h3 className="centrar-texto">Registro</h3>

            <form className="formulario" onSubmit={handleRegister}>
                <div className="campo">
                    <label className="campo__label" for="nombre">Nombre</label>
                    <input className="campo__field register-input" type="text" placeholder="Tu Nombre" id="name" required/>
                </div>
                <div className="campo">
                    <label className="campo__label" for="email">E-mail</label>
                    <input className="campo__field register-input" type="email" placeholder="Tu E-mail" id="email" required/>
                </div>
                <div class="campo">
                    <label className="campo__label" for="password">Contraseña</label>
                    <input className="campo__field register-input" type="password" placeholder="Tu contraseña" id="password"required/>
                </div>

                <div className="campo">
                    <input type="submit" value="Enviar" className="boton boton--primario"/>
                </div>

                <p>Ir a <a href="" onClick={handleLoginClick}>Acceso</a></p>
            </form>

        </div>
    </div>
}