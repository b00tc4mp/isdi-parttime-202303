import { useContext } from 'react'

import Context from '../context'

import registerUser from "../logic/registerUser"

export default function Register({ onLoginClick, onRegistered}) {
    const { alert } = useContext(Context)

    function handleLoginClick(event) {
        event.preventDefault()

        onLoginClick()
    }

    function handleRegister(event) {
        event.preventDefault()

        event.target.name.classList.remove("imput-highlight")
        event.target.email.classList.remove("imput-highlight")
        event.target.password.classList.remove("imput-highlight")
    
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
    
        try {
            registerUser(name, email, password, error => {
                if (error) {
                    alert(error.message)

                    return
                }
            })
            event.target.reset()
            onRegistered()
        }
        catch (error) {
            alert(error.message)
    
            if (error.cause === "email") { 
                event.target.email.focus()
                event.target.email.classList.add("imput-highlight")
            }
            else if (error.cause === "name") {
                event.target.name.focus()
                event.target.name.classList.add("imput-highlight")
            }
            else if (error.cause === "password") { 
                event.target.password.focus()
                event.target.password.classList.add("imput-highlight")
            }
        }    
    
    }

    return <>
        <div className="register page container">
            <h1 className="title">Register</h1>

            <form className="form" action="" onSubmit={handleRegister}>
                <label className="title" htmlFor="nameRegister">Name: </label>
                <input className="input" type="text" name="name" placeholder="name" />
                <label className="title" htmlFor="emailRegister">E-mail: </label>
                <input className="input" type="email" name="email" placeholder="usuario@dominio.com" />
                <label className="title" htmlFor="passwordRegister">Password: </label>
                <input className="input" type="password" name="password" placeholder="password" /><br/>
                <button className = "button" type="submit">Register</button>
            </form>
            <p>Go to <a href="" onClick={handleLoginClick}>Login</a></p>
        </div>
    </>
}