import { registerUser } from "../logic/registerUser"
import './pages-styles/Register.css'
import Context from "../Context"
import { useContext } from "react"
import Form from "../library/Form";
import Input from "../library/Input";
import Button from "../library/Button";
import Container from "../library/Container";

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
      unfreeze()
      alert(error.message, 'error')
      console.debug(error.stack);
    }
  }

  return <>
    <Container>
      <h1 className="title">Register</h1>

      <Form className="register-form form" onSubmit={handleRegisterIn}>
          <Input type="text" name="name" placeholder="name" />
          <Input type="email" name="email" placeholder="email" />
          <Input type="password" name="password" placeholder="password" />
          <Button type="submit">Register</Button>
      </Form>

      <p>Go to <a href="" onClick={handleOnLogin}>Login</a></p>
    </Container>
  </>
}