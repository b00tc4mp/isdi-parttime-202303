import createPost from "../logic/createPost.js"
import { context } from "../ui.js"


export default function AddPostModal(props){

    function handleCancel(event){
        event.preventDefault()

        props.onCancel()
        props.onPostAdded()
    }

    function handleAddPost(event){
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value
    
        try{
            createPost(context.userId, image, text)
            props.onPostAdded()

        } catch(error) {
            alert(error.message)
        }
    
    }




     return <section className="add-post container">
        <form className="container" onSubmit={handleAddPost}>
            <input className="input" type="url" name="image" placeholder="image url" />
            <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
            <button className="button" type="submit">Create</button>
            <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
        </form>

</section>
}
