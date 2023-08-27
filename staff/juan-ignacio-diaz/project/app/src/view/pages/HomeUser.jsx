import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Container, Button, Label } from '../library'
import { Profile, Lists, SearchUserModal, AddListModal, EditListModal } from '../components'

import { logoutUser, retrieveUser } from '../../logic'

import './Home.css'

import { DEFAULT_AVATAR_URL } from '../../constants'

export default function HomeUser() {
    console.log('Home -> render')
 
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const [user, setUser] = useState()
    const [view, setView] = useState('lists')
    const [modal, setModal] = useState(null)
    const [listId, setListId] = useState(null)
    const [lastUpdate, setLastUpdate] = useState(null)

    function changeMode(mode){
        if (mode) {
            if (mode === 'dark') document.querySelector(':root').classList.add('dark')
            else document.querySelector(':root').classList.remove('dark')
        }
        else document.querySelector(':root').classList.remove('dark')
    }

    useEffect(() => {
        ;(async () => {
            try{     
                freeze()     
                const user = await retrieveUser()
                unfreeze()

                setUser(user)
                changeMode(user.mode)
            } 
            catch (error) {
                unfreeze()
                alert(error.message)
            }
        })()
    }, [])

    const handleLogout = () => {
        logoutUser()

        navigate('/login')
    }

    const handleGoToProfile = (event) => {
        event.preventDefault()

        setView(view === 'lists' ? 'profile' : 'lists')
    }

    const handledEditedProfile = async () => {
        try{
            freeze()
            const user = await retrieveUser()
            unfreeze()

            setUser(user)
            changeMode(user.mode)       
        } 
        catch (error) {
            alert(error.message)
        }
        setView('profile')
    }

    const handleCloseModal = () => {
        setModal(null)
        setLastUpdate(Date.now())
    }

    const handleOpenSearchUser = () => {
        setModal('SearchUser')
    }

    const handleOpenNewList = () => {
        setModal('new-list')
    }

    const handleOpenEditList = (id) => {
        setListId(id)
        setModal('edit-list')
    }

    const handleGoToLists = () => setView('lists') 

    const handleGotoList = () => navigate('/list') 
       
    return <>
        <div className="home">
            <header className="home-header">
                <h1 className="title" onClick={handleGoToLists}>Home</h1>

                <nav className="home-header-nav"> 
                    {user && <>
                        <img className="home-header-avatar" src={user.avatar? user.avatar : DEFAULT_AVATAR_URL} alt=""/>
                        <a className = "name" href="" onClick={handleGoToProfile}>{user.name}</a>
                    </>}
                </nav>
                <Button name = "logout" onClick={handleLogout}>Logout</Button>   
            </header>

            <Container tag="main">               
                {view === 'lists' && <Lists 
                    onModifyedList={handleGoToLists}
                    onCreatedList={handleOpenNewList}
                    onEditedList={handleOpenEditList}
                    onGotoList={handleGotoList}
                    lastUpdate={lastUpdate}
                />} 

                {view === 'profile' && <Profile 
                    onEditedProfile={handledEditedProfile}
                    onSearchUser={handleOpenSearchUser} 
                    user={user}
                    lastUpdate={lastUpdate}
                />}
                
                {modal === 'SearchUser' && <SearchUserModal 
                    onCancel={handleCloseModal}
                    onModifyContact={handleCloseModal}
                />}

                {modal === 'new-list' && <AddListModal 
                    onCancel={handleCloseModal}
                    onCreatedList={handleCloseModal}
                />}

                
                {modal === 'edit-list' && <EditListModal 
                    onAccept={handleCloseModal}
                    onEditedList={handleCloseModal}
                    listId={listId}
                />} 

            </Container>

            <footer className="home-footer">

            </footer>
        </div>
    </>

}