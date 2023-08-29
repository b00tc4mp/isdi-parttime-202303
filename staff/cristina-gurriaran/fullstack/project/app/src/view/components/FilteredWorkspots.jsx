import getFilteredWorkspots from '../../logic/getFilteredWorkspots'
import Workspot from './Workspot'
import { useState, useEffect } from 'react'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'

export default function FilteredWorkspots({ districts, category, features, lastWorkspotsUpdate, user, onEditWorkspot, onAddReview }) {
    const handleErrors = useHandleErrors()

    const [filteredWorkspots, setFilteredWorkspots] = useState([])

    useEffect(() => handleFilteredSearchResults(), [districts, category, features])

    const handleFilteredSearchResults = () => {
        try{
            handleErrors(async () => {
                const filteredWorkspotsResults = await getFilteredWorkspots(districts, category, features);
                setFilteredWorkspots(filteredWorkspotsResults);
            })
        }catch(error){
            alert(error.message)
        }
    }

    useEffect(() => {
        if (lastWorkspotsUpdate)
            handleFilteredSearchResults()
    }, [lastWorkspotsUpdate])

    let workspotsToShow;

    if (filteredWorkspots.length > 0) {
        workspotsToShow = filteredWorkspots.map(workspot => (
            <Workspot 
                key={workspot.id} 
                workspot={workspot}
                onEditWorkspot={onEditWorkspot}
                onAddReview={onAddReview}
                onToggledLikeWorkspot={handleFilteredSearchResults}
                onToggledSavedWorkspot={handleFilteredSearchResults}
                onWorkspotDeleted={handleFilteredSearchResults}
                user={user} />
        ));
    } else {
        workspotsToShow = (
            <Container className="bg-blue">
                <p className="text-gray-800">No results found</p>
            </Container>
        );
    }

    return (
        <Container>
            {workspotsToShow}
        </Container>
    );
}



