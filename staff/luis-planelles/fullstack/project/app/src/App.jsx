import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AppContext from './AppContext';
import isUserLoggedIn from './logic/isUserLoggedIn';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const { Provider } = AppContext

const App = () => {
  const navigate = useNavigate()
  
  return <Provider value={{ alert, navigate }}>
            <Routes>
              <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
              <Route path="/" element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
              <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
            </Routes>
          </Provider>
};

export default App