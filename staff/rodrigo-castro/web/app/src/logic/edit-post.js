import { validateId, validateText, validateUrl } from "./helpers/validators"
import { users, posts, savePost } from "../data.js"


export default function editPost(userId, postId, image, text) {
    validateId(userId)

    validateId(postId)
    
    validateUrl(image)
    
    validateText(text)

    const foundUser = users().find(user => user.id === userId)

    if(!foundUser) throw new Error('User id not valid')

    const foundPost = posts().find(post => post.id === postId)

    if(!foundPost) throw new Error('Post id not valid')

    if(!foundUser.id === foundPost.author) throw new Error(`Post doesn't belong to this user`)

    foundPost.image = image

    foundPost.text = text

    savePost(foundPost)
}