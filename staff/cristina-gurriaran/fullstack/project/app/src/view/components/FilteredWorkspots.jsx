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
                <div className="w-80 h-80 fixed top-40 left-40">
                    <div className="p-80">
                            <h1>No Results found</h1>
                    </div>
 
                </div>
            )}
        </div>
    )
}



