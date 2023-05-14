import { context } from "../ui"
import retrievePosts from "../logic/retrivePosts"
import Post from "./Post"
import { Component } from "react"

/*export default function Posts({ onToggleLike, onEditClicked }) {
    function handleToggleLike() {
        onToggleLike()
    }

    

    try {
        const posts = retrievePosts(context.userId)

        return <section className="home__post--feed">
            { posts.map(post => <Post post={post} onLikePostClick={handleToggleLike} onEditClick={onEditClicked}/>)}
        </section>
    } catch (error) {
        alert(error.message)
    }
}*/

export default class Posts extends Component {
    constructor(props) {
        super(props)

        try {
            const posts = retrievePosts(context.userId)

            this.state = { posts }
        } catch (error) {
            alert(error.message)
        }
    }

    handleRefreshPosts = () => {
        try {
            const posts = retrievePosts(context.userId)

            this.setState({ posts })
        } catch (error) {
            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.lastPostsUpdate !== newProps.lastPostsUpdate)
            this.handleRefreshPosts()
    }

    render() {
        return <section className="home__post--feed">
        { this.state.posts.map(post => <Post post={post} onLikePostClick={this.handleRefreshPosts} onEditClick={this.props.onEditClicked}/>)}
    </section>
    }
}