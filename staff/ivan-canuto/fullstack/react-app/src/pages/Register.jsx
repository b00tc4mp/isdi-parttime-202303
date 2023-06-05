import { registerUser } from "../logic/registerUser"
import './pages-styles/Register.css'
import Context from "../Context"
import { useContext } from "react"
import Form from "../library/Form";
import Input from "../library/Input";
import Button from "../library/Button";

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

      <Form className="register-form form" onSubmit={handleRegisterIn}>
          <Input className="input" type="text" name="name" placeholder="name" />
          <Input className="input" type="email" name="email" placeholder="email" />
          <Input className="input" type="password" name="password" placeholder="password" />
          <Button className="button" type="submit">Register</Button>
      </Form>

      <p>Go to <a href="" onClick={handleOnLogin}>Login</a></p>
    </div>
  </>
}