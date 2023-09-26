import { useState, useEffect } from 'react';
import addReviewToWorkspot from '../../logic/addReviewToWorkspot'
import retrieveWorkspot from '../../logic/retrieveWorkspot';
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button, TextArea, Label } from '../library'

export default function addReviewModal({ workspotId, onCancel, onReviewAdded }) {
    const { alert } = useAppContext()
    const handleErrors = useHandleErrors()
    const [workspotData, setWorkspotData] = useState(null);

    function handleCancel(event) {
        event.preventDefault();
        onCancel();
    }

    function handleAddReview(event) {
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

    return (
        <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-gray-light w-full h-full px-5 bg-opacity-60">
                <div className="overflow-auto mx-auto bg-white md:w-2/3 lg:w-3/4 xl:w-4/5 sm:w-full h-4/5 m-6 p-6 rounded-md mt-10">

                    <Form className="flex flex-col gap-4" onSubmit={handleAddReview}>
                        <TextArea
                            name="text"
                            placeholder="Enter your review"
                            className="h-60"
                        />
                        <div className="flex gap-4">
                            <Button type="submit">
                                Add review
                            </Button>
                            <Button
                                type="button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>

                </div>
            </div>
        </div>
    )
}


