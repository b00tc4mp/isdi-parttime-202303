import { posts, users } from "../data"

export default function retrievePost(userId, postId){
    


    const foundUser = users().some(user => user.id === userId)

    if (!foundUser) throw new Error('User not found')

    const _posts = posts()
    const post = _posts.find(post => post.id === postId)

    if(!post) throw new Error('Post not found')

    return post
}