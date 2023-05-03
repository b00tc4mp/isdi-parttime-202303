export default function Register(props) {
    function handleLoginClick(event) {
        event.preventDefault()

        props.onLoginClick()
    }
    return <div>
        <header className="header">
            <h1>App</h1>
        </header>
        <div className="registro contenedor">
            <h3 className="centrar-texto">Registro</h3>

            <form className="formulario">
                <div className="campo">
                    <label className="campo__label" for="nombre">Nombre</label>
                    <input className="campo__field register-input" type="text" placeholder="Tu Nombre" id="nombre" required/>
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