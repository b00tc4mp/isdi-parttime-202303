import { useEffect, useState, useContext } from "react"
import Post from "./Post"
import retrievePosts from "../logic/posts/retrievePosts"
import retrieveLikedPosts from "../logic/posts/retrieveLikedPosts"
import retrieveSavedPosts from "../logic/posts/retrieveSavedPosts"
import { context } from "../ui"
import './Posts.css'
import { RotatingLines } from 'react-loader-spinner'
import retrieveUser from "../logic/users/retrieveUser"
import Context from "../Context"


export default function Posts({ onEditPost, onAddPostClick, lastPostsUpdate, postsFilter, onToggleLikePostClick, onToggleSavePostClick, onHideMenuOptions, visibility, onShowAllPosts }) {
    const userId = context.userId
    const [posts, setPosts] = useState()
    // const [postsFilter, setPostsFilter] = useState('all')
    const [user, setUser] = useState()
    const { freeze, unfreeze } = useContext(Context)
    useEffect(() => {
        console.log('Refresh Posts -> render in useEffect')
        freeze()
        if (!postsFilter) {
            retrievePosts(userId, (error, posts) => {
                unfreeze()
                if (error) {
                    alert(error.message)

                    return
                }
                setPosts(posts)
            })
        }
        if (postsFilter === 'liked') {
            retrieveLikedPosts(userId, (error, posts) => {
                unfreeze()
                if (error) {
                    alert(error.message)

                    return
                }
                setPosts(posts)
            })
        }
        if (postsFilter === 'saved') {
            retrieveSavedPosts(userId, (error, posts) => {
                unfreeze()
                if (error) {
                    alert(error.message)

                    return
                }
                setPosts(posts)
            })
        }
        retrieveUser(userId, (error, user) => {
            if (error) {
                alert(error.message)

                return
            }
            setUser(user)
        })
    }, [])
    function onShowAllPosts() {
        alert('function')
    }

    useEffect(() => {
        console.log('Refresh Posts -> render in useEffect')
        if (lastPostsUpdate) {
            handleRefreshPosts()
        }
    }, [lastPostsUpdate])

    useEffect(() => {
        console.log('Refresh Posts -> render in useEffect')

        handleRefreshPosts()

    }, [postsFilter])

    function handleRefreshPosts() {
        try {
            if (!postsFilter) {
                retrievePosts(userId, (error, posts) => {
                    unfreeze()
                    if (error) {
                        alert(error.message)

                        return
                    }
                    setPosts(posts)
                })
            }
            if (postsFilter === 'liked') {
                retrieveLikedPosts(userId, (error, posts) => {
                    unfreeze()
                    if (error) {
                        alert(error.message)

                        return
                    }
                    setPosts(posts)
                })
            }
            if (postsFilter === 'saved') {
                retrieveSavedPosts(userId, (error, posts) => {
                    unfreeze()
                    if (error) {
                        alert(error.message)

                        return
                    }
                    setPosts(posts)
                })
            }
            retrieveUser(userId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setUser(user)
            })
        } catch (error) {
            console.log(error)
        }
    }



    function handleToggleLikePost() {
        try {
            handleRefreshPosts()
        } catch (error) {
            console.log(error)
        }
    }
    function handleToggleSavePost() {
        try {
            setUser(user)
            setPosts(posts)
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditPost(id) {
        onEditPost(id)
    }
    function handleAddPost(event) {
        event.preventDefault()
        onAddPostClick()
    }
    function handleHideMenuOptions() {
        alert('refresh')
        handleRefreshPosts()
    }

    console.log(postsFilter)

    if (posts) {
        return <>
            <div className="top">
                <h1>Home</h1>
                <h2 className="welcome-user"></h2>
                <button className="button--create-post" onClick={handleAddPost}>Create post <i className="material-symbols-outlined">add</i></button>
            </div>
            <div className="posts">
                {posts.length === 0 &&
                    <div>
                        <h2>There is no posts yet.
                            <br />But you can create a new one!</h2>

                    </div>}
                {posts.length > 0 && posts.map(post => {

                    if (post.visibility === 'private' && post.author.id === userId || post.visibility === 'public') {
                        return <Post
                            key={post.id}
                            post={post}
                            user={user}
                            onToggleLikePost={handleToggleLikePost}
                            onToggleSavePost={handleToggleSavePost}
                            onEditPostButton={(id) => handleEditPost(id)}
                            onHideMenuOptions={handleHideMenuOptions}
                        />
                    }
                })}
            </div>
        </>
    }


}