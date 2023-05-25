import { context } from "../../ui"
import createPost from '../../logic/createPost'
import { useContext } from "react"
import Context from "../../Context"
 

export default function CreatePostModal({ onCreatePostClick, onCancelCreatePostButton }){
    const { generateToast } = useContext(Context)

    //let imagePreview

    // function handleImageUploadPreview(event){
    //     event.preventDefault()

    //     const uploadedFile = event.target.files[0]

    //     try{
    //         getImageFromLocal(uploadedFile, imageUrl => {
    //             const srcData = imageUrl
    //             imagePreview.src = srcData
    //         })
    //         this.forceUpdate()
    //     } catch(error){
    //     }
    // }

    function handleConfirmationCreatePost(event){
        event.preventDefault()
        const image = event.target.image.value
        const caption = event.target.caption.value
        
        try{
            createPost(context.userId, image, caption, (error) => {
                if(error){
                    generateToast(error.message,'error')
                    console.log(error.stack)
                    return
                }

                generateToast(error.message, 'sucess')
    
                onCreatePostClick()
            })
        } catch(error){
            generateToast(error.message,'error')
        }
    }

    function onCancel(event){
        event.preventDefault()

        onCancelCreatePostButton()
    }

    return <div className="modal-overlay">
    <div className="centered-containers">
        <form className="centered-form" onSubmit={handleConfirmationCreatePost}>
            
            <p className="title">Create a post!</p>

            <label htmlFor="imageUrl" className="text-field-label">Image Url</label>
            <input className="text-field" type="text" name="image"/>

            {/* <div className="update-avatar-image-preview-container">
                <img src="https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg" className="update-avatar-image-preview"/>
            </div> */}

            <label htmlFor="caption" className="text-field-label">Post description</label>
            <input className="text-area" type="text" name="caption"/>

            <div className="button-bar">
                <button className="button-S secondary-button" id="cancel-post-publication" type="button" onClick={onCancel}>Cancel</button>
                <button className="button-S primary-button" id="post-publication" type="submit">Post</button>
            </div>
        </form>
    </div>
</div>
}