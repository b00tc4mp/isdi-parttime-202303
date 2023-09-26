import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'
import { useAppContext }from '../hooks'
import Container from '../library/Container'

export default function Login({ onRegisterClick , onUserLoggedIn }) {
    
    const { alert } = useAppContext()

    function handleRegisterClick(event) {
        event.preventDefault()
  
        onRegisterClick()
    }

    function handleLogin(event){
        event.preventDefault()
        
        const email = event.target.email.value
        const password = event.target.password.value
        
        try{
            
            authenticateUser(email, password, (error, userId) => {
                if(error){
                    alert(error.message)
                    return
                }

                context.userId = userId
                onUserLoggedIn()
                
            })

        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Login -> render')

    return <Container tag="main">
        <h1 className='title'> Log in</h1>
        
        <h2> New to myApp?  <a href="" onClick={handleRegisterClick}> Sign up </a></h2>

        <form className="form" onSubmit={handleLogin}>
            <input className='input' type='email' name='email' placeholder='Email address*'/>
            <input className='input' type='password' name='password' placeholder='Password (8+ characters)*'/>
            <button className= 'button' type='submit'> Log in </button>
        </form>

    </Container>
}