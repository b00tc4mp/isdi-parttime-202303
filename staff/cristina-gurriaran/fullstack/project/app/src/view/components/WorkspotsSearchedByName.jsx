import getWorkspotsByName from '../../logic/getWorkspotsByName'
import WorkspotCard from './WorkspotCard'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'

export default function WorkspotsSearchedByName({ user, nameSearched, lastWorkspotsUpdate, onEditWorkspot, onAddReview }) {
    const handleErrors = useHandleErrors()

    const [searchedWorkspots, setSearchedWorkspots] = useState([])

    useEffect(() => handleRefresWorkspots(), [nameSearched])

    const handleRefresWorkspots = () => {
        try {
            handleErrors(async () => {
                const searchedWorkspotsResults = await getWorkspotsByName(nameSearched)
                setSearchedWorkspots(searchedWorkspotsResults)
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
            {searchedWorkspots.length > 0 ? (
                searchedWorkspots.map(workspot => (
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
