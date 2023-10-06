import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks';
import authenticateUser from '../logic/loginUser';
import retrieveMotivationalQuote from '../logic/retrieveMotivationalQuote';

const Login = () => {
  
  const { alert, freeze, unfreeze, navigate } = useAppContext()
  const [quote, setQuote] = useState(null)

  useEffect(() => {
      try {
          freeze()

          retrieveMotivationalQuote().then((quote) => {
            unfreeze()
            
            setQuote(quote)

          }).catch((error) => alert(error.message))
      } catch (error) {
          alert(error.message)
      }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    
    const email = event.target.email.value,
    password = event.target.password.value;

    try {
      authenticateUser(email, password)
      .then(() => navigate('/'))
      .catch((error) => alert(error.message))

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
      
      <p><Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login 