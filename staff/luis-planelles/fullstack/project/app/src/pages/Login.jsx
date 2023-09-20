import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks';
import loginUser from '../logic/loginUser';

const Login = () => {
  const { navigate} = useAppContext()

  const handleLogin = (event) => {
    event.preventDefault()
    
    const email = event.target.email.value,
    password = event.target.password.value;

    try {
      loginUser(email, password)
      .then(() => navigate('/'))
      .catch((error) => alert(error.message))

    }catch (error) {
      alert(error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
      <img
        src="/assets/logo.png"
        alt="Logo de la aplicación"
        className="w-20 h-20 mx-auto -mt-10 absolute left-1/2 transform -translate-x-1/2"
      />
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
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
              Login
            </button>
          </div>
        </form>
        
        <p className="text-center mt-4">
          <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
  }  

export default Login 