import getFilteredWorkspots from '../../logic/getFilteredWorkspots'
import Workspot from './Workspot'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'

export default ({ user, districts, category, features }) => {
    const handleErrors = useHandleErrors()

    const [filteredWorkspots, setFilteredWorkspots] = useState()

    useEffect(() => {
        handleErrors(async () => {
            const filteredWorkspots = await getFilteredWorkspots(districts, category, features)
            setFilteredWorkspots(filteredWorkspots)
        })
    }, [])

    return <div className="flex flex-col items-center justify-center gap-10">
        {filteredWorkspots && filteredWorkspots.map((workspot) => <Workspot
            key={workspot.id}
            workspot={workspot}
            user={user}
        />)}
    </div>
}
