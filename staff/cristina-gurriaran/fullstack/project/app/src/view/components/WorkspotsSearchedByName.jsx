import getWorkspotsByName from '../../logic/getWorkspotsByName'
import Workspot from './Workspot'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'

export default ({ user, nameSearched }) => {
    const handleErrors = useHandleErrors()

    const [searchedWorkspots, setSearchedWorkspots] = useState()


    useEffect(() => {
        handleErrors(async () => {
            const searchedWorkspots = await getWorkspotsByName(nameSearched)
            setSearchedWorkspots(searchedWorkspots)
        })
    }, [])

    return <div className="flex flex-col items-center justify-center gap-10">
        {searchedWorkspots && searchedWorkspots.map((workspot) => <Workspot
            key={workspot.id}
            workspot={workspot}
            user={user}
        />)}
    </div>
}
