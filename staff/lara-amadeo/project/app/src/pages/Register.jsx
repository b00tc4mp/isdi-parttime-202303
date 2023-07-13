import './Register.css'
import Context from "../Context.js"
import { useContext } from "react"
import Button from '../library/components/Button.jsx'
import Logo from "../library/components/Logo.jsx"
import TextField from '../library/components/TextField.jsx'
import Link from '../library/components/Link.jsx'
import { registerUser } from '../logic/registerUser'
import { context } from '../ui'


export default function Register({ onRegisterClick }) {
    const { loaderOn, loaderOff } = useContext(Context)

    const handleRegister = (event) => {
        event.preventDefault()

        const name = event.target.username.value
        const username = event.target.username.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            loaderOn()

            setTimeout(() => {
                registerUser(name, username, email, password)
                    .then(token => {
                        context.token = token
                        console.log(token)
                        loaderOff()
                        onRegisterClick()
                    })
                    .catch((error) => {
                        loaderOff()
                        console.log(error.message)
                    })
            }, 1000)

        } catch (error) {
            loaderOff()
            console.log(error.message)
        }
    }

    return <>
        <div className="page">
            <div className='register-container'>

                <div className="register-logo-container"><Logo /></div>

                <form className='register-form' onSubmit={handleRegister}>
                    <TextField type={'text'} label={'Name'} name={'name'} />
                    <TextField type={'text'} label={'Username'} name={'username'} />
                    <TextField type={'text'} label={'Email'} name={'email'} />
                    <TextField type={'password'} label={'Password'} name={'password'} />

                    <div className='register-actions'>
                        <div className='link-container'><Button type={'primary'} size={'small'} label={'Register'} /></div>
                        <Link label={'Sign on'} state={'default'} />
                    </div>
                </form>

            </div>
        </div>
    </>
}