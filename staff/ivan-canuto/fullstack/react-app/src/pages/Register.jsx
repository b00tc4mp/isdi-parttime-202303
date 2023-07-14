import { registerUser } from "../logic/registerUser"
import { Container, Form, Input, Button } from "../library"
import { useAppContext } from "../hooks";
import { Link } from "react-router-dom"

export default function Register () {
  const { alert, navigate } = useAppContext()

  const handleRegisterIn = (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
      registerUser(name, email, password)
        .then(() => navigate('/login'))
        .catch(error => {
          alert(error.message, 'error')
          console.debug(error.stack)
        })
    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack);
    }
  }

  return <>
    <Container>
      <h1 className="text-black text-6xl my-4">Register</h1>

      <Form className="" onSubmit={handleRegisterIn}>
          <Input type="text" name="name" placeholder="name" />
          <Input type="email" name="email" placeholder="email" />
          <Input type="password" name="password" placeholder="password" />
          <Button type="submit">Register</Button>
      </Form>

      <p className="text-black">Go to <Link to="/Login" className="bg-gray-200 hover:bg-gray-300 px-1 rounded cursor-pointer">Login</Link></p>
    </Container>
  </>
}