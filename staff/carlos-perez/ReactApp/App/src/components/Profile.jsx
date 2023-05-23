import { context } from '../main.js'
import { retrieveMailById } from '../logic/retrieveUserInfo'

export default function Profile() {
    console.log('Profile -> render')

    const name = context.userName;
    const email = retrieveMailById(context.userId);

    return <div className="profile-view">
        <button className="boton boton--primario button-close-profile">Cerrar</button>
        <div className="campo-viewonly">
            <label className="campo__label" for="profile-name">Nombre</label>
            <p className="profile-name" id="profile-name">{name}</p>
        </div>
        <div className="campo-viewonly">
            <label className="campo__label" for="profile-email">Correo</label>
            <p className="profile-email" id="profile-email">{email}</p>
        </div>

        <div className="mail-change">
            <div className="campo">
                <label className="campo__label" for="mail-old">Correo antiguo</label>
                <input className="campo__field mail-old" type="text" placeholder="Tu correo antiguo" id="mail-old"
                    required> </input>
            </div>

            <div className="campo">
                <label className="campo__label" for="mail-new">Correo nuevo</label>
                <input className="campo__field mail-new" type="text" placeholder="Tu correo nuevo" id="mail-new"
                    required> </input>
            </div>

            <div className="campo">
                <label className="campo__label" for="mail-new-check"> Repite correo nuevo</label>
                <input className="campo__field mail-new-check" type="text" placeholder="Tu correo nuevo"
                    id="mail-check-new" required> </input>
            </div>
            <div className="buttons">

                <button className="button-update-mail boton boton--primario">Actualizar</button>
                <button className="button-cancel-mail boton boton--primario">Cerrar</button>

            </div>
        </div>
        <div className="password-change">
            <div className="campo">
                <label className="campo__label" for="password-old">Contraseña antigua</label>
                <input className="campo__field password-old" type="password" placeholder="Tu contraseña antigua"
                    id="password-old" required> </input>
            </div>

            <div className="campo">
                <label className="campo__label" for="password-new">Contraseña nueva</label>
                <input className="campo__field password-new" type="password" placeholder="Tu contraseña nueva"
                    id="password-new" required> </input>
            </div>

            <div className="campo">
                <label className="campo__label" for="password-new-check"> Repite contraseña nueva</label>
                <input className="campo__field password-new-check" type="password" placeholder="Tu contraseña nueva"
                    id="password-new-check" required> </input>
            </div>

            <div className="buttons">

                <button className="button-update-password boton boton--primario">Actualizar</button>
                <button className="button-cancel-password boton boton--primario">Cerrar</button>

            </div>
        </div>
    </div>
}