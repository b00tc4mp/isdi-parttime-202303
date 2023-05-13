
export default function UpdatePost(props){

    function handleUpdatePost(event){
        event.preventDefault();
        // esto avisa al padre lo que pasa cuando le  damos a update
        props.onUpdatedPost()
    }

    function handleCancelClick(event){
        event.preventDefault();
        //esto es loq ue pasa  c
        props.onCancelClick()
    }



    return <section className="home-edit-post-modal off">
    <form className="home-edit-post-form form" onSubmit={handleUpdatePost}>
        <label htmlFor="url">Eddit post:</label>
        <input type="url" className="form-post-url-input form-item" name="url" placeholder="Enter url"/>
        <input type="hidden" className="home-edit-hidden-input" name="postId"/>
        <textarea name="text" cols="30" rows="5"></textarea>
        <div className="form-buttons">
            <button type="button" className="home-edit-form-post-cancel-button" onClick={handleCancelClick}>Cancel</button>
            <button type="submit" className="home-edit-form-post-submit-button">Save</button>
            <p className="fail-warning red"></p>
        </div>
    </form>
</section>
}
