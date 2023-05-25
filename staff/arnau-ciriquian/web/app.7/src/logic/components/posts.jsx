import { context } from "../../ui"
import retrievePosts from "../retrivePosts"
import Post from "./post"

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