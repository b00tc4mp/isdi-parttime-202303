import retrievePosts from "../logic/retrievePosts.js"
import Post from "./Post.jsx";
import { context } from "../ui.js";
import retrieveUser from "../logic/retrieveUser.js";
import { Component } from "react";


export default class Posts extends Component {
    constructor(props) {
        super(props)
        console.log("Posts -> render")
        try{
            const posts = retrievePosts(context.userId);
            const user = retrieveUser(context.userId);
            this.state = { posts, user, view: false }

        }catch(error){
            alert(error.message)
        }
    }

    handleDeletePost = () => {
        try{
            const posts = retrievePosts(context.userId);
            this.setState({ posts })
        }catch(error){
            alert(error.message)
        }
    }

    handleToggleLike = () =>{ 
        try{
            const posts = retrievePosts(context.userId);
            this.setState({ posts })
        }catch(error){
            alert(error.message)
        }
    }

    handleRefreshPosts = () => {
        try{
            const posts = retrievePosts(context.userId);
            this.setState({ posts })
        }catch(error){
            alert(error.message);
        }
    }

    handleOpenEditModal = (id) => {
        this.props.onEditPostButtonClick(id)
    }

    UNSAFE_componentWillMount(){
        console.log("Posts --> componentWillMount")
    }

    componentDidMount(){
        console.log("Posts --> componentDidMount")
    }


    UNSAFE_componentWillReceiveProps(newProps){
        console.log("Posts -> componentWillReciveProps")

        if (this.props.lastPostsUpdate !== newProps.lastPostsUpdate)
            this.handleRefreshPosts();
        
    }


    


    render() {
            return <section className="home-posts-content">
                {this.state.posts.map((post, index) => <Post
                    key={index}
                    post={post}
                    user={this.state.user}
                    onDeleteClick={this.handleDeletePost}
                    onLikeClick={this.handleToggleLike}
                    onEditPostButton={this.handleOpenEditModal}
                />)}
            </section>


    }
}
