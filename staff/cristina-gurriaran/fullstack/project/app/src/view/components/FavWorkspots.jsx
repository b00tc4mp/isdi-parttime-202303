import retrieveFavWorkspots from '../../logic/retrieveFavWorkspots'
import Workspot from './Workspot'
import { useState, useEffect } from "react";
import { useAppContext, useHandleErrors } from '../hooks'

export default function favWorkspots(user) {
    const handleErrors = useHandleErrors()

    const [favWorkspots, setFavWorkspots] = useState()

    useEffect(() => renderFavWorkspots(), [])

    const renderFavWorkspots = () => {
        try {
            handleErrors(async () => {
                const workspots = await retrieveFavWorkspots()
                setFavWorkspots(workspots)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className="flex flex-col items-center justify-center gap-10">
        {favWorkspots && favWorkspots.map((workspot) => <Workspot
            key={workspot.id}
            workspot={workspot}
            user={user}
        />)}
    </div>
}

