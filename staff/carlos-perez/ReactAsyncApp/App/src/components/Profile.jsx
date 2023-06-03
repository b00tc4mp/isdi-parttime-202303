import { context } from '../main.js'
import retrieveUser from '../logic/retrieveUser.js'
import { useState, useEffect } from 'react'

export default function Profile() {
    console.log('Profile -> render')

    const [user, setUser] = useState()

    useEffect(() => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setUser(user)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const name = user ? user.name : '';

    return <div className="profile-view">
        <button className="boton boton--primario button-close-profile">Cerrar</button>
        <div className="campo-viewonly">
            <label className="campo__label" htmlFor="profile-name">Nombre</label>
            <p className="profile-name" id="profile-name">{name}</p>
        </div>

        <div className="mail-change">
            <div className="campo">
                <label className="campo__label" htmlFor="mail-old">Correo antiguo</label>
                <input className="campo__field mail-old" type="text" placeholder="Tu correo antiguo" id="mail-old"
                    required/>
            </div>

            <div className="campo">
                <label className="campo__label" htmlFor="mail-new">Correo nuevo</label>
                <input className="campo__field mail-new" type="text" placeholder="Tu correo nuevo" id="mail-new"
                    required/> 
            </div>

            <div className="campo">
                <label className="campo__label" htmlFor="mail-new-check"> Repite correo nuevo</label>
                <input className="campo__field mail-new-check" type="text" placeholder="Tu correo nuevo"
                    id="mail-check-new" required/> 
            </div>
            <div className="buttons">

                <button className="button-update-mail boton boton--primario">Actualizar</button>
                <button className="button-cancel-mail boton boton--primario">Cerrar</button>

            </div>
        </div>
        <div className="password-change">
            <div className="campo">
                <label className="campo__label" htmlFor="password-old">Contraseña antigua</label>
                <input className="campo__field password-old" type="password" placeholder="Tu contraseña antigua"
                    id="password-old" required/> 
            </div>

            <div className="campo">
                <label className="campo__label" htmlFor="password-new">Contraseña nueva</label>
                <input className="campo__field password-new" type="password" placeholder="Tu contraseña nueva"
                    id="password-new" required/>
            </div>

            <div className="campo">
                <label className="campo__label" htmlFor="password-new-check"> Repite contraseña nueva</label>
                <input className="campo__field password-new-check" type="password" placeholder="Tu contraseña nueva"
                    id="password-new-check" required/>
            </div>

            <div className="buttons">

                <button className="button-update-password boton boton--primario">Actualizar</button>
                <button className="button-cancel-password boton boton--primario">Cerrar</button>

            </div>
        </div>
    </div>
}