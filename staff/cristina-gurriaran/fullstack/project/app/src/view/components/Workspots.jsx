import retrieveWorkspots from '../../logic/retrieveWorkspots'
import Workspot from './Workspot'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'


export default function Workspots({ onEditWorkspot, onAddReview, lastWorkspotsUpdate, user }){
    const handleErrors = useHandleErrors()

    const [workspots, setWorkspots] = useState()

    useEffect(() => handleRefresWorkspots(), [])

    const handleRefresWorkspots = () => {
        try{
            handleErrors(async() => {
                const workspots = await retrieveWorkspots()
                setWorkspots(workspots)
            })
        } catch(error){
            alert(error.message)
        }
    }

    useEffect(() => {
        if(lastWorkspotsUpdate)
            handleRefresWorkspots()
    }, [lastWorkspotsUpdate])


    return <div className="flex flex-col items-center justify-center gap-10">
        {workspots && workspots.map((workspot) => <Workspot
            key={workspot.id}
            workspot={workspot}
            onEditWorkspot={onEditWorkspot}
            onAddReview={onAddReview}
            onToggledLikeWorkspot={handleRefresWorkspots}
            onToggledSavedWorkspot={handleRefresWorkspots}
            onWorkspotDeleted={handleRefresWorkspots}
            onReviewAdded={handleRefresWorkspots}
            user={user}
        />)}
    </div>   
}