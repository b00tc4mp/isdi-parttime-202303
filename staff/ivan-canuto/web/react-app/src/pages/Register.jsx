import { registerUser } from "../logic/registerUser"
import './pages-styles/Register.css'
import Context from "../Context"
import { useContext } from "react"


export default function Register ({ onLoginClick, onRegisterUser }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const handleOnLogin = (event) => {
    event.preventDefault()

    onLoginClick()
  }

  const handleRegisterIn = (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
      freeze()

      registerUser(name, email, password, (error)=> {
        unfreeze()

        if(error) {
          alert(error.message, 'error')
          console.debug(error.stack)
          return
        }
          
          onRegisterUser()
      })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack);
    }
  }

  return <>
    <div className="register page container">
      <h1 className="title">Register</h1>

      <form className="register-form form" onSubmit={handleRegisterIn}>
          <input className="input" type="text" name="name" placeholder="name" />
          <input className="input" type="email" name="email" placeholder="email" />
          <input className="input" type="password" name="password" placeholder="password" />
          <button className="button" type="submit">Register</button>
      </form>

      <p>Go to <a href="" onClick={handleOnLogin}>Login</a></p>
    </div>
  </>
}