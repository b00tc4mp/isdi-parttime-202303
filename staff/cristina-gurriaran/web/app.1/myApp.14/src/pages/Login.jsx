export default function Login(props) {
    function handleRegisterClick(event) {
        event.preventDefault()
  
        props.onRegisterClick()
    }
  
    return <div className="login container">
        <h1 className='title'> Log in</h1>
        
        <h2> New to myApp?  <a href="" onClick={handleRegisterClick}> Sign up </a></h2>

        <form className="form">
            <input className='input' type='email' name='email' placeholder='Email address*'/>
            <input className='input' type='password' name='password' placeholder='Password (8+ characters)*'/>
            <button className= 'button' type='submit'> Log in </button>
        </form>

    </div>

  }
