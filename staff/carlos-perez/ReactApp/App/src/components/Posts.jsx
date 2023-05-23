import retrievePosts from '../logic/retrievePosts'
import Post from './Post'
import { Component } from 'react'

export default class Posts extends Component {
    constructor(props) {
        console.log('Posts -> constructor')

        super(props)

        try {
            const posts = retrievePosts()

            this.state = { posts }
        } catch (error) {
            alert(error.message)
        }
    }

    handleRefreshPosts = () => {
        try {
            const posts = retrievePosts()

            this.setState({ posts })
        } catch (error) {
            alert(error.message)
        }
    }

    componentWillMount() {
        console.log('Posts -> componentWillMount')
    }

    componentDidMount() {
        console.log('Posts -> componentDidMount')
    }

    componentWillReceiveProps(newProps) {
        console.log('Posts -> componentWillReceiveProps')

        if (this.props.lastPostsUpdate !== newProps.lastPostsUpdate)
            this.handleRefreshPosts()
    }

    componentWillUnmount() {
        console.log('Posts -> componentWillUnmount')
    }

    render() {
        console.log('Posts -> render')

        return <section>
            {this.state.posts.map(post => <Post key={post.id} post={post} onEditPost={this.props.onEditPost} onToggledLikePost={this.handleRefreshPosts} onPostDeleted={this.handleRefreshPosts} />)}
        </section>
    }
}