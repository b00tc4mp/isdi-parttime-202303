import createPost from "../logic/createPost.js"
import { context } from "../ui.js";

export default function AddPostModal(props) {

    function handleCancelClick(event){
        event.preventDefault();
        props.onCancelClick();
    }
    function handleCreatePost(event){
        event.preventDefault();

        try{
            let image = event.target.url.value
            let text = event.target.text.value 

            createPost(context.userId, image, text);
            
            props.onCreatedPost();

            console.log(image, text);
        }catch(error){
            document.querySelector(".fail-warning").textContent = error.message;
        }
    }

    return <section className="home-add-post-modal">
        <form className="form" onSubmit={handleCreatePost}>
            <label htmlFor="url">Create post:</label>
            <input type="url" className="form-post-url-input form-item" name="url" placeholder="Enter an image by typing a url" />
            <textarea name="text" cols="30" rows="5" placeholder="What do yo want to say ??"></textarea>
            <div className="form-buttons">
            <p className="fail-warning red"></p>
                <button type="button" className="form-post-cancel-button" onClick={handleCancelClick}>Cancel</button>
                <button type="submit" className="form-post-submit-button">Create post</button>
            </div>
        </form>
    </section>
}