import { registerUser } from "../logic/registerUser"
import { useContext } from 'react'
import Context from '../Context'


export default function Register({ onLoginClick, onUserRegistered }) {
    
    const { alert } = useContext(Context)

    function handleLoginClick(event) {
        event.preventDefault()
  
        onLoginClick()
    }

    function handleRegister(event){

        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            registerUser(name, email, password, error => {
                if(error){
                    alert(error.message)
                    return
                }

                onUserRegistered()
            })
    
        } catch (error) {
            alert(error.message)
        }
    }
    
    console.log('Register -> render')

    return <div className='register page'>
        <div className='container'>
        <h1 className ='title'> Sign up </h1>

        <h2> Already have an account? <a href="" onClick={handleLoginClick}> Log in </a></h2>

        <form className='form' onSubmit={handleRegister}>
            <input className='input' type='name' name='name' placeholder='Name*'/>
            <input className='input' type='email' name='email' placeholder='Email address*'/>
            <input className='input' type='password' name='password' placeholder='Password (8+ characters)*'/>
            <button className='button' type='submit'> CREATE AN ACCOUNT </button>

        </form>
        </div>
    </div>
}

