import createPost from "../logic/createPost.js"

export default function AddPostModal(props) {

    function handleCancelClicl(event){
        event.preventDefault();
        props.onCancelClick();
    }
    function handleCreatePost(event){
        event.preventDefault();
        //TODO IMPLEMENT ME
        
    }




    return <section className="home-add-post-modal">
        <form className="form" onSubmit={handleCreatePost}>
            <label htmlFor="url">Create post:</label>
            <input type="url" className="form-post-url-input form-item" name="url" placeholder="Enter an image by typing a url" />
            <textarea name="text" cols="30" rows="5" placeholder="What do yo want to say ??"></textarea>
            <div className="form-buttons">
                <button type="button" className="form-post-cancel-button" onClick={handleCancelClicl}>Cancel   </button>
                <button type="submit" className="form-post-submit-button">Create post</button>
                <p className="fail-warning red"></p>
            </div>
        </form>
    </section>
}