import Workspots from '../components/Workspots'
import WorkspotsSearchedByName from '../components/WorkspotsSearchedByName'
import AddWorkspotModal from '../components/AddWorkspotModal'
import EditWorkspotModal from '../components/EditWorkspotModal'
import FilterModal from '../components/FiltersModal'
import FilteredWorkspots from '../components/FilteredWorkspots'
import { Input, Button } from '../library'
import { useEffect, useState } from 'react'
import Profile from '../components/Profile'
import retrieveUser from '../../logic/retrieveUser'
import { useAppContext, useHandleErrors } from '../hooks'
import { ProfileIcon, ExploreIcon, AddIcon, FavFooterIcon, FiltersIcon } from '../library/Icons'
import FavWorkspots from '../components/FavWorkspots'

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



    const handleCloseModal = () => setModal(null)

    const handleGoToProfile = event => {
        event.preventDefault()

        setView('profile')
    }

    const handleGoToFavs = event => {
        event.preventDefault()

        setView('favs')
    }

    const handleGoToWorkSpots = event => {
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
        event.preventDefault()
        const newNameSearched = event.target.nameSearched.value
        setNameSearched(newNameSearched)
        setView('workspots-searched-by-name')
        event.target.nameSearched.value = ""
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
        <div className="flex flex-col">
            {view === "workspots" || view === "workspots-searched-by-name" || view === "filtered-workspots" ? (
                <header
                    className="bg-white fixed w-full z-20 top-0 left-0 border-gray-light">
                    <div className="bg-indigo-light mx-auto max-w-screen xl:px-4 py-6 sm:px-6 lg:px-8 p-4">
                        <form onSubmit={handleSearchWorkspotsByName}>
                            <div className="max-w-lg mx-auto flex">
                                <div className="relative flex-1">
                                    <Input
                                        type="text"
                                        name="nameSearched"
                                        placeholder="Got a name to look up?"
                                        className="h-16 sm:h-24 w-full sm:w-1/2 pl-2 " // Ajusta las alturas y anchos según sea necesario
                                    />
                                    <button
                                        type="submit"
                                        className="absolute inset-y-0 right-0 rounded-lg bg-indigo-dark px-3 sm:px-5 py-2 sm:py-3 text-sm font-medium text-white transition hover:bg-indigo-md mx-1 my-1"
                                    >
                                        Let's find that workspot!
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white border-b border-gray-light shadow-sm w-full h-14 mb-10">
                        <div className="w-20 h-20 mt-2 ml-8">
                            <Button onClick={handleOpenFilterModal}>
                                <FiltersIcon />
                            </Button>
                        </div>

                    </div>

                </header>

            ) : null}

            <div>
                {view === 'workspots' && <Workspots
                    lastWorkspotsUpdate={lastWorkspotsUpdate}
                />}

                {view === 'workspots-searched-by-name' && <WorkspotsSearchedByName
                    nameSearched={nameSearched}
                />}

                {view === 'filtered-workspots' && <FilteredWorkspots
                    districts={filteredData.districts}
                    category={filteredData.category}
                    features={filteredData.features}
                />}

                {view === 'profile' && <Profile
                    onUserAvatarUpdated={handleUserAvatarUpdated}
                    onUpdatedUserPassword={handleUserPasswordUpdated}
                />}

                {view === 'favs' && <FavWorkspots />}

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
            </div>

            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-light shadow-sm h-20">
                <div className="mx-auto max-w-screen-xl px-4 py-4 md: px-6 lg:px-8 flex flex-row justify-around">
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
                        <p>New</p>
                    </a>

                    {user && <>
                        <a href=""
                            onClick={handleGoToFavs}
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

