import { context } from '../ui'

import Post from './Post.jsx'
import retrievePosts from '../logic/retrievePosts'

export default function Posts({ onModifyedPost, onEditedPost, onMenssageAlert }) {
    console.log('Post -> render')

    function handleModifyedPost(){
        onModifyedPost()
    }

    function handleEditedPost(id){
        onEditedPost(id)
    }

    function handleOpenAlert(message) {
        onMenssageAlert(message)
      }

    try {
        const posts = retrievePosts(context.userId)

        return <section>
            {posts.map(post => <Post 
                key={post.id} 
                post={post} 
                onModifyPost={handleModifyedPost}
                onEditPost={handleEditedPost}
                onMenssageAlert={this.handleOpenAlert}
            />)}
        </section>

    }
    catch (error) {
        onMenssageAlert(error.message)
    }                                                

}