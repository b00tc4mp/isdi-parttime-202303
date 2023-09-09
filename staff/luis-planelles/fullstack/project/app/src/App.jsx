import { Navigate, Route, Routes } from 'react-router-dom';
import isUserLoggedIn from './logic/isUserLoggedIn';


import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  
  return (
          <Routes>
            <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
            <Route path="/" element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
          </Routes>
  );
};

export default App