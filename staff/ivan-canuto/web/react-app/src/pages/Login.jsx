import authenticateUser from "../logic/authenticateUser"
import { context } from "../ui"
import './pages-styles/Login.css'
import Context from "../Context"
import { useContext, useEffect, useState } from "react"
import retrireveRandomMotivationalQuote from "../logic/retrieveRandomMotivationalQuote"

export default function Login ({ onRegisterClick, onLoggedInUser }) {
  const { alert, freeze, unfreeze } = useContext(Context)
  const [quote, setQuote] = useState()

  const handleRegisterClick = (event) => {
    event.preventDefault()

    onRegisterClick()
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
      freeze()

      authenticateUser(email, password, (error, userId) => {
        unfreeze()

        if(error) {
          alert(error.message, 'error')
          console.debug(error.stack)
          return
        }

        context.userId = userId
        
        onLoggedInUser()
      })
      
    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack)
    }
  }

  useEffect(() => {
    try {
      freeze()

      retrireveRandomMotivationalQuote((error, newQuote) => {
        unfreeze()
        
        if(error) {
          alert(error.message, 'error')
          console.log(error.stack)
          
          return
        }
        
        setQuote(newQuote)
      })
    } catch (error) {
      alert(error.message, 'error')
      console.log(error.stack)
    }
  }, [])

  console.log('login -> render');

  return <div className="login page container">
  <h1 className="title">Login</h1>

  {quote && <p><q className="login-quote">{quote}</q></p>}

  <form className="login-form form" onSubmit={handleLogin}>
      <input className="input" type="email" name="email" placeholder="email" />
      <input className="input" type="password" name="password" placeholder="password" />
      <button className="button" type="submit">Login</button>
  </form>

  <p>Go to <a href="" onClick={handleRegisterClick}>Register</a></p>
</div>
}