import { Component } from 'react';
import { context } from '../ui'

import Post from './Post.jsx'
import retrievePosts from '../logic/retrievePosts'
import retrieveUserPosts from '../logic/retrieveUserPosts'
import retrieveSavePosts from '../logic/retrieveSavePosts'

export default class Posts extends Component {
    constructor(props){
        console.log('Posts -> render')

        super(props)

        try {
            let posts
            console.log(this.props.typePosts)
            if (this.props.typePosts === 'all')     
                posts = retrievePosts(context.userId)
            else if (this.props.typePosts === 'user') 
                posts = retrieveUserPosts(context.userId)
            else if (this.props.typePosts === 'save') 
                posts = retrieveSavePosts(context.userId)
    
            this.state = { posts }
        }
        catch (error) {
            this.props.onMenssageAlert(error.message)
        }  
    }

    handleRefreshPosts = ()  => {
        console.log('Posts -> refresh')
        try {
            let posts
            console.log(this.props.typePosts)
            if (this.props.typePosts === 'all')     
                posts = retrievePosts(context.userId)
            else if (this.props.typePosts === 'user') 
                posts = retrieveUserPosts(context.userId)
            else if (this.props.typePosts === 'save') 
                posts = retrieveSavePosts(context.userId)
    
            this.setState({ posts })
        }
        catch (error) {
            this.props.onMenssageAlert(error.message)
        }  
    }

    componentDidUpdate(newProps) {
        console.log('Posts -> componentWillReceiveProps')

        if (this.props.lastPostsUpdate !== newProps.lastPostsUpdate || this.props.typePosts !== newProps.typePosts)
            this.handleRefreshPosts()
    }

    render() {
        return <section>
        {this.state.posts.map(post => <Post 
            key={post.id} 
            post={post} 
            onModifyPost={this.handleRefreshPosts}
            onEditPost={this.props.onEditedPost}
            onMenssageAlert={this.props.onMenssageAlert}
        />)}
         </section>
    }

                                              

}