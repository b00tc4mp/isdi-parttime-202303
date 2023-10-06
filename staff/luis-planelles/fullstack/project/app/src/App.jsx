import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AppContext from './AppContext';
import isUserLoggedIn from './logic/isUserLoggedIn';

import Home from './pages/Home';
import Login from './pages/Login';
import MissionDetail from './pages/MissionDetail';
import ParticipantConfirmation from './pages/ParticipantConfimation';
import Register from './pages/Register';

const { Provider } = AppContext

const App = () => {
  const navigate = useNavigate()
  
  return <Provider value={{ alert, navigate }}>
            <Routes>
              <Route path='/login' element={isUserLoggedIn() ? <Navigate to='/' /> : <Login />} />
              <Route path='/' element={isUserLoggedIn() ? <Home /> : <Navigate to='/login' />} />
              <Route path='/register' element={isUserLoggedIn() ? <Navigate to='/' /> : <Register />} />
              <Route path='/mission/:missionId' element={<MissionDetail />} />
              <Route path='/participant-feedback/:missionId/:participantId' element={<ParticipantConfirmation />} />
            </Routes>
          </Provider>
};

export default App