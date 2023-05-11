import retrievePosts from '../logic/retrievePosts'
import { context } from '../ui'
import Post from './Post.jsx'
import { Component } from 'react'
import './Posts.css'
import PropTypes from 'prop-types'

export default class Posts extends Component {
    constructor(props){
        super(props)

        Posts.proptypes = {
            onLikeToggled: PropTypes.func,
            onEditClicked: PropTypes.func
        }
        
        try {
            const posts = retrievePosts(context.userId)

            this.state = { posts }
        } catch(error) {
            alert(error.message)
        }
    }
    
    handleToggledLikePost = () => {
        try {
            const posts = retrievePosts(context.userId)

            this.setState({ posts })
        } catch(error) {
            alert(error.message)
        }
    }
    
    render() {
        console.log('Posts -> render')
    

        return <section className='posts-list'>
            { this.state.posts.map(post => <Post key={post.id} post={post} onToggledLikePost={this.handleToggledLikePost} onEdit={this.props.onEditClicked}/>)}
        </section>
    }
}