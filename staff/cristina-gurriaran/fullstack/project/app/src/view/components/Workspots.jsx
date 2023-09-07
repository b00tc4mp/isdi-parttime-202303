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


    return <div className="mt-60 mb-60 px-8 sm:grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
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
    </div>
}
