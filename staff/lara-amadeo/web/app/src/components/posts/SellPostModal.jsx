import { useState } from "react"
import { context } from "../../ui"
import retrievePost from "../../logic/retrievePost"
import sellPost from "../../logic/sellPost"
import { useContext } from "react"
import Context from "../../Context"

export default function SellPostModal({ postId, onConfirmSellPost, onCancelSellPost }){

    const [post, setPost] = useState()
    const { generateToast } = useContext(Context)

    try{
        retrievePost(context.userId, postId, (error, post) => {
            if(error){
                generateToast(error.message,'error')
                console.log(error.stack)
                return
            }
            setPost(post)
        })
    } catch(error){
        generateToast(error.message,'error')
        console.log(error.stack)
    }

    const handleSellPost = (event) => {
        event.preventDefault()
        const newPrice = event.target.price.value
        try{
            sellPost(context.userId, postId, post.price, newPrice, error => {
                if(error){
                    generateToast(error.message,'error')
                    console.log(error.stack)

                    return
                }
                generateToast('Post in sale!', 'success')
                onConfirmSellPost()
            })
        } catch(error){
            generateToast(error.message,'error')
            console.log(error.stack)
        }
    }

    const onCancel = () => {
        onCancelSellPost()
    }

    return <div className="modal-overlay">
    <div className="centered-containers">
        <form className="centered-form" onSubmit={handleSellPost}>
            
            <p className="title">Sell post</p>

            {post && <>
            <div className="image-preview-container">
            <img className="image-preview"  name="image" src={post.image}/>
            </div>

            <label htmlFor="price" className="text-field-label">Selling price</label>
            <p className="text-field-description">Price should be higher than 0€ and lower than 1000€</p>
            <input className="text-field" name="price" defaultValue={post.price}></input>
            </>}

            <div className="button-bar">
                <button className="button-S secondary-button" id="cancel-edit-post" type="button" onClick={onCancel}>Cancel</button>
                <button className="button-S primary-button" id="save-edit-post" type="submit">Sell</button>
            </div>
        </form>
    </div>
</div>
}