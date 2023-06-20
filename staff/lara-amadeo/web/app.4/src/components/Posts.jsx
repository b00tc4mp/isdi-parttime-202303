import { context, errorToast, generateToast } from '../ui.js'
import retrievePosts from '../logic/retrievePosts.js'
import Post from './Post.jsx'
import { Component } from 'react/index.js'

export default class Posts extends Component{
    constructor(props){
        super(props)

        try {
            const posts = retrievePosts(context.userId)

            this.state = {posts: posts}
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }

    handleRefreshPosts = () => {
        try {
            const posts = retrievePosts(context.userId)

            this.setState({posts: posts})
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }


    handleCreatePost = () => {
        this.props.onCreateButton()
    }

    handleOpenEditModal = (id) => {
        this.props.onEditPostButtonClick(id)
    }

    handleOpenDeleteModal = (id) => {
        this.props.onDeletePostButtonClick(id)
    }

    componentWillReceiveProps = (newProps) => {
        console.log('Posts -> componentWillReceiveProps')
        if(this.props.lastPostUpdate !== newProps) this.handleRefreshPosts()
    }

    

    render()  {
            return <div className="feed">
            <div className="header">
                <p className="heading-M-bold">Home</p>
                <button className="button-S primary-button create-post-button" onClick={this.handleCreatePost}>Create</button>
            </div>
            <div className="posts">
                {this.state.posts.map(post =>
                    <Post
                    key={post.id}
                    post={post}
                    onLikeButtonClick={this.handleRefreshPosts}
                    onSaveButtonClick={this.handleRefreshPosts}
                    onEditPostButton={this.handleOpenEditModal}
                    onDeletePostButton={this.handleOpenDeleteModal}
                    />)}
            </div>     
        </div>
    }
}
