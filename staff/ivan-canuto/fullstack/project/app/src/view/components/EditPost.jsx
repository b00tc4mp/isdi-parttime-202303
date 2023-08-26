import { useEffect, useState } from "react"
import { useHandleErrors } from "../hooks"
import { retrievePost, updatePost } from "../../logic"
import { context } from "../../ui"
import { ModalContainer, ModalWindow, Form, Input, Button } from "../library"
import useAppContext from "../hooks"

export default function EditPost({ onUpdatedPost, onCancel }) {
    const handleErrors = useHandleErrors()
    const { freeze, unfreeze } = useAppContext()

    const [post, setPost] = useState()

    useEffect(() => {
        handleErrors(async () => {
            freeze()
            const post = await retrievePost(context.postId)
            
            setPost(post)

            unfreeze()
        })
    }, [])

    const handleUpdatePost = event => {
        event.preventDefault()
        
        const title = event.target.title.value
        const content = event.target.content.value

        handleErrors(async () => {
            await updatePost(post.id, title, content)

            onUpdatedPost()
        })
    }

    return <ModalContainer className='EditPostContainer fixed bg-black bg-opacity-20 top-0 left-0 z-30' onClick={event => {
        if(event.target === document.querySelector('.EditPostContainer'))
            onCancel()
    }}>
        {post && <ModalWindow className='w-11/12 h-5/6'>
            <h2 className="text-2xl">Edit post</h2>
            <Form className='flex flex-col items-center gap-4 w-full h-5/6' onSubmit={handleUpdatePost}>
                <div className='flex flex-col items-start w-full'>
                    <p>Title:</p>
                    <Input className='w-full' name='title' placeholder="Summary title" defaultValue={post.title}></Input>
                </div>
                <div className="w-full">
                    <p>{'Post content (summary):'}</p>
                    <textarea className="w-full h-5/6 rounded-lg border border-gray-400 p-2" name="content" placeholder="Summary content" cols="30" rows="10" defaultValue={post.text}></textarea>
                </div>
                <div className="flex justify-evenly w-full">
                    <Button className='bg-slate-100 w-16'>Edit</Button>
                    <Button className='bg-slate-100' type='button' onClick={onCancel}>Cancel</Button>
                </div>
            </Form>
        </ModalWindow>}
    </ModalContainer>
}