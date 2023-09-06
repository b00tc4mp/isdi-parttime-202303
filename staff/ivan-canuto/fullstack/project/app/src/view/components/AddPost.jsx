import { useHandleErrors } from "../hooks"
import { createPostFromScratch } from "../../logic"
import { ModalContainer, ModalWindow, Form, Input, Button } from "../library"

export default function AddPost({ onCloseModal, handleLastPostsUpdate }) {
    const handleErrors = useHandleErrors()

    const handleUpdatePost = event => {
        event.preventDefault()
        
        const title = event.target.title.value
        const content = event.target.content.value

        handleErrors(async () => {
            await createPostFromScratch(title, content)

            onCloseModal()
            handleLastPostsUpdate()
        })
    }

    return <ModalContainer className='EditPostContainer fixed bg-black bg-opacity-20 top-0 left-0 z-30' onClick={event => {
        if(event.target === document.querySelector('.EditPostContainer'))
            onCloseModal()
    }}>
        <ModalWindow className='w-11/12 h-4/6'>
            <h2 className="text-2xl">Create a new post</h2>
            <Form className='flex flex-col items-center gap-4 w-full h-5/6' onSubmit={handleUpdatePost}>
                <div className='flex flex-col items-start w-full'>
                    <p>Title:</p>
                    <Input className='w-full' name='title' placeholder="Summary title"></Input>
                </div>
                <div className="w-full">
                    <p>{'Post content (summary):'}</p>
                    <textarea className="w-full h-5/6 rounded-lg border border-gray-400 p-2" name="content" placeholder="Summary content" cols="30" rows="10"></textarea>
                </div>
                <div className="flex justify-evenly w-full">
                    <Button className='bg-slate-100 w-16'>Create</Button>
                    <Button className='bg-slate-100' type='button' onClick={onCloseModal}>Cancel</Button>
                </div>
            </Form>
        </ModalWindow>
    </ModalContainer>
}