import { savePostsInStorage, findUserbyId, loadPosts } from "../data"

/**
 * Creates a post with the params given
 * @param {string} userId user's id
 * @param {url} image post's image url
 * @param {string} text post's caption
 * 
 */

export default function createPost(userId, image, text, callback) {

   findUserbyId(userId, user => {

       if (!user){
        callback(new Error(`User with id ${userId} not found`))
        return
       } 
   
       loadPosts(posts => {

           let newPost
           if(posts.length === 0) {
               newPost = {
                   id: 'post-1',
                   author: userId,
                   image,
                   text,
                   date: new Date,
                   visibility: 'private',
                   price: 0
               }
           } else {
               const lastPostId = posts[posts.length - 1].id
               const newPostId = 'post-' + (Number((lastPostId).slice(5)) + 1)
           
               newPost = {
                   id: newPostId,
                   author: userId,
                   image,
                   text,
                   date: new Date,
                   visibility: 'private',
                   price: 0,
                   likes
               }
           }
       
           posts.push(newPost)
           savePostsInStorage(posts, () => callback(null))
       })
   
    })

}