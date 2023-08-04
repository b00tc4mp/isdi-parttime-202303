import { useState } from "react"
import { useAppContext } from "../hooks"
import { Button, Container } from "../library"
import { Profile, Posts, SideBarMenu, Header, VisibilityPost, DeletePost } from '../components'
import { logoutUser, retrieveUser } from '../../logic'
import { Routes, Route, Navigate } from 'react-router-dom'
import { isUserLoggedIn } from '../../logic'
import { Chatbot, Suggestions, SeenLately, MainPage } from '../components'
import Hello from "../components/Hello"

export default function Home() {
    const [modal, setModal] = useState(null)
    const [menu, setMenu] = useState(false)
    const [user, setUser] = useState(null)
    const [openedMenu, setOpenedMenu] = useState(false)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
    const { navigate } = useAppContext()

    // useEffect(() => {
    //   try {
    //     retrieveUser()
    //       .then(setUser)
    //       .catch(error => {
    //         alert(error.message, 'error')
    //         console.debug(error.stack)
    //       })

    //   } catch (error) {
    //     alert(error.message, 'error')
    //     console.debug(error.stack)
    //   }
    // }, [])

    // const handleReturnToHome = () => {
    //   setView("posts")
    //   setLastPostsUpdate(Date.now())
    // }

    const handleOpenProfile = () => {
        document.body.classList.add("fixed-scroll")
        setModal("profile")
    }

    const handleLogout = () => {
        logoutUser()

        navigate('/login')
    }

    const handleToggleMenu = () => {
        if (!menu) {
            setMenu(!menu)
            setOpenedMenu(!openedMenu)
        } else {
            setTimeout(() => {
                setMenu(!menu)
            }, 400);
            setOpenedMenu(!openedMenu)
        }
    }

    const handleUpdatedAvatar = () => {
        try {
            retrieveUser()
                .then(user => {
                    setUser(user)
                    setLastPostsUpdate(Date.now())
                })
                .catch(error => {
                    alert(error.message, 'error')
                    console.debug(error.stack)
                })

        } catch (error) {
            alert(error.message, 'error')
            console.debug(error.stack)
        }
    }

    

    const handleOpenChatbotWindow = async () => navigate('/chatbot')

    console.debug("Home -> render")

    return (
        <Container className="bg-home h-full min-h-screen pt-20">
            <div className="loader"></div>
            <Button className='absolute top-[105px] right-2 bg-slate-200' onClick={handleOpenChatbotWindow}>Chat wit me</Button>

            <Header
                handleToggleMenu={handleToggleMenu}
                // handleReturnToHome={handleReturnToHome}
                handleOpenProfile={handleOpenProfile}
                handleLogout={handleLogout}
            />

            <main>
                {modal === "profile" && (
                    <Profile
                        onUpdatedAvatar={handleUpdatedAvatar}
                        onCancel={handleCloseModal}
                    />
                )}

                {menu && (
                    <SideBarMenu
                        // showHomePage={handleReturnToHome}
                        showOwnPosts={showOwnPosts}
                        showSavedPosts={showSavedPosts}
                        openedMenu={openedMenu}
                        handleToggleMenu={handleToggleMenu}
                        page={'home'}
                    />
                )}

                <Routes>
                    <Route path="hello" element={<Hello />}></Route>
                    <Route path='chatbot' element={isUserLoggedIn() ? <Chatbot/> : <Navigate to='/login'/>}/>
                    <Route path='suggestions' element={isUserLoggedIn() ? <Suggestions/> : <Navigate to='/login'/>} />
          <Route path='/seen-lately' element={isUserLoggedIn() ? <SeenLately/> : <Navigate to='/login'/>} />
                </Routes>
            </main>
        </Container>
    )
}