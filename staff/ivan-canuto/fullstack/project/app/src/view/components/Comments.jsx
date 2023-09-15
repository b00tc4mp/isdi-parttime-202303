import { createComment, deleteComment } from "../../logic"
import { useState } from "react"
import Comment from "./Comment"
import { Button, Form, ModalContainer } from "../library"
import { useHandleErrors } from "../hooks"

export default function Comments({ handleRefreshPost, post, user }) {
    const handleErrors = useHandleErrors()

    const [addComment, setAddComment] = useState(false)

    const toggleAddComment = () => {
        setAddComment(!addComment)
        document.body.classList.toggle('fixed-scroll')
    }

    const handleCreateComment = event => {
        event.preventDefault()

        const commentText = event.target.commentText.value

        handleErrors(async () => {
            await createComment(post.id, commentText)

            toggleAddComment()

            handleRefreshPost()
        })
    }

    const handleDeleteComment = commentId => {
        handleErrors(async () => {
            await deleteComment(post.id, commentId)

            handleRefreshPost()
        })
    }

    return <>
        <section className="flex flex-col items-center w-full h-full py-4 px-1 pt-0">
            <div className="flex flex-col justify-around items-center h-full w-full mb-4">
                <h2 className="mt-2 mb-4 font-bold text-xl">Comments</h2>
                <div className="flex flex-col overflow-scroll h-full gap-2 w-full px-2">
                    {user && post.comments && post.comments.map(comment => <Comment
                        key={comment.id}
                        comment={comment}
                        handleDeleteComment={handleDeleteComment}
                        user={user}
                    />
                    )}
                </div>
                <Button className="mt-2" onClick={toggleAddComment}>Add comment</Button>
            </div>

            {addComment &&
                <ModalContainer className='absolute top-0 bg-black bg-opacity-20' onClick={(event) => {
                    if (event.target === document.querySelector('.ModalContainer'))
                        toggleAddComment()
                }}>
                    <Form className='bg-white h-96 p-4 w-5/6' onSubmit={handleCreateComment}>
                        <h2 className="text-lg">Add comment</h2>
                        <textarea className="border-2 border-gray-200 rounded-md p-2 h-60 w-11/12" cols="30" rows="10" name="commentText" autoFocus></textarea>
                        <div className="w-full flex justify-evenly">
                            <Button className="bg-slate-100 w-14">Add</Button>
                            <Button className='bg-slate-100' type="button" onClick={toggleAddComment}>Cancel</Button>
                        </div>
                    </Form>
                </ModalContainer>
            }
        </section>
    </>
}
