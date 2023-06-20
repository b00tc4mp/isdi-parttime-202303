import { posts } from '../data.js'

export default function retrievePosts(userId) {

    if(!userId) throw new Error ('User not found')
    
    const _posts = posts()
    return _posts.toReversed()
}