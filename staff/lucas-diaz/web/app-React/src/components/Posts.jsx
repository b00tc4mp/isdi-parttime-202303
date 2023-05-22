import retrievePosts from "../logic/retrievePosts.js"
import Post from "./Post.jsx";
import { context } from "../ui.js";
import retrieveUser from "../logic/retrieveUser.js";
import { useState, useEffect } from "react";
import retrieveSavedPosts from "../logic/retrieveSavedPosts.js";


export default function Posts({ onEditPostButtonClick, lastPostsUpdate, view }) {
    console.log("Posts -> render")

    let _posts, _user

    try {
        if (view === "savedPosts") {
            const retrievedPosts = retrievePosts(context.userId);
            _posts = retrieveSavedPosts(context.userId, retrievedPosts)
            _user = retrieveUser(context.userId);
        } else {
            _posts = retrievePosts(context.userId);
            _user = retrieveUser(context.userId);
        }
    } catch (error) {
        alert(error.message)
    }

    const [posts, setPosts] = useState(_posts)
    const [user, setUser] = useState(_user)
    const [isInitialRun, setIsInitialRun] = useState(true)
    //const [view, setView] = useState(view)

    const handleDeletePost = () => {
        try {
            const posts = retrievePosts(context.userId);
            setPosts(posts)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleToggleLike = () => {
        try {
            const posts = retrievePosts(context.userId);
            setPosts(posts)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleRefreshPosts = () => {
        try {
            const posts = retrievePosts(context.userId);
            setPosts(posts)
        } catch (error) {
            alert(error.message);
        }
    }

    const handleOpenEditModal = (id) => {
        onEditPostButtonClick(id)
    }

    const handletoggleSavePost = () => {
        try {
            const posts = retrievePosts(context.userId);
            setPosts(posts)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log("Posts --> componentDidMount with hooks")
        return () => console.log("Posts --> componentWillUnmount with hooks")
    }, [])

    useEffect(() => {
        if (isInitialRun) {
            setIsInitialRun(false)
            return
        } else {
            console.log("Posts -> componentWillReciveProps with hooks")
            handleRefreshPosts();
        }
    }, [lastPostsUpdate])


    return <section className="home-posts-content">
        {posts.map((post, index) => <Post
            key={index}
            post={post}
            user={user}
            onDeleteClick={handleDeletePost}
            onLikeClick={handleToggleLike}
            onEditPostButton={handleOpenEditModal}
            OnSavedPostClick={handletoggleSavePost}
        />)}
    </section>
}
