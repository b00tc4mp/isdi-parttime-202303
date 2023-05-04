import { context } from "../ui.js"
import retrievePosts from "../logic/retrivePosts.js"
import Post from "./Post.jsx"

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