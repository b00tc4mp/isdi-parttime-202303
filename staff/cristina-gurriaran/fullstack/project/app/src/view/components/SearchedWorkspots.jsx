import searchWorkspotsByName from '../../logic/searchWorkspotsByName'
import Workspot from './Workspot'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'

export default function WorkspotsSearchedByName({ user, nameSearched }){
    const handleErrors = useHandleErrors()

    const [searchedWorkspots, setSearchedWorkspots] = useState()


    useEffect(() => {
        handleErrors(async () => {
            const searchedWorkspots = await searchWorkspotsByName(nameSearched)
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
