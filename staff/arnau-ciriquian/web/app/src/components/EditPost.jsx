//import { findPostById } from "../logic/helpers/data-managers"
import retrievePost from "../logic/retrievePost"
import { context } from "../ui"
import { updatePost } from "../logic/updatePost"
import { useEffect, useState } from "react"

export default function EditPost ({ onPostUpdated, onCancel, postId }) {
    const [post, setPost] = useState(null)

    const handleCancel = event => {
        event.preventDefault()

        onCancel()
    }

    const handleUpdatePost = event => {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            updatePost(context.userId, postId, image, text, error => {
                if(error) {
                    alert(error.message)

                    return
                }
                onPostUpdated()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        try {
            retrievePost(context.userId, postId, (error, post) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setPost(post)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [postId])

    console.log('EditPostModal -> render')

    return <>
    {post && <section className="home__post--edit modal">
            <form className="post__form" onSubmit={handleUpdatePost}>
                <input className="input" type="hidden" name="postId"/>
                <input className="form__input" type="url" name="image" placeholder="new post image url" defaultValue={post.image}/>
                <textarea className="form__input--text" name="text" cols="30" rows="10" placeholder="new post text" defaultValue={post.text}></textarea>
                <div className="new-post__form--buttons">
                    <button className="form__button" type="submit">Update</button>
                    <button className="form__button cancel__button" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </section>}
    </>
} 