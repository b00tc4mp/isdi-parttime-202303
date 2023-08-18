import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useAppContext } from '../hooks'

import registerUser from '../../logic/users/registerUser';
import { Button } from '../library'

const Login = ({ city, ipGeoLocation }) => {
    console.debug('// Login/Register  -> Render');

    const [error, setError] = useState(null);

    // const { alert, freeze, unfreeze, navigate } = useAppContext()

    function handleRegister(event) {
        event.preventDefault()
        debugger
        const name = event.target.name.value
        const nickName = event.target.nickName.value
        const email = event.target.email.value
        const password = event.target.password.value
        const repeatPassword = event.target.repeatPassword.value

        try {
            // freeze()
            registerUser(name, nickName, email, password, repeatPassword, city, ipGeoLocation)
                .then(() => navigate('/login'))
                .catch(error => alert(error.message))
            console.log(ipGeoLocation);
            // unfreeze()
        } catch (error) {
            alert(error.message)
            // unfreeze()

        }
        // unfreeze()
    }

    return <div>
        <div className='m-2'>
            {city && <h2>Your City: {city} </h2>}
            {city && <h2>Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </h2>}
        </div >

        <div id='login-register' className="p-4">
            <h2>Register / Login</h2>
            <form action="">
                <label htmlFor="email">E-mail:</label>
                <input type="text" className="email" name="email" placeholder="Enter your e-mail" autoComplete="enter email" />
                <Button type="submit" value="validateEmail">next</Button>
            </form>
        </div>

        <div id='login'></div>
        <form action="">
            <label htmlFor="password">Password:</label>
            <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="enter password" />
            <Button type="submit" value="loginUser">login</Button>
        </form>

        <div id="register" tag='section' className="p-4" >
            <form method="get" className="register-form border-top-gradient" onSubmit={handleRegister}>

                <label htmlFor="name">Name:</label>
                <input type="text" className="name" name="name" placeholder="Enter your name" autoComplete="enter name" />

                <label htmlFor="nickName"> Nick name:</label>
                <input type="text" className="nickName" name="nickName" placeholder="Enter your nickName" autoComplete="enter nickName" />

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
        </ div >
    </div>
}

export default Login;