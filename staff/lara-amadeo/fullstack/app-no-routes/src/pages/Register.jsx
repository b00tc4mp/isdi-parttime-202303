import { registerUser } from '../logic/registerUser'
import './Register.css'
import { useContext } from "react"
import Context from '../Context'
export default function Register({ onLogInLink, onSignUpButton }) {

    const { generateToast } = useContext(Context)

    function handleLogInClick(event) {
        event.preventDefault()

        onLogInLink()
    }

    function handleRegistration(event) {
        event.preventDefault()

        const name = event.target.username.value
        const email = event.target.email.value
        const password = event.target.password.value
        const repPassword = event.target.repPassword.value

        try {
            registerUser(name, email, password, repPassword)
                .then(() => onSignUpButton())
                .catch(error => {
                    generateToast(error.message, 'error')

                    return
                })
        } catch (error) {
            generateToast(error.message, 'error')
        }

    }

    return <div className="bg-[--violet-200] w-full flex justify-center items-center">
        <div className="centered-containers">
            <h1 className="title">Welcome stranger!</h1>

            <form className="centered-form" onSubmit={handleRegistration}>

                <label htmlFor="username" className="text-field-label">Username</label>
                <input type="text" name="username" className="text-field" />

                <label htmlFor="email" className="text-field-label">Email</label>
                <input type="text" name="email" className="text-field" />

                <label htmlFor="password" className="text-field-label">Password</label>
                <input type="password" name="password" className="text-field" />

                <label htmlFor="repPassword" className="text-field-label">Repeat password</label>
                <input type="password" name="repPassword" className="text-field" />

                <button className="button-S primary-button" type="submit">Sign up</button>
            </form>

            <div className="flex flex-row mt-[24px]">
                <p className="body-text">Already have an account? <a href="" className="link" onClick={handleLogInClick}>Log in</a></p>
            </div>
        </div>
    </div>
}