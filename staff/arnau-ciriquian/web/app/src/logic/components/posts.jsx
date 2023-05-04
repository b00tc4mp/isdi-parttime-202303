import { context } from "../../ui.js"
import retrievePosts from "../retrivePosts.js"
import Post from "./post.jsx"

export default function Posts() {
    try {
        const posts = retrievePosts(context.userId)

        return <section className="home__post--feed">
            { posts.map(post => <Post post={post} />)}
        </section>
    } catch (error) {
        alert(error.message)
    }
}