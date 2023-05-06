import { savePostInStorage } from "../data";
import { context } from "../ui";
import retrievePosts from "./retrievePosts";

export default function updatePost(postId, image, text){
    const posts = retrievePosts(context.userId)
    const post = posts.find(post => post.id === postId)

    post.image = image
    post.text = text

    savePostInStorage(post)
}