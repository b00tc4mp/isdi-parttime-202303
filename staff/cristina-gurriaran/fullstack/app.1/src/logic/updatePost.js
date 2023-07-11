import { validators } from 'com'
import {findUserById, findPostById} from '../data.js'
import {savePost} from '../data.js'
const { validateId, validateUrl, validateText, validateCallback } = validators



export default function updatePost(userId, postId, image, location, title, text, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)
    validateCallback(callback)

   findUserById(userId, user => {
        if (!user){
            callback(new Error(`user with id ${userId} not found`))
            return
        }

        findPostById(postId, post => {

            if (!post){
                callback(new Error(`post with id ${postId} not found`))
                return
            } 

            if (post.author !== userId){
                callback(new Error (`post with id ${postId} does not belong to user with id ${userId}`))
                return
            }  
        
            post.image = image
            post.location = location
            post.title = title
            post.text = text
            post.date = new Date
        
            savePost(post, () => callback(null))

        })
   })
}


