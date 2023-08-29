import getWorkspotsByName from '../../logic/getWorkspotsByName'
import Workspot from './Workspot'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'

export default function WorkspotsSearchedByName({ user, nameSearched, lastWorkspotsUpdate, onEditWorkspot, onAddReview }) {
    const handleErrors = useHandleErrors()

    const [searchedWorkspots, setSearchedWorkspots] = useState([])

    useEffect(() => handleNameSearchedResults(), [nameSearched])

    const handleNameSearchedResults = () => {
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
            handleNameSearchedResults()
    }, [lastWorkspotsUpdate])

    let workspotsToShow

    if (searchedWorkspots.length > 0) {
        workspotsToShow = searchedWorkspots.map(workspot => (
            <Workspot
                key={workspot.id}
                workspot={workspot}
                onEditWorkspot={onEditWorkspot}
                onAddReview={onAddReview}
                onToggledLikeWorkspot={handleNameSearchedResults}
                onToggledSavedWorkspot={handleNameSearchedResults}
                onWorkspotDeleted={handleNameSearchedResults}
                user={user} />
        ))
    } else {
        workspotsToShow = (
            <Container className="bg-blue">
                <p className="text-gray-800">No results found</p>
            </Container>
        )
    }
    return (
        <Container>
            {workspotsToShow}
        </Container>
    )
}
