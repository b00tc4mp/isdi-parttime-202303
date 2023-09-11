import { errors } from 'com';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks';
import registerUser from '../logic/registerUser.js';

const {
    ContentError,
    DuplicityError
} = errors

const Register = () => {
  const { navigate} = useAppContext()
  
  const handleRegister = (event) => {
    event.preventDefault()

    const name = event.target.name.value,
      email = event.target.email.value,
      password = event.target.password.value;

    try {
      registerUser(name, email, password)
      .then(() => navigate('/login'))
      .catch(error => {
        if (error instanceof DuplicityError)
            alert(error.message, 'warn')
            
        else alert(error.message, 'error')
    })
    } 
    catch (error) {
      if (error instanceof RangeError)
        alert(error.message, 'warn')

      else if (error instanceof ContentError)
        alert(error.message, 'error')
      
      else alert(error.message)
    }
  };    

  return <div tag="main">
  <h1 className="title">Register</h1>

  <form onSubmit={handleRegister}>
      <input type="text" name="name" placeholder="name" />
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Register</button>
  </form>

  <p><Link to="/login">Login</Link></p>
</div>
}

export default Register