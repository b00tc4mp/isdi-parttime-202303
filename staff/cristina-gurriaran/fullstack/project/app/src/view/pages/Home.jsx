import Workspots from '../components/Workspots'
import WorkspotsSearchedByName from '../components/WorkspotsSearchedByName'
import AddWorkspotModal from '../components/AddWorkspotModal'
import EditWorkspotModal from '../components/EditWorkspotModal'
import AddReviewModal from '../components/AddReviewModal'
import FilterModal from '../components/FiltersModal'
import FilteredWorkspots from '../components/FilteredWorkspots'
import { SearchInput, Form, Input, Button } from '../library'
import { useEffect, useState, useRef } from 'react'
import Profile from '../components/Profile'
import retrieveUser from '../../logic/retrieveUser'
import { LOGO_URL } from "../../data.js"
import { useAppContext, useHandleErrors } from '../hooks'
import { ProfileIcon, ExploreIcon, AddIcon, FavFooterIcon } from '../library/Icons'


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

    const handleOpenAddWorkspotModal = event => {
        event.preventDefault()
        setModal('add-workspot')
    }

    const handleOpenEditWorkspotModal = (workspotId) => {
        setModal('edit-workspot')
        setworkspotId(workspotId)
    }

    const handleAddReviewModal = (workspotId) => {
        setModal('add-review')
        setworkspotId(workspotId)
    }

    const handleCloseModal = () => setModal(null)

    const handleGoToProfile = event => {
        event.preventDefault()

        setView('profile')
    }

    const handleGoToWorkSpots = event =>{
        event.preventDefault()
        setView('workspots')
    } 

    const handleWorkspotUpdated = () => {
        setModal(null)
        setLastWorkspotsUpdate(Date.now())        
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

    return (
        <div>
            {/* {view === "workspots" || view === "workspots-searched-by-name" || view === "filtered-workspots" ? ( <header
                className="bg-white fixed w-full z-20 top-0 left-0 border-gray-light">
                <div className="bg-indigo-light mx-auto max-w-screen xl:px-4 py-16 sm:px-6 lg:px-8">
                    <form onSubmit={handleSearchWorkspotsByName}>
                        <div className="relative max-w-lg container mx-auto">
                                <Input
                                    type="text"
                                    name="nameSearched"
                                    placeholder="Got a name to look up?"
                                />
                                <button
                                    type="submit"
                                    className=" absolute end-1 top-1/2 -translate-y-1/2 rounded-lg bg-indigo-dark px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-mid"
                                >   Let's find that workspot!
                                </button>
                            </div>
                        </form>
                </div>
            </header>
            ) : null} */}

            <div>
                {view === 'workspots' && <Workspots
                    onEditWorkspot={handleOpenEditWorkspotModal}
                    onAddReview={handleAddReviewModal}
                    lastWorkspotsUpdate={lastWorkspotsUpdate}
                />}

                {view === 'workspots-searched-by-name' && <WorkspotsSearchedByName 
                    nameSearched={nameSearched}
                    onEditWorkspot={handleOpenEditWorkspotModal}
                    onAddReview={handleAddReviewModal}
                    lastWorkspotsUpdate={lastWorkspotsUpdate}
                />}

                {view === 'filtered-workspots' && <FilteredWorkspots
                    districts={filteredData.districts}
                    category={filteredData.category}
                    features={filteredData.features}
                    onEditWorkspot={handleOpenEditWorkspotModal}
                    onAddReview={handleAddReviewModal}
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

                {modal === 'add-review' &&
                    <AddReviewModal
                        onCancel={handleCloseModal}
                        onReviewAdded={handleWorkspotUpdated}
                        workspotId={workspotId}
                    />} 
            </div>

        <footer className="fixed bottom-0 left-0 right-0 bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex flex-row justify-around">
                <a href=""
                    onClick={handleGoToWorkSpots}
                        className="text-gray-dark transition hover:opacity-75 transition hover:text-indigo-dark flex flex-col items-center"
                >
                    <ExploreIcon />
                    <p>Explore</p>
                </a>

                <a href=""
                    onClick={handleOpenAddWorkspotModal}
                        className="text-gray-dark transition hover:opacity-75 transition hover:text-indigo-dark flex flex-col items-center"
                >
                    <AddIcon />
                    <p>New Workspot</p>
                </a>

                {user && <>
                    <a href=""
                        onClick={handleGoToProfile}
                            className="text-gray-dark transition hover:opacity-75 transition hover:text-indigo-dark flex flex-col items-center"
                    >
                        <FavFooterIcon />
                        <p>Favorites</p>
                    </a>
                </>}

                {user && <>
                     <a href="" 
                        onClick={handleGoToProfile}
                            className="text-gray-dark transition hover:opacity-75 transition hover:text-indigo-dark flex flex-col items-center"
                        >
                        <ProfileIcon />
                        <p>Profile</p>
                    </a>
                </>}
            </div>
        </footer>
    </div>
    )

}

