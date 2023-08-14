import retrieveWorkspots from '../../logic/retrieveWorkspots'
import Workspot from './Workspot'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'


export default function Workspots({ user }){
    const handleErrors = useHandleErrors()

    const [workspots, setWorkspots] = useState()

    handleErrors(async () => {
        const workspots = await retrieveWorkspots()
        setWorkspots(workspots)
    })

    return <div className="flex flex-col gap-10">
        {workspots && workspots.map((workspot) => <Workspot
            key={workspot.id}
            workspot={workspot}
            user={user}
        />)}
    </div>   
}