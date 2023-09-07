import getFilteredWorkspots from '../../logic/getFilteredWorkspots'
import WorkspotCard from './WorkspotCard'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'

export default function FilteredWorkspots({ districts, category, features, lastWorkspotsUpdate, user, onEditWorkspot, onAddReview }) {
    const handleErrors = useHandleErrors()

    const [filteredWorkspots, setFilteredWorkspots] = useState([])

    useEffect(() => handleRefresWorkspots(), [districts, category, features])

    const handleRefresWorkspots = () => {
        try{
            handleErrors(async () => {
                const filteredWorkspotsResults = await getFilteredWorkspots(districts, category, features);
                setFilteredWorkspots(filteredWorkspotsResults);
            })
        }catch(error){
            alert(error.message)
        }
    }

    useEffect(() => {
        if (lastWorkspotsUpdate)
            handleRefresWorkspots()
    }, [lastWorkspotsUpdate])

 
    return (
        <div className="mt-60 mb-60 px-8 sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkspots.length > 0 ? (
                filteredWorkspots.map(workspot => (
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
                    <div className="fixed top-1/2 left-1/2 flex items-center justify-center z-20 bg-gray-dark bg-opacity-60 ">
                        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto top-1/4 w-80">

                            <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md bg-gray-200 h-60 items-center justify-center">

                                <div className="px-2 py-2">
                                    <div className="mx-3 flex items-center flex-col justify-center text-center gap-4">
                                        <p className="text-md text-gray py-1 font-semibold text-indigo-dark">
                                            No workspots found that fit your preferences
                                        </p>
                                        <p className="text-gray text-sm flex align-center">Try fine-tuning your search criteria for better results!</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    )
}



