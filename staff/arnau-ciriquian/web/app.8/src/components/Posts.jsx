import { context } from "../ui"
import retrievePosts from "../logic/retrivePosts"
import Post from "./Post"

export default function Posts({ onToggleLike }) {
    function handleToggleLike() {
        onToggleLike()
    }

    try {
        const posts = retrievePosts(context.userId)

        return <section className="home__post--feed">
            { posts.map(post => <Post post={post} onLikePostClick={handleToggleLike}/>)}
        </section>
    } catch (error) {
        alert(error.message)
    }
}