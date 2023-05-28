import { context } from '../ui.js'
import authenticateUser from '../logic/authenticateUser.js'


export default function Login(props) {
    console.log('Login -> render')
    
    function handleRegisterClick(event) {
        event.preventDefault()
  
        props.onRegisterClick()
    }

    function handleLogin(event){
        event.preventDefault()
        
        const email = event.target.email.value
        const password = event.target.password.value
        
        try{
            
            const userId = authenticateUser(email, password)
            context.userId = userId

            props.onUserLoggedIn()
    
        } catch (error) {
            alert(error.message)
        }
    }

  
    return <div className="login container">
        <h1 className='title'> Log in</h1>
        
        <h2> New to myApp?  <a href="" onClick={handleRegisterClick}> Sign up </a></h2>

        <form className="form" onSubmit={handleLogin}>
            <input className='input' type='email' name='email' placeholder='Email address*'/>
            <input className='input' type='password' name='password' placeholder='Password (8+ characters)*'/>
            <button className= 'button' type='submit'> Log in </button>
        </form>

    </div>

}