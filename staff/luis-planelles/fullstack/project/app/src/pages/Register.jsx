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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <img
        src="/assets/logo.png"
        alt="Logo de la aplicación"
        className="w-20 h-20 mx-auto -mt-10 absolute left-1/2 transform -translate-x-1/2"
      />
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
  
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        
        <p className="text-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
  
}

export default Register