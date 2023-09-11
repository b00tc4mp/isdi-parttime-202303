import { useHandleErrors } from "../hooks"
import { updateUserDescription } from "../../logic"
import { ModalContainer, ModalWindow, Form, Input, Button } from "../library"

export default function AddDescription({ onCloseModal, handleRefreshUser }) {
    const handleErrors = useHandleErrors()

    const handleUpdateDescription = event => {
        event.preventDefault()

        const description = event.target.description.value

        handleErrors(async () => {
            await updateUserDescription(description)

            onCloseModal()
            handleRefreshUser()
        })
    }

    return <ModalContainer className='AddDescriptionContainer fixed bg-black bg-opacity-20 top-0 left-0 z-30' onClick={event => {
        if(event.target === document.querySelector('.AddDescriptionContainer'))
            onCloseModal()
    }}>
        <ModalWindow className='w-11/12 h-1/2'>
            <p className="text-2xl">Add description</p>
            <Form className='flex flex-col items-center gap-4 w-full h-5/6' onSubmit={handleUpdateDescription}>
                <div className="w-full">
                    <textarea className="w-full h-full rounded-lg border border-gray-400 p-2" name="description" placeholder="User description" cols="30" rows="10"></textarea>
                </div>
                <div className="flex justify-evenly w-full">
                    <Button className='bg-slate-100 w-16'>Add</Button>
                    <Button className='bg-slate-100' type='button' onClick={onCloseModal}>Cancel</Button>
                </div>
            </Form>
        </ModalWindow>
    </ModalContainer>
}