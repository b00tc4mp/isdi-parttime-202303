import { context } from "../ui";
import updatePost from "../logic/updatePost";
import retrievePostByPostId from "../logic/retrievePostByPostId";

export default function UpdatePost(props){
    const {postId} = props
    let post = retrievePostByPostId(context.userId, postId);
    
    function handleUpdatePost(event){
        event.preventDefault();
        
        try{
            let image = event.target.url.value
            let text = event.target.text.value
            updatePost(context.userId, postId, image, text);
            props.onUpdatedPost()
        }catch(error){
            alert(error.message);
        }
    }

    function handleCancelClick(event){
        event.preventDefault();
        props.onCancelClick()
    }


    return <section className="home-edit-post-modal">
    <form className="home-edit-post-form form" onSubmit={handleUpdatePost}>
        <label htmlFor="url">Edit post:</label>
        <input type="url" className="form-post-url-input form-item" name="url" placeholder="Enter url" defaultValue= {post.image}/>
        <input type="hidden" className="home-edit-hidden-input" name="postId"/>
        <textarea name="text" cols="30" rows="5" defaultValue= {post.text}></textarea>
        <div className="form-buttons">
            <button type="button" className="home-edit-form-post-cancel-button" onClick={handleCancelClick}>Cancel</button>
            <button type="submit" className="home-edit-form-post-submit-button">Save</button>
            <p className="fail-warning red"></p>
        </div>
    </form>
</section>
}
