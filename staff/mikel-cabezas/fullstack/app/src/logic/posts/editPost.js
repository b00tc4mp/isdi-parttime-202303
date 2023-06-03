import { loadPosts, savePost } from '../../data.js'
import { context } from "../../ui.js";
import { validateUserId, validateText } from '../helpers/validators.js';

export function editPost(userId, postId, title, text, image, callback) {

    //TODO hacer losgica para comprobar que el usario que quiere editar el post es el propietario
    
    loadPosts(_posts => {
        const currentPost = postId.slice(5) - 1
        // const id = context.userId
    
        validateUserId(userId)
        validateText(title)
        validateText(text)
    
        if (!image) {
            const currentImage = _posts.find(post => post.id === postId).image 
            srcNewImage = currentImage
        } 
    
        const date = _posts[currentPost].date
        _posts[currentPost] = {
            id: postId,
            author: userId,
            image: image,
            title: title, 
            text: text,
            date: new Date(date),
            lastModify: new Date(),
            likes: _posts[currentPost].likes,
            comments: _posts[currentPost].comments
        }
        savePost(_posts[currentPost], () => callback(null))
    })
}