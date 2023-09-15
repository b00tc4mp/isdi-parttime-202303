import { isUserLoggedIn } from './logic'
import AppContext from './AppContext'
import { Login, Register, Home } from './view/pages'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getTheme, setTheme } from "./ui";
import { Alert } from './view/components'
import { LoaderContent } from './view/library'

const { Provider } = AppContext

function App() {
    const [feedback, setFeedback] = useState(null)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    useEffect(() => setTheme(getTheme()), [])

    const alert = (error, level = 'info') => setFeedback({ error, level })

    const handleOnAcceptAlert = () => setFeedback(null)

    const freeze = () => setLoader(true)
    const unfreeze = () => setLoader(false)

    return <Provider value={{ alert, navigate, freeze, unfreeze }}>
        <Routes>
            {(() => console.log('Routes -> render'))()}
            <Route path='/login' element={isUserLoggedIn() ? <Navigate to='/' /> : <Login />} />
            <Route path='/register' element={isUserLoggedIn() ? <Navigate to='/' /> : <Register />} />
            <Route path='/*' element={isUserLoggedIn() ? <Home /> : <Navigate to='/login' />} />
        </Routes>

        {/* <LoaderContent/> */}
        {loader && <LoaderContent />}
        {feedback && <Alert error={feedback.error} level={feedback.level} onAccept={handleOnAcceptAlert} />}
    </Provider>
}

export default App
