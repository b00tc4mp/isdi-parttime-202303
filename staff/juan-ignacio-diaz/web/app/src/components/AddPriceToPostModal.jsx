import { useState, useEffect, useContext } from 'react'

import { context } from '../ui'
import Context from '../Context'

import Container from '../library/Container'

import updatePriceToPost from '../logic/updatePriceToPost'
import retrievePost from '../logic/retrievePost'

export default function AddPriceToPostModal({ onCancel, onAddedPriceToPost, postId}) {
    const { alert, freeze, unfreeze } = useContext(Context)
    const [post, setPost] = useState(null)

    useEffect(() => {
        try {
            freeze()
            retrievePost(context.userId, postId, (error, post) => {
                unfreeze()
                if (error) {
                    alert(error.message)

                    return
                }

                setPost(post)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [postId])
    
    function handleCancel(event) {  
        event.preventDefault()

        onCancel()
    }

    function handleAddPriceToPost(event) {
        event.preventDefault()

        const price = event.target.price.valueAsNumber

        try {
            updatePriceToPost (context.userId, postId, price, error => {
                if (error) {
                    alert(error.message)

                    return
                }         

                onAddedPriceToPost()
            })
        } catch(error) {
            alert(error.message)
        }
    }

    return <>
        {post && <Container tag="section" className="modal">
            <Container tag="form" onSubmit={handleAddPriceToPost}>
            {post && <>
                    <img src={post.image} className="post-image"/>
                    <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={post.text} readOnly></textarea>
                    <input className="input" type="number" min="0" name="price" placeholder="price" defaultValue={post.price}/>
                    <button className="button" type="submit">Update</button>
                    </> 
                || <>                 
                    <textarea className="input" name="text" cols="30" rows="10" disabled placeholder="Loading..." readOnly></textarea>
                    <input className="input" type="text" name="price" disabled placeholder="Loading..."/>
                </>}             
                
                <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
            </Container>
        </Container>}
    </>        
    
}