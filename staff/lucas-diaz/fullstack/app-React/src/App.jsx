import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { context } from "./ui";
import Alert from "./components/Alert";
import AppContext from "./AppContext";
import CreateCube from "./components/CreateCube";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { utils } from "com"

const { Provider } = AppContext
const { isTokenAlive, isTokenValid } = utils

export default function App() {
  const [feedback, setFeedback] = useState(null)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const handleAcceptAlert = () => setFeedback(null)
  const freeze = () => setLoader(true);
  const unFreeze = () => setLoader(false);


  return <Provider value={{ Alert: setFeedback, freeze, unFreeze, navigate }}>
    <Routes>
      <Route path="/login" element={isTokenValid(context.token) && isTokenAlive(context.token) ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isTokenValid(context.token) && isTokenAlive(context.token) ? <Navigate to="/" /> : <Register />} />
      <Route path="/" element={isTokenValid(context.token) && isTokenAlive(context.token) ? <Home /> : <Navigate to="/login" />} />
    </Routes>

    {feedback && <Alert message={feedback} onAccept={handleAcceptAlert} />}
    {loader && <CreateCube />}
  </Provider>
}