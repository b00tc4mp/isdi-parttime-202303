import retrieveFavWorkspots from '../../logic/retrieveFavWorkspots'
import retrieveUser from '../../logic/retrieveUser';
import WorkspotCard from './WorkspotCard'
import { useState, useEffect } from "react";
import { useAppContext, useHandleErrors } from '../hooks'
import { AlertIcon } from '../library/Icons'


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
        <div>
            <div className="fixed top-0 w-full h-12 bg-indigo-light z-20 pt-20 mb-10 px-40 items-center">
            </div>
        
            <div className="mt-24 sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
            {favWorkspots.length > 0 ? (
                favWorkspots.map(workspot => (
                    <div key={workspot.id} className="m-4 gap-4">
                        <WorkspotCard
    
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
                    </div>

                ))
            ) : (
                    <div className="fixed top-1/2 left-1/2 flex items-center justify-center z-20 bg-gray-dark bg-opacity-60 ">
                        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto top-1/4 w-80">
                            
                            <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md bg-gray-200 h-60 items-center justify-center">
                    
                                <div className="px-2 py-2">
                                    <div className="mx-3 flex items-center flex-col">
                                        <p className="text-md text-gray py-1 font-semibold text-indigo-dark">
                                            Your favorite workspots list is empty
                                        </p>
                                        <p className="text-gray text-sm flex align-center">Time to explore!</p>
         
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )}
        
        </div>
    )
}

