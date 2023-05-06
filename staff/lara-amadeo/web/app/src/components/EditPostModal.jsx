export default function EditPostModal(props){

    function onCancel(event){
        event.preventDefault()

        props.onCancelEditPostButton()
    }

    function handleConfirmationEditPost(event){
        event.preventDefault()
        
        props.onEditPostClick()
    }

    return <div className="edit-post-modal">
    <div className="centered-containers">
        <form className="centered-form" onSubmit={handleConfirmationEditPost}>
            
            <p className="title">Edit post</p>

            <input className="text-field" type="hidden" name="postId"/>
            <input className="text-field" type="text" name="image"/>

            
            <label htmlFor="caption" className="text-field-label">Post caption</label>
            <textarea className="text-area" name="caption"></textarea>

            {/* <div className="edit-post-image-preview-container">
            <img src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" alt="" className="edit-post-image-preview"/>
            </div> */}

            <div className="button-bar">
                <button className="button-S secondary-button" id="cancel-edit-post" type="button" onClick={onCancel}>Cancel</button>
                <button className="button-S primary-button" id="save-edit-post" type="submit">Save</button>
            </div>
        </form>
    </div>
</div>
}