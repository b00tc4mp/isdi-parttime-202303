import { useState, useEffect } from 'react';
import addReviewToWorkspot from '../../logic/addReviewToWorkspot'
import retrieveWorkspot from '../../logic/retrieveWorkspot';
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button, TextArea, Label } from '../library'

export default function addReviewModal({ onCancel, workspotId, onReviewAdded}){
    const { alert } = useAppContext()
    const handleErrors = useHandleErrors()
    const [workspotData, setWorkspotData] = useState(null);

    function handleCancel(event) {
        event.preventDefault();
        onCancel();
    }

    function handleAddReview(event){
        event.preventDefault()

        const text = event.target.text.value

        handleErrors(async () => {
            await addReviewToWorkspot(workspotId, text)
            onReviewAdded()
        })
    }

    useEffect(() => {
        try {
            handleErrors(async () => {
                const workspot = await retrieveWorkspot(workspotId)
                setWorkspotData(workspot);
            })
        } catch (error) {
            alert(error.message);
        }

    }, [workspotId]);

    console.log('AddReviewModal -> render')

    return(
        <div className="fixed top-1/4 left-1/4 w-1/2 h-1/2 overflow-auto bg-white shadow-lg rounded-lg">
            <Container>
                <Form onSubmit={handleAddReview}>
                    <textarea name="text" placeholder="text" />
                <Button type="submit">Add review</Button>
                <Button type="button" onClick={handleCancel}>Cancel</Button>
                </Form>
            </Container>
        </div>
    )
}