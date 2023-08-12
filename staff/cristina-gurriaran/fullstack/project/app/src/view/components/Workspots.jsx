import retrieveWorkspots from '../../logic/retrieveWorkspots'
import Workspot from './Workspot'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'

export default function Workspots({ user }){
    const handleErrors = useHandleErrors()

    const [workspots, setWorkspots] = useState()

    handleErrors(async () => {
        const workspots = await retrieveWorkspots()
        setWorkspots(workspots)
    })

    return <section>
        {workspots && workspots.map((workspot) => <Workspot
            key={workspot.id}
            workspot={workspot}
            user={user}
        />)}
    </section>   
}