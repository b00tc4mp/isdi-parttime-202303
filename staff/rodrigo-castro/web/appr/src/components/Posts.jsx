import retrievePosts from '../logic/retrievePosts'
import { context } from '../ui'
import Post from './Post.jsx'
import './Posts.css'
import PropTypes from 'prop-types'

export default function Posts({onLikeToggled, onEditClicked}) {
    Posts.proptypes = {
        onLikeToggled: PropTypes.func
    }

    try {
        const posts = retrievePosts(context.userId)

        const handleLike = () => {
            onLikeToggled()
        }

        return <section className='posts-list'>
            { posts.map(post => <Post key={post.id} post={post} onLike={handleLike} onEdit={onEditClicked}/>)}
        </section>
    } catch(error) {
        alert(error.message)
    }
    
}