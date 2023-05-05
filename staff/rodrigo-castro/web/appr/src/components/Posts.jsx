import retrievePosts from '../logic/retrievePosts'
import { context } from '../ui'
import Post from './Post.jsx'
import PropTypes from 'prop-types'

export default function Posts({onLikeToggled}) {
    Posts.proptypes = {
        onLikeToggled: PropTypes.func
    }

    try {
        const posts = retrievePosts(context.userId)

        const handleLike = () => {
            onLikeToggled()
        }

        return <section>
            { posts.map(post => <Post post={post} onLike={handleLike}/>)}
        </section>
    } catch(error) {
        alert(error.message)
    }
    
}