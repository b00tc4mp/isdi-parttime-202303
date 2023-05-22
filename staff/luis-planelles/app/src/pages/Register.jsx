import registerUser from '../logic/registerUser.js';

function Register(props) {
  
  function handleLoginClick(event) {
    event.preventDefault()

    props.onLoginClick()
  }

  function handleRegister(event) {
    event.preventDefault()

    const name = event.target.name.value,
    email = event.target.email.value,
    password = event.target.password.value;

    try {
      registerUser(name, email, password) 

      props.onUserRegistered()
    
    } catch (error) {
      alert(error.message)
    }
  }    

return <div className="register page container">
    <h1 className="title">Register</h1>

    <form className="form" onSubmit={handleRegister}>
        <input className="input" type="text" name="name" placeholder="name" />
        <input className="input" type="email" name="email" placeholder="email" />
        <input className="input" type="password" name="password" placeholder="password" />
        <button className="button" type="submit" >Register</button>
    </form>

    <p>Go to <a href="" onClick={handleLoginClick}>Login</a></p>
</div>
}

export default Register