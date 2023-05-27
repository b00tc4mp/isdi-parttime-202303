import createPost from '../logic/createPost.js'
import { context }  from '../ui.js'
import { useContext } from 'react'
import Context from '../components/Context.js'
import Container from '../library/Container.jsx'

export default function AddPostModal ({onCancel, onPostCreated}){
    console.debug('AddPostModal -> render')
    
    const { alert, freeze, unfreeze} = useContext(Context)
    
    function handleCancel (event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost (event) {
        event.preventDefault()

        const image = event.target.imageUrl.value 
        const text = event.target.text.value 

        try {
            freeze()
            createPost(context.userId, image, text, error => {
                unfreeze()
                if (error) {
                    alert(error.message)

                    return
                }
                
                onPostCreated()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    return <Container tag="section" className="add-post">
        <Container tag="form" className="add-post-form" onSubmit={handleCreatePost}>
            <input className="input" type="url" name="imageUrl" placeholder="image url" />
            <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
            <button className="button" type="submit">Create</button>
            <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button> 
        </Container>
    </Container>
}  