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
    
    handleRefreshPosts = () => {
        try {
            const posts = retrievePosts(context.userId)

            this.setState({ posts })
        } catch(error) {
            alert(error.message)
        }
    }
    
    componentDidMount() {
        console.log('Posts -> componentDidMount')
    }
    
    componentWillMount() {
        console.log('Posts -> componentWillMount')
    }

    componentWillReceiveProps(newProps) {
        console.log('Posts -> componentWillReceiveProps')

        if(this.props.lastPostsUpdate !== newProps.lastPostsUpdate)
            this.handleRefreshPosts()
    }

    componentWillUnmount() {
        console.log('Posts -> componentWillUnmount')
    }
    
    render() {
        console.log('Posts -> render')
    

        return <section className='posts-list'>
            { this.state.posts.map(post => <Post key={post.id} post={post} onToggledLikePost={this.handleRefreshPosts} onEdit={this.props.onEditClicked}/>)}
        </section>
    }
}