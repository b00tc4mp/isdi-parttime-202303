import { context } from '../ui'

import updatePost from '../logic/updatePost'
import retrievePost from '../logic/retrievePost'

export default function PostSaleModal ({ onCancel, onEditedPost, postId, onMenssageAlert}) {
    function handleCancel(event) {  
        event.preventDefault()

        onCancel()
    }
    
    function handleEditPost(event) {
        event.preventDefault()

        const date = event.target.date.value
        const startingPrice = event.target.text.startingPrice

        try {
            updatePost (context.userId, postId, image, text)

            onEditedPost()
        } catch(error) {
            onMenssageAlert(error.message)
        }
    }

    try{    
        const {image, text} = retrievePost(context.userId, postId)

        return <>
            <div className = "post-menssage">
                <img src={image} className="post-image"/>
                <p>{text}</p>
                <p>{Date.now}</p>
            </div>
            <div className = "post-menssage">
                <form className="container" onSubmit={handleEditPost}>
                    <input className="input" type="url" name="offerPrice" placeholder="price"defaultValue={0.0}/>
                    <button className="button" type="submit">Update</button>
                    <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </>
    }
    catch(error){
        onMenssageAlert(error.message)
    }
}
