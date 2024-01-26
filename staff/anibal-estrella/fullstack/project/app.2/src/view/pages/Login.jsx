import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useAppContext } from '../hooks'

import registerUser from '../../logic/users/registerUser';
import retrieveUserEmail from '../../logic/users/retrieveUserEmail';
import { Button } from '../library'

const Login = ({ city, ipGeoLocation }) => {
    console.debug('// Login/Register  -> Render');
    // const { alert, freeze, unfreeze, navigate } = useAppContext()
    const [showPasswordLayer, setShowPasswordLayer] = useState(null);
    const [email, setEmail] = useState("");

    function handleLoginEmail(event) {
        event.preventDefault()
        const userEmail = event.target.email.value;
        setEmail(userEmail)
        try {
            retrieveUserEmail(userEmail)
                .then(() => {
                    alert(`${userEmail} is in our db!`)
                    setShowPasswordLayer(true)
                })
                .catch(error => {
                    alert(error.message)
                    setShowPasswordLayer(false)
                })

        } catch (error) {
            alert(error.message)
        }
    }

    function handleRegister(event) {
        event.preventDefault()
        const name = event.target.name.value
        const nickName = event.target.nickName.value
        const password = event.target.password.value
        const repeatPassword = event.target.repeatPassword.value

        try {
            // freeze()
            registerUser(name, nickName, email, password, repeatPassword, city, ipGeoLocation)
                .then(() => alert('user registered!'))
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
            {city && <p>Your City: {city} </p>}
            {city && <p>Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </p>}
        </div >

        {showPasswordLayer === null && (
            <div id='login-register' className="p-4">
                <h2>Register / Login</h2>
                <form action="" onSubmit={handleLoginEmail}>
                    <label htmlFor="email">E-mail:</label>
                    <input type="text" className="email" name="email" placeholder="Enter your e-mail" autoComplete="on" />
                    <Button type="submit" value="validateEmail">next</Button>
                </form>
            </div>
        )}

        {showPasswordLayer === true && (
            <div id='login'>
                <form action="" onSubmit={handleLogin}>
                    <label htmlFor="Email">Email:</label>
                    <p>{email}</p>
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="on" />
                    <Button type="submit" value="loginUser">login</Button>
                </form>
            </div>
        )}

        {showPasswordLayer === false && (
            <div id="register" tag='section' className="p-4" >
                <h2>Register </h2>
                <form method="get" className="register-form border-top-gradient" onSubmit={handleRegister}>
                    <label htmlFor="Email">Email:</label>
                    <p>{email}</p>
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="name" name="name" placeholder="Enter your name" autoComplete="enter name" />

                    <label htmlFor="nickName"> Nick name:</label>
                    <input type="text" className="nickName" name="nickName" placeholder="Enter your nickName" autoComplete="on" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="off" />

                    <label htmlFor="password">Repeat password:</label>
                    <input type="password" className="password" name="repeatPassword" placeholder="Repeat your password" autoComplete="off" />
                    <Button type="submit" value="register">Register</Button>
                </form>
            </ div >
        )}
    </div>
}

export default Login;