import { useState, useEffect } from 'react'

import { context } from '../ui'
import { useAppContext } from '../hooks'

import { Container, Form, Input, Button } from '../library'

import updatePriceToPost from '../logic/updatePriceToPost'
import retrievePost from '../logic/retrievePost'

export default function AddPriceToPostModal({ onCancel, onAddedPriceToPost, postId}) {
    const { alert, freeze, unfreeze } = useAppContext()
    const [post, setPost] = useState(null)

    useEffect(() => {
        try {
            freeze()
            retrievePost(context.token, postId)
                .then(post => {
                    setPost(post) 
                })
                .catch(error => alert(error.message))
                .finally(() => unfreeze())           
        } catch (error) {
            unfreeze()
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
            freeze()
            updatePriceToPost (context.token, postId, price)
                .then(() => {
                    onAddedPriceToPost()
                })
                .catch(error => alert(error.message))    
                .finally(() => unfreeze())      
        } catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    return <>
        {post && <Container tag="section" className="modal">
            <Form onSubmit={handleAddPriceToPost}>
            {post && <>
                    <img src={post.image} className="post-image"/>
                    <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={post.text} readOnly></textarea>
                    <Input type="number" min="0" name="price" placeholder="price" defaultValue={post.price}/>
                    <Button type="submit">Update</Button>
                    </> 
                || <>                 
                    <textarea className="input" name="text" cols="30" rows="10" disabled placeholder="Loading..." readOnly></textarea>
                    <Input type="text" name="price" disabled placeholder="Loading..."/>
                </>}             
                
                <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
            </Form>
        </Container>}
    </>        
    
}