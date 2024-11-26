import { useState, useEffect } from 'react'
import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'
import Post from './Post.jsx'

//lo hacemos con map y no con forEach porque necesitamos que nos devuelva un array

export default function Posts({onEditPost, lastPostsUpdate}) {
    let _posts
    try {
        _posts = retrievePosts(context.userId)

    } catch (error){
        alert(error.message)
    }
    const[posts, setPosts] = useState(_posts )

    const handleRefreshPost = () => {
        try {
            const posts = retrievePosts(context.userId)
    
            setPosts(posts)
        } catch (error){
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
    },[lastPostsUpdate])


        console.log('posts -> render')

        return <section>
            {posts.map((post) => <Post 
                key={post.id}
                post={post} 
                onEditPost={onEditPost} 
                onToggledLikePost={handleRefreshPost} 
                onPostDeleted={handleRefreshPost}/>)} 
        
        </section>
    
}
