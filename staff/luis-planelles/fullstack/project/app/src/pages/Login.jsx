import { useState } from 'react';
import { Link } from 'react-router-dom';
import AboutToPlay from '../components/AboutToPlay';
import { useAppContext } from '../hooks';
import loginUser from '../logic/loginUser';

const Login = () => {
  const { navigate } = useAppContext();

  const [aboutToPlay, setAboutToPlay] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value,
      password = event.target.password.value;

    try {
      loginUser(email, password)
        .then(() => navigate('/'))
        .catch((error) => alert(error.message));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAboutToPlay = () => setAboutToPlay(true)

  const handleClose = () => setAboutToPlay(false)
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <img src="/assets/logo.png" style={{ width: '14rem' }} alt="Logo" />
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mt-4">
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
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto mt-4"
          onClick={handleAboutToPlay}
        >
          About to play
        </button>
        {aboutToPlay && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-md">
              <AboutToPlay 
              onClose={handleClose}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;