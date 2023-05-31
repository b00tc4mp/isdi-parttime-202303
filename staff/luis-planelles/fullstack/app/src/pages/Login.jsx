import authenticateUser from '../logic/authenticateUser.js';
import { context } from '../ui.js';

const Login = ({onRegisterClick, onUserLoggedIn}) => {

  const handleRegisterClick = (event) => { 
    event.preventDefault();

    onRegisterClick();
  },

  handleLogin = (event) => {
    event.preventDefault()
    
    const email = event.target.email.value,
    password = event.target.password.value;

    try {
      authenticateUser(email, password, (error, userId) => {
        
        if (error) {
          alert(error.message)

          return 
        } 

        context.userId = userId
        
        onUserLoggedIn()
      })

    }catch (error) {
      alert(error.message)
    }

  };

  return (
    <div className="login page container">
      <h1 className="title">Login</h1>

      <form className="form" onSubmit={handleLogin}>
        <input className="input" type="email" name="email" placeholder="email"/>
        <input className="input" type="password" name="password" placeholder="password"/>
        <button className="button"type="submit"> Login </button>
      </form>
      
      <p><a href="" onClick={handleRegisterClick}> Register </a> </p>
    </div>
  );
}

export default Login 