console.debug('load create-post')

import { validateId, validateUserAvatar, validateText, validateCallback } from "./helpers/validators.js"
import {findUserById} from "../data.js"
import { loadPosts, savePosts } from "../data.js"

export default function createPost(userId, image, text, callback) {
    validateId(userId, 'user id')
    validateUserAvatar(image, 'image url')
    validateText(text)
    validateCallback(callback)

    //TODO steps
    //check user with userId exists
    //create post id
    //create post object and add author, image, text and date properties
    //add post to post array    


   findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        } 
    
        let id = 'post-1'
    
        loadPosts(posts =>{
            const lastPost = posts[posts.length - 1]
             
              if(lastPost) 
                  id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)
              
            const post = {
                id,
                author: user.id,
                image,
                text,
                date: new Date(),
                likes: []
            }
            posts.push(post)
            savePosts(posts, () => callback(null))
        })
    })
}