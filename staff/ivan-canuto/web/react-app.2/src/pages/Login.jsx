import authenticateUser from "../logic/authenticateUser"
import { context } from "../ui"
import './pages-styles/Login.css'


export default function Login (props) {
  const handleRegisterClick = (event) => {
    event.preventDefault()

    props.onRegisterClick()
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
      context.userId = authenticateUser(email, password)
      props.onLoggedInUser()
      
    } catch (error) {
      alert(error)
      console.log(error);
    }
  }

  return <div className="login page container">
  <h1 className="title">Login</h1>

  <form className="login-form form" onSubmit={handleLogin}>
      <input className="input" type="email" name="email" placeholder="email" />
      <input className="input" type="password" name="password" placeholder="password" />
      <button className="button" type="submit">Login</button>
  </form>

  <p>Go to <a href="" onClick={handleRegisterClick}>Register</a></p>
</div>
}