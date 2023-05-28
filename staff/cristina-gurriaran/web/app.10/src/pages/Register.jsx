import { registerUser } from "../logic/registerUser"


export default function Register(props) {
    
    function handleLoginClick(event) {
        event.preventDefault()
  
        props.onLoginClick()
    }

    function handleRegister(event){

        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            registerUser(name, email, password)
            
            props.onUserRegistered()

        } catch (error) {
            alert(error.message)
        }
    }
    
    console.log('Register -> render')

    return <div className="register page container">
        <h1 className ='title'> Sign up </h1>

        <h2> Already have an account? <a href="" onClick={handleLoginClick}> Log in </a></h2>

        <form className='form' onSubmit={handleRegister}>
            <input className='input' type='name' name='name' placeholder='Name*'/>
            <input className='input' type='email' name='email' placeholder='Email address*'/>
            <input className='input' type='password' name='password' placeholder='Password (8+ characters)*'/>
            <button className='button' type='submit'> Create an account </button>

        </form>
    </div>
}

