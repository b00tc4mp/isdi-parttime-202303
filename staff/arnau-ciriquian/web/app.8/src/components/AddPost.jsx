import { createNewPost } from "../logic/createNewPost"
import { context } from "../ui"

export default function AddPost({ onAddPostClick, onCancelPostClick }) {
    function handleAddNewPost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try  {
            createNewPost(context.userId, image, text)

            onAddPostClick()
        }catch (error) {
            alert(error.message)
        }
    }

    function handleCancelNewPost(event) {
        event.preventDefault()

        onCancelPostClick()
    }


    return <div className="home__post modal">
            <form className="post__form" onSubmit={handleAddNewPost}>
                <input className="form__input" type="text" name="image" placeholder="new post image url"/>
                <textarea className="form__input--text" name="text" cols="30" rows="10" placeholder="new post text"></textarea>
                <div className="new-post__form--buttons">
                    <button className="form__button" type="submit" >Post</button>
                    <button className="form__button cancel__button" type="button" onClick={handleCancelNewPost}>Cancel</button>
                </div>
            </form>
        </div>
}