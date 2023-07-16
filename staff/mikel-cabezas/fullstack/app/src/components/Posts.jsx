import { useEffect, useState, useContext } from "react"
import Post from "./Post"
import retrievePosts from "../logic/posts/retrievePosts"
import retrieveLikedPosts from "../logic/posts/retrieveLikedPosts"
import retrieveSavedPosts from "../logic/posts/retrieveSavedPosts"
import { context } from "../ui"
import './Posts.css'
import retrieveUser from "../logic/users/retrieveUser"
import Context from "../AppContext"
import { utils } from 'com'
const { extractSubFromToken } = utils


export default function Posts({ onEditPost, onAddPostClick, lastPostsUpdate, postsFilter, onToggleLikePostClick, onToggleSavePostClick, onHideMenuOptions, visibility, onShowAllPosts, onPostDeleted }) {
    const token = context.token
    const userId = extractSubFromToken(token)
    const [posts, setPosts] = useState()
    const [user, setUser] = useState()
    const { alert, freeze, unfreeze } = useContext(Context)

    useEffect(() => {
        console.log('Refresh Posts -> render in useEffect')
        try {
            freeze()
            if (!postsFilter) {
                console.log('   Show all Posts -> render in useEffect onLoad compo')
                retrievePosts(token)
                    .then(posts => {
                        unfreeze()
                        setPosts(posts)
                    })
                    .catch(error => {
                        unfreeze()
                        alert(error.message)
                    })
            }

            if (postsFilter === 'liked') {
                console.log('   Show liked Posts -> render in useEffect onLoad compo')
                retrieveLikedPosts(token)
                    .then(posts => {
                        unfreeze()
                        setPosts(posts)
                    })
                    .catch(error => {
                        unfreeze()
                        alert(error.message)
                    })
            }
            if (postsFilter === 'saved') {
                console.log('   Show saved Posts -> render in useEffect onLoad compo')
                retrieveSavedPosts(token)
                    .then(posts => {
                        unfreeze()
                        setPosts(posts)
                    })
                    .catch(error => {
                        unfreeze()
                        alert(error.message)
                    })
            }
            retrieveUser(token)
                .then(user => setUser(user))
                .catch(error => {
                    unfreeze()
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }

    }, [])
    function onShowAllPosts() {
        alert('function')
    }

    useEffect(() => {
        console.log('Refresh Posts -> render in useEffect on lastPostsUpdate changed')
        if (lastPostsUpdate) {
            handleRefreshPosts()
        }
    }, [lastPostsUpdate])

    useEffect(() => {
        console.log('Refresh Posts -> render in useEffect on postsFilter changed')

        handleRefreshPosts()
    }, [postsFilter])

    function handleRefreshPosts() {
        try {
            if (!postsFilter) {
                console.log('   Show all Posts -> render in handleRefreshPosts')
                retrievePosts(token)
                    .then(posts => {
                        unfreeze()
                        setPosts(posts)
                    })
                    .catch(error => {
                        unfreeze()
                        alert(error.message)
                    })
            }
            if (postsFilter === 'liked') {
                console.log('   Show liked Posts -> render in handleRefreshPosts')
                retrieveLikedPosts(token)
                    .then(posts => {
                        unfreeze()
                        setPosts(posts)
                    })
                    .catch(error => {
                        unfreeze()
                        alert(error.message)
                    })
            }
            if (postsFilter === 'saved') {
                console.log('   Show saved Posts -> render in handleRefreshPosts')
                retrieveSavedPosts(token)
                    .then(posts => {
                        unfreeze()
                        setPosts(posts)
                    })
                    .catch(error => {
                        unfreeze()
                        alert(error.message)
                    })
            }
            retrieveUser(token)
                .then(user => {
                    setUser(user)
                })
                .catch(error => alert(error.message))
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
    function handlePostDeleted(id) {
        alert()
        onPostDeleted(id)
    }
    function handleAddPost(event) {
        event.preventDefault()
        onAddPostClick()
    }
    function handleHideMenuOptions() {
        alert('refresh')
        handleRefreshPosts()
    }

    if (posts) {
        return <>
            <div className="top">
                <h1>Home</h1>
                <h2 className="welcome-user"></h2>
                <button className="button--create-post flex items-center justify-center text-sm" onClick={handleAddPost}>Create post <span className="material-symbols-outlined ml-1 w-5 items-center">add</span></button>
            </div>
            <div className="posts" key={false}>
                {posts.length === 0 &&
                    <div>
                        <h2>There is no {postsFilter && `${postsFilter} `}posts yet.
                            <br />But you can {postsFilter && `add`} {!postsFilter && `create`} a new one!</h2>
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
                            onPostDeleted={handlePostDeleted}
                        />
                    }
                })}
            </div>
        </>
    }
}