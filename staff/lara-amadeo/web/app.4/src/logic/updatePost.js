import { posts, savePostInStorage } from "../data"

export default function updatePost(postId, image, text){
    const _posts = posts()
    const post = _posts.find(post => post.id === postId)

    post.image = image ? image : post.image
    post.text = text

    savePostInStorage(post)
}