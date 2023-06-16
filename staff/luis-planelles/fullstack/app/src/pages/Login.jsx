import { useEffect, useState } from 'react';
import { useAppContext } from '../hooks';
import authenticateUser from '../logic/authenticateUser';
import retrieveMotivationalQuote from '../logic/retrieveMotivationalQuote';
import { context } from '../ui';

const Login = ({onRegisterClick, onUserLoggedIn}) => {
  
  const { alert, freeze, unfreeze } = useAppContext()
  const [quote, setQuote] = useState(null)

  useEffect(() => {
      try {
          freeze()

          retrieveMotivationalQuote((error, quote) => {
              unfreeze()

              if (error) {
                  alert(error.message)

                  return
              }
              setQuote(quote)
          })
      } catch (error) {
          alert(error.message)
      }
  }, [])

  const HandleregisterClick = (event) => { 
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

      {quote && <p><q>{quote}</q></p>}

      <form className="form" onSubmit={handleLogin}>
        <input className="input" type="email" name="email" placeholder="email"/>
        <input className="input" type="password" name="password" placeholder="password"/>
        <button className="button"type="submit"> Login </button>
      </form>
      
      <p><a href="" onClick={HandleregisterClick}> Register </a> </p>
    </div>
  );
}

export default Login 