import retrievePosts from "../logic/retrievePosts.js"
import Post from "./Post.jsx";
import { context } from "../ui.js";
import retrieveUser from "../logic/retrieveUser.js";


export default function Posts() {

    try {
        const posts = retrievePosts(context.userId);
        const user = retrieveUser(context.userId);

        
        return <section className="home-posts-content">
            {posts.map((post, index) =>  <Post key={index} post={post} user={user}/> )}
        </section>

    } catch (error) {
        alert(error.message)
    }
}
