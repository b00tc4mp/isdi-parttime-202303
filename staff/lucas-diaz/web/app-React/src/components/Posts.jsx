import retrievePosts from "../logic/retrievePosts.js"
import Post from "./Post.jsx";
import { context } from "../ui.js";
import retrieveUser from "../logic/retrieveUser.js";
import { Component } from "react";


export default class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = { view: false }
    }

    handleDeletePost = () => {
        this.setState({ view: true })
        this.forceUpdate();
    }

    handleToggleLike = () => {
        this.forceUpdate();
    }

    handleOpenEditModal = (id) => {
        this.props.onEditPostButtonClick(id)
    }


    render() {
        try {

            const posts = retrievePosts(context.userId);
            const user = retrieveUser(context.userId);

            return <section className="home-posts-content">
                {posts.map((post, index) => <Post
                    key={index}
                    post={post}
                    user={user}
                    onDeleteClick={this.handleDeletePost}
                    onLikeClick={this.handleToggleLike}
                    onEditPostButton={this.handleOpenEditModal}
                />)}
            </section>

        } catch (error) {
            alert(error.message)
        }
    }
}
