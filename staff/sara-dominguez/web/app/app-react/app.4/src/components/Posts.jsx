import { Component } from 'react'
import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'
import Post from './Post.jsx'

//lo hacemos con map y no con forEach porque necesitamos que nos devuelva un array

export default class Posts extends Component {
    constructor(props) {
        super(props);
    
    try {
        const posts = retrievePosts(context.userId)

        this.state = { posts }

    } catch (error){
        alert(error.message)
    }
}
    handleRefreshPost = () => {
        try {
            const posts = retrievePosts(context.userId)
    
            this.setState({ posts })
    
        } catch (error){
            alert(error.message)
        }
    }
    componentWillMount(){
        console.log('Posts-> componentWillMount')
    }
    componentWillReceiveProps(newProps) { 
        console.log('Posts -> componenWillReceiveProps')

        if (this.props.lastPostsUpdate !== newProps.lastPostsUpdate){
            this.handleRefreshPost()
        }
    }

    render () {
        console.log('posts -> render')
    //     return <section>
    //     {this.state.posts.map((post, index) => <Post
    //         key={index}
    //         post={post}
    //         onPostDeleted={this.handleRefreshPost}
    //         onToggledLikedPost={this.handleRefreshPost}
    //         onEditPost={this.props.onEditPost}
    //     />)}
    // </section>


        return <section>
            {this.state.posts.map((post) => <Post 
                key={post.id}
                post={post} 
                onEditPost={this.props.onEditPost} 
                onToggledLikePost={this.handleRefreshPost} 
                onPostDeleted={this.handleRefreshPost}/>)} 
        
        </section>
    }
}
