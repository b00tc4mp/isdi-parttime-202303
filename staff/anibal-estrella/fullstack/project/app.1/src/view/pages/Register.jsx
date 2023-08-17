import { useEffect, useState } from 'react';
import registerUser from '../../logic/users/registerUser';
import { Button } from '../library'
import retrieveArtistDetailsFromDiscogs from '../../logic/retrieveArtistDetailsFromDiscogs';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Register = () => {
    const [Register, setRegister] = useState(null);
    const [error, setError] = useState(null); // Add state for error

    function handleRegister(event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const repeatPassword = event.target.repeatPassword.value

        // handle synchronous errors with TRY/CATCH
        try {
            freeze()
            //handle asynchronous errors with a CALLBACK
            registerUser(name, email, password, repeatPassword)
                .then(() => navigate('/login'))
                .catch(error => alert(error.message))

            unfreeze()

        } catch (error) {
            alert(error.message)
            unfreeze()

        }
        unfreeze()
    }

    return <div className="center-xy">
        < Panel id="register" tag='section' className="p-4" >
            <h2>Register</h2>
            <form method="get" className="register-form border-top-gradient" onSubmit={handleRegister}>

                <label htmlFor="name">Name:</label>
                <input type="text" className="name" name="name" placeholder="Enter your name" autoComplete="enter name" />

                <label htmlFor="email">E-mail:</label>
                <input type="text" className="email" name="email" placeholder="Enter your e-mail" autoComplete="enter email" />

                <label htmlFor="password">Password:</label>
                <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="enter password" />

                <label htmlFor="password">Repeat password:</label>
                <input type="password" className="password" name="repeatPassword" placeholder="Repeat your password" autoComplete="enter password" />
                <Button type="submit" value="register">Register</Button>
            </form>

            <p className="goto-login border-top-gradient">
                Already registered? <br />
                Login <Link to="/login">here</Link>.
            </p>
        </ Panel >
    </div>
}


export default Register;
