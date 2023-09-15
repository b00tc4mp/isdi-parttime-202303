import { useEffect, useState } from "react"
import { useHandleErrors } from "../hooks"
import { retrievePost, updatePost } from "../../logic"
import { context } from "../../ui"
import { ModalContainer, ModalWindow, Form, Input, Button } from "../library"
import { useAppContext } from "../hooks"

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
        const subject = event.target.subject.value

        handleErrors(async () => {
            await updatePost(post.id, title, content, subject)

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
                    <textarea className="w-full h-48 rounded-lg border border-gray-400 p-2" name="content" placeholder="Summary content" cols="30" rows="10" defaultValue={post.text}></textarea>
                </div>
                <div className='w-full h-20 flex flex-col items-start gap-1'>
                    <p>Select subject related:</p>
                    <select name="subject" className="p-2 border border-slate-300 rounded-lg" defaultValue={post.subject}>
                        <option value=''></option>
                        <option value='Language and literature'>Language and literature</option>
                        <option value='Mathematics'>Mathematics</option>
                        <option value='Natural sciences'>Natural sciences</option>
                        <option value='Social sciences'>Social sciences</option>
                        <option value='Geography'>Geography</option>
                        <option value='History'>History</option>
                        <option value='Physics'>Physics</option>
                        <option value='Biology'>Biology</option>
                        <option value='Biology'>Chemistry</option>
                        <option value='Biology'>Philosophy</option>
                        <option value='Others'>Others</option>
                    </select>
                </div>
                <div className="flex justify-evenly w-full">
                    <Button className='bg-slate-100 w-16'>Edit</Button>
                    <Button className='bg-slate-100' type='button' onClick={onCancel}>Cancel</Button>
                </div>
            </Form>
        </ModalWindow>}
    </ModalContainer>
}