import { useEffect, useState } from "react"
import retrievePost from "../../logic/retrievePost"
import { context } from "../../ui"
import togglePostVisibility from "../../logic/togglePostVisibility"
import { useContext } from "react"
import Context from "../../Context"

export default function VisibilityModal({ postId, onConfirmChangeVisiblity, onCancelChangeVisibility }) {

    const [post, setPost] = useState()
    const [visibility, setVisibility] = useState()
    const { generateToast } = useContext(Context)

    useEffect(() => {
        try {
            retrievePost(context.token, postId, (error, post) => {
                if (error) {
                    generateToast(error.message, 'error')
                    console.log(error.stack)

                    return
                }
                setPost(post)
                setVisibility(post.visibility)
            })
        } catch (error) {
            generateToast(error.message, 'error')
            console.log(error.stack)
        }
    }, [])


    const handleChangeVisibility = (event) => {
        event.preventDefault()
        try {
            togglePostVisibility(context.token, post._id, error => {
                if (error) {
                    generateToast(error.message, 'error')
                    console.log(error.stack)
                }
                setPost(post)
                setVisibility(post.visibility)
                generateToast('Visibility changed!', 'success')
                onConfirmChangeVisiblity()
            })
        } catch (error) {
            generateToast(error.message, 'error')
            console.log(error.stack)
        }
    }

    const onCancel = () => {
        onCancelChangeVisibility()
    }

    return <div className="modal-overlay">
        <div className="centered-containers">
            <form className="centered-form" onSubmit={handleChangeVisibility}>

                <p className="title">Post visibility</p>
                {visibility && <p className="body-text">Are you sure you want to change this post to {visibility === 'private' ? 'public' : 'private'} visibility?</p>}
                <input className="text-field" type="hidden" name="postId" />

                <div className="button-bar">
                    <button className="button-S secondary-button" type="button" onClick={onCancel}>Cancel</button>
                    <button className="button-S primary-button" type="submit">Change</button>
                </div>
            </form>
        </div>
    </div>
}