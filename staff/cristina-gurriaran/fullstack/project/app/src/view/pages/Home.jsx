import Workspots from '../components/Workspots'
import WorkspotsSearchedByName from '../components/WorkspotsSearchedByName'
import AddWorkspotModal from '../components/AddWorkspotModal'
import EditWorkspotModal from '../components/EditWorkspotModal'
import FilterModal from '../components/FiltersModal'
import FilteredWorkspots from '../components/FilteredWorkspots'
import { Container, Form, Input, Button } from '../library'
import { useEffect, useState, useRef } from 'react'
import Profile from '../components/Profile'
import retrieveUser from '../../logic/retrieveUser'
import './Home.css'
import { LOGO_URL } from "../../data.js"
import { useAppContext, useHandleErrors } from '../hooks'
import logoutUser from '../../logic/logoutUser'


export default function Home() {
    const { navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const [view, setView] = useState('workspots')
    const [modal, setModal] = useState(null)
    const [workspotId, setworkspotId] = useState(null)
    const [lastWorkspotsUpdate, setLastWorkspotsUpdate] = useState(null)
 
    const [user, setUser] = useState()
    const [nameSearched, setNameSearched] = useState(null)

    useEffect(() => {
        handleErrors(async () => {
            const user = await retrieveUser()
            setUser(user)
        })
    }, [])

    const handleOpenAddWorkspotModal = () => setModal('add-workspot')

    const handleOpenEditWorkspotModal = (workspotId) => {
        setModal('edit-workspot')
        setworkspotId(workspotId)
    }

    const handleCloseModal = () => setModal(null)

    const handleGoToProfile = event => {
        event.preventDefault()

        setView('profile')
    }

    const handleGoToWorkSpots = () => setView('workspots')

    const handleWorkspotUpdated = () => {
        setModal(null)
        setLastWorkspotsUpdate(Date.now())        
    }

    const handleLogout = () => {
        logoutUser()

        navigate('/login')
    }

    const handleUserAvatarUpdated = () => {
        handleErrors(async () => {
            const user = await retrieveUser()
            setUser(user)
        })
    }

    const handleUserPasswordUpdated = () => {
        handleErrors(async () => {
            const user = await retrieveUser()
            setUser(user)
        })
    }

    const handleSearchWorkspotsByName = event => {
        event.preventDefault();
        const newNameSearched = event.target.nameSearched.value;
        setNameSearched(newNameSearched);
        setView('workspots-searched-by-name');
    };
    
    const handleOpenFilterModal = () => setModal('filter')

    const [filteredData, setFilteredData] = useState({
        districts: {},
        category: {},
        features: {}
    })

    const handleFilteredSearch = (districts, category, features) => {
        setFilteredData({
            districts: districts,
            category: category, 
            features: features
        })
        setView('filtered-workspots')
        setModal(null)
    }

    console.log('Home -> render')

    return <div>

        <header className="home-header">
            <div className='home-logo-container'>
                <img className="home-logo-img" src={LOGO_URL} onClick={handleGoToWorkSpots}></img>
            </div>

            <Form onSubmit={handleSearchWorkspotsByName}>
                <Input type="text" name="nameSearched" placeholder="Search" />
                <Button type="submit"> Search </Button>
            </Form>

            <nav className="home-header-nav">
                {user && <>
                    <div className='home-header-profile'>
                        <img className="home-header-avatar" src={user.avatar} alt="" />
                        <a href="" onClick={handleGoToProfile}>{user.name}</a>
                    </div>
                </>}

                <Button onClick={handleLogout} className='home-button'>Logout</Button>
            </nav>

        </header>

        <div>
            {view === 'workspots' && <Workspots
                onEditWorkspot={handleOpenEditWorkspotModal}
                lastWorkspotsUpdate={lastWorkspotsUpdate}
            />}

            {view === 'workspots-searched-by-name' && <WorkspotsSearchedByName 
                nameSearched={nameSearched}
                onEditWorkspot={handleOpenEditWorkspotModal}
                lastWorkspotsUpdate={lastWorkspotsUpdate}
            />}

            {view === 'filtered-workspots' && <FilteredWorkspots
                districts={filteredData.districts}
                category={filteredData.category}
                features={filteredData.features}
                onEditWorkspot={handleOpenEditWorkspotModal}
                lastWorkspotsUpdate={lastWorkspotsUpdate}

            />}
     
            {view === 'profile' && <Profile
                onUserAvatarUpdated={handleUserAvatarUpdated}
                onUpdatedUserPassword={handleUserPasswordUpdated}
            />}

            {modal === 'add-workspot' && 
                <AddWorkspotModal
                    onCancel={handleCloseModal}
                    onWorkspotCreated={handleWorkspotUpdated}
                />}

            {modal === 'filter' &&
                <FilterModal
                    onCancel={handleCloseModal}
                    onFilteredSearch={handleFilteredSearch}
                />}

            {modal === 'edit-workspot' &&
                <EditWorkspotModal
                    onCancel={handleCloseModal}
                    onWorkspotEdited={handleWorkspotUpdated}
                    workspotId = {workspotId}
                />}

        </div>

        <footer className="home-footer">
            <Button onClick={handleOpenFilterModal}>Filters</Button>

            <Button onClick={handleOpenAddWorkspotModal}>+</Button>
        </footer>
    </div>

}
