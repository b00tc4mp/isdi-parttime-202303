console.log('load create-post')

import { validateId, validateUserAvatar, validateText } from "./helpers/validators.js"
import {findUserById} from "./helpers/data-managers.js"
import { posts } from "../data.js"

export default function createPost(userId, image, text) {
    validateId(userId, 'user id')
    validateUserAvatar(image, 'image url')
    validateText(text)

    //TODO steps
    //check user with userId exists
    //create post id
    //create post object and add author, image, text and date properties
    //add post to post array    


    const user = findUserById(userId)
    if (!user) throw new Error('user not found')


    const lastPost = posts[posts.length - 1]
      let id = 'post-1'
  
      if(lastPost) 
          id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)
      
    const post = {
        id,
        author: user.id,
        image,
        text,
        date: new Date() //podriamos obviar los () si a un constructor no se le envia argumentos
    }
    posts.push(post)
}