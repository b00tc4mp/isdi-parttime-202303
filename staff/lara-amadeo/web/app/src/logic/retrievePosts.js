import { posts } from '../data.js'

export default function retrievePosts() {
    const _posts = posts()
    return _posts.toReversed()
}