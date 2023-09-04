import { deletePost } from "../../logic"
import { ModalContainer, ModalWindow, Button } from "../library"
import { useHandleErrors } from "../hooks"
import { context } from "../../ui"

export default function DeletePost({ onDeletedPost, onCancel }) {
    const handleErrors = useHandleErrors()

    const handleDeletePost = () => {
        handleErrors(async () => {
            await deletePost(context.postId)

            onDeletedPost()
        })
    }

    return <>
        <ModalContainer className='fixed bg-black bg-opacity-20 top-0 left-0 z-30' onClick={(event) => {
            if (event.target === document.querySelector('.ModalContainer'))
                onCancel()
        }}>
            <ModalWindow className='h-96 w-11/12'>
                <h2 className="text-2xl text-black text-center">Do you want to delete this post?</h2>
                <img className="h-32" src="src/images/delete-image.png" alt="delete-image" />
                <div className="flex justify-evenly w-full">
                    <Button className='bg-gray-100 text-lg px-5' onClick={handleDeletePost}>Delete</Button>
                    <Button className='bg-gray-100 text-lg px-5' onClick={onCancel}>Cancel</Button>
                </div>
            </ModalWindow>
        </ModalContainer>
    </>
}