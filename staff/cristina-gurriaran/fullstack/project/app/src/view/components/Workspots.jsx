import retrieveWorkspots from '../../logic/retrieveWorkspots'
import WorkspotCard from './WorkspotCard'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'



export default function Workspots({ onEditWorkspot, onAddReview, lastWorkspotsUpdate, user }) {
    const handleErrors = useHandleErrors()

    const [workspots, setWorkspots] = useState()

    useEffect(() => handleRefresWorkspots(), [])

    const handleRefresWorkspots = () => {
        try {
            handleErrors(async () => {
                const workspots = await retrieveWorkspots()
                setWorkspots(workspots)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        if (lastWorkspotsUpdate)
            handleRefresWorkspots()
    }, [lastWorkspotsUpdate])


    return <div className="mt-60 mb-60 px-8 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {workspots && workspots.map((workspot) =>
                <WorkspotCard
                    key={workspot.id}
                    workspot={workspot}
                    onEditWorkspot={onEditWorkspot}
                    onAddReview={onAddReview}
                    onWorkspotDeleted={handleRefresWorkspots}
                    onToggledLikeWorkspot={handleRefresWorkspots}
                    onToggledSavedWorkspot={handleRefresWorkspots}
                    onReviewAdded={handleRefresWorkspots}
                    onWorkspotEdited={handleRefresWorkspots}
                    user={user}
                />)}
        
    </div>
}
