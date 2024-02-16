import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useAppContext } from '../hooks'

import { loginUser, retrieveUserEmail, registerUser, retrieveUser } from '../../logic/users/';
import { Button } from '../library'

const Login = ({ city, ipGeoLocation, user }) => {
    console.debug('// Login/Register  -> Render');
    const { alert, freeze, unfreeze, navigate } = useAppContext()
    const [showPasswordLayer, setShowPasswordLayer] = useState(null);
    const [email, setEmail] = useState("");

    function handleLoginEmail(event) {
        event.preventDefault()
        const userEmail = event.target.email.value;
        setEmail(userEmail)
        try {
            freeze()
            retrieveUserEmail(userEmail)
                .then(() => {
                    alert(`${userEmail} is in our db!`)
                    setShowPasswordLayer(true)
                })
                .catch(error => {
                    alert(error.message)
                    if (error.status === 406) {
                        setShowPasswordLayer(null)
                    } else {
                        setShowPasswordLayer(false)
                    }
                })

        } catch (error) {
            unfreeze()
            alert(error.message)
        }
        unfreeze()
    }

    const handleLogin = async event => {
        event.preventDefault();
        const password = event.target.password.value;

        try {
            freeze();
            await loginUser(email, password);
            const userData = await retrieveUser();
            navigate('/', { state: { user: userData } })

        } catch (error) {
            unfreeze();
            alert(error.message, 'error');
        } finally {
            unfreeze();
        }
    };


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

    const handleCancel = () => {
        setShowPasswordLayer(null);
    }

    return <div className='flex flex-col items-center px-4'>
        <div className='self-start'>
            {city && <p>Your City: {city} </p>}
            {city && <p>Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </p>}
        </div >

        {showPasswordLayer === null && (
            <div id='login-register' className="p-4">
                <h2>Register / Login</h2>
                <form action="" onSubmit={handleLoginEmail}>
                    <label htmlFor="email">E-mail:</label>
                    <input type="text" className="h-10" name="email" placeholder="Enter your e-mail" autoComplete="on" autoFocus />
                    <Button type="submit" value="validateEmail">continue with email</Button>
                </form>
            </div>
        )}

        {showPasswordLayer && (
            <div id='login'>
                <form action="" onSubmit={handleLogin}>
                    <label htmlFor="Email">Email:</label>
                    <p>{email}</p>
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="on" autoFocus />
                    <Button type="submit" value="loginUser">Continue with password</Button>
                </form>
            </div>
        )}

        {showPasswordLayer === false && (
            <div id="register" tag='section'  >
                <h2>Register </h2>
                <label htmlFor="Email">Email:</label>
                <p>There's no related account by the <span className=' font-bold'>{email}</span> email.</p>
                <form method="get" className="grid grid-cols-2 gap-4" onSubmit={handleRegister}>

                    <div>

                        <label htmlFor="name">Name:</label>
                        <input type="text" className="name" name="name" placeholder="Enter your name" autoComplete="enter name" autoFocus />
                    </div>
                    <div>

                        <label htmlFor="nickName">Nick name:</label>
                        <input type="text" className="nickName" name="nickName" placeholder="Enter your nickName" autoComplete="on" />
                    </div>
                    <div>

                        <label htmlFor="password">Password:</label>
                        <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="off" />

                    </div>
                    <div>
                        <label htmlFor="password">Repeat password:</label>
                        <input type="password" className="password" name="repeatPassword" placeholder="Repeat your password" autoComplete="off" />
                    </div>
                    <Button type="button" className={'button-cancel hover:button-cancel-hover'} onClick={handleCancel}>Cancel</Button>

                    <Button type="submit" value="register" on>Register</Button>
                </form>
            </ div >
        )}
    </div>
}

export default Login;