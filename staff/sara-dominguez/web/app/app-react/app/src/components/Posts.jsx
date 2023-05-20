import { useState, useEffect } from 'react'
import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'
import Post from './Post.jsx'


export default function Posts({ onEditPost, lastPostsUpdate }, callback) {
    const [posts, setPosts] = useState()

    useEffect(() => {
        // try {
        //     retrievePosts(context.userId, (error, posts) => {
        //         if (error) {
        //             alert(error.message)

        //             return
        //         }
        //         setPosts(posts)
        //     })

        // } catch (error) {
        //     alert(error.message)
        // }
        
        handleRefreshPost()

    }, [])

    const handleRefreshPost = () => {
        try {
            retrievePosts(context.userId, (error, posts) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setPosts(posts)
            })

        } catch (error) {
            alert(error.message)
        }
    }
    // componentWillMount(){
    //     console.log('Posts-> componentWillMount')
    // }
    // componentWillReceiveProps(newProps) { 
    //     console.log('Posts -> componenWillReceiveProps')

    //     if (this.props.lastPostsUpdate !== newProps.lastPostsUpdate){
    //         this.handleRefreshPost()
    //     }
    // }
    // está renderizando dos veces porque esta funcion se ejecuta siempre cuando carga la aplicacion aunque nos haya cambiado nada.
    useEffect(() => {
        console.log('Posts-> componenWillReceiveProps with Hooks')

        if (lastPostsUpdate)
            handleRefreshPost()
    }, [lastPostsUpdate])


    console.log('posts -> render')

    return <section>
        {posts && posts.map((post) => <Post
            key={post.id}
            post={post}
            onEditPost={onEditPost}
            onToggledLikePost={handleRefreshPost}
            onPostDeleted={handleRefreshPost} />)}

    </section>

}
