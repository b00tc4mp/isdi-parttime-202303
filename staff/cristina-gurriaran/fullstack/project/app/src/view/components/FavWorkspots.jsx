import retrieveFavWorkspots from '../../logic/retrieveFavWorkspots'
import retrieveUser from '../../logic/retrieveUser';
import WorkspotCard from './WorkspotCard'
import { useState, useEffect } from "react";
import { useAppContext, useHandleErrors } from '../hooks'

export default function FavWorkspots(lastWorkspotsUpdate, onEditWorkspot, onAddReview) {
    const handleErrors = useHandleErrors()
    const { navigate } = useAppContext()

    const [user, setUser] = useState()
    const [favWorkspots, setFavWorkspots] = useState([])

    useEffect(() => {
        handleErrors(async () => {
            const user = await retrieveUser()
            setUser(user)
        })
    }, [])

    useEffect(() => handleRefresWorkspots(), [])

    const handleRefresWorkspots = () => {
        try {
            handleErrors(async () => {
                const workspots = await retrieveFavWorkspots()
                setFavWorkspots(workspots)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        if (lastWorkspotsUpdate)
            handleRefresWorkspots()
    }, [lastWorkspotsUpdate])


    return (
        <div className="mt-60 mb-60 px-8 sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favWorkspots.length > 0 ? (
                favWorkspots.map(workspot => (
                    <WorkspotCard
                        key={workspot.id}
                        workspot={workspot}
                        onEditWorkspot={onEditWorkspot}
                        onAddReview={onAddReview}
                        onToggledLikeWorkspot={handleRefresWorkspots}
                        onToggledSavedWorkspot={handleRefresWorkspots}
                        onWorkspotDeleted={handleRefresWorkspots}
                        onWorkspotEdited={handleRefresWorkspots}
                        onReviewAdded={handleRefresWorkspots}
                        user={user}
                    />
                ))
            ) : (
                    <div className="bg-gray-light w-80 h-80 fixed top-40 left-40">
                    <p className="text-gray-800">No favourite Workspots yet</p>
                    </div>
            )}
        </div>
    );

}

