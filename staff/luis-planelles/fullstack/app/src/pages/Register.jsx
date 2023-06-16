
import { useAppContext } from '../hooks';
import { Button, Container, Form, Input } from '../library';
import registerUser from '../logic/registerUser.js';

const Register = ({onLoginClick, onUserRegistered}) => {
  const { alert } = useAppContext()
  
  const handleLoginClick = (event) => {
    event.preventDefault()

    onLoginClick()
  },

  Handleregister = (event) => {
    event.preventDefault()

    const name = event.target.name.value,
      email = event.target.email.value,
      password = event.target.password.value;

    try {
      registerUser(name, email, password, error => {
        
        if (error) {
          alert(error.message)
          
          return
        }
        
        onUserRegistered()
      })
    
    } catch (error) {
      alert(error.message)
    }
  };    

  return <Container tag="main">
  <h1 className="title">Register</h1>

  <Form onSubmit={Handleregister}>
      <Input type="text" name="name" placeholder="name" />
      <Input type="email" name="email" placeholder="email" />
      <Input type="password" name="password" placeholder="password" />
      <Button type="submit">Register</Button>
  </Form>

  <p>Go to <a href="" onClick={handleLoginClick}>Login</a></p>
</Container>
}

export default Register