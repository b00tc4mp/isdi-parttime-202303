import { savePost, findPostById } from "../data";


export default function toggleVisibilityPost(post, callBack) {

    post.visible = !post.visible

    savePost(post, () => callBack(null))
}