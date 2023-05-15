import { validateText, validateUrl } from "./helpers/validators"
import { savePost } from "../data"
import retrievePost from "./retrievePost"


export default function editPost(userId, postId, image, text) {
    const post = retrievePost(userId, postId)
    
    validateUrl(image)
    
    validateText(text)

    if(!post) throw new Error('Post id not valid')

    if(userId !== post.author) throw new Error(`Post doesn't belong to this user`)

    post.image = image

    post.text = text

    savePost(post)
}