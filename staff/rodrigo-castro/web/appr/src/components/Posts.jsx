import retrievePosts from '../logic/retrievePosts'
import { context } from '../ui'
import Post from './Post.jsx'
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

        const handleEdit = (id) => onEditClicked(id)

        return <section className='posts-list'>
            { posts.map(post => <Post post={post} onLike={handleLike} onEdit={ (id) => handleEdit(id)}/>)}
        </section>
    } catch(error) {
        alert(error.message)
    }
    
}