import retrievePosts from "../logic/retrievePosts.js"
import Post from "./Post.jsx";
import { context } from "../ui.js";
import retrieveUser from "../logic/retrieveUser.js";
import { useState, useEffect } from "react";
import retrieveSavedPosts from "../logic/retrieveSavedPosts.js";
import retrieveUserPosts from "../logic/retrieveUserPosts.js";


export default function Posts({ onEditPostButtonClick, lastPostsUpdate, view }) {
    console.log("Posts -> render")

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState()
    const [isInitialRun, setIsInitialRun] = useState(true)

    useEffect(() => {
        try {
            checkPostType();
        } catch (error) {
            alert(error.message);
        }
    }, []);

    const checkPostType = () => {
        console.log(view);
        switch (view) {
            case "posts":
                retrievePosts(context.userId, (error, _posts) => {
                    if (error) {
                        alert(error)
                        return;
                    }
                    setPosts(_posts)
                })
                retrieveUser(context.userId, (error, user) => {
                    if (error) {
                        alert(error)
                        return;
                    }
                    setUser(user);
                })
                break;

            case "savedPosts":
                retrievePosts(context.userId, (error, retrievedPosts) => {
                    if (error) {
                        alert(error)
                        return;
                    }
                    retrieveSavedPosts(context.userId, retrievedPosts, (error, _posts) => {
                        if (error) {
                            alert(error)
                            return;
                        }
                        setPosts(_posts)
                    })
                });
                retrieveUser(context.userId, (error, user) => {
                    if (error) {
                        alert(error)
                        return;
                    }
                    setUser(user);
                })
                break;

            case "userPosts":
                retrievePosts(context.userId, (error, retrievedPosts) => {
                    if (error) {
                        alert(error)
                        return;
                    }
                    retrieveUserPosts(context.userId, retrievedPosts, (error, _posts) => {
                        if (error) {
                            alert(error)
                            return;
                        }
                        setPosts(_posts)
                    })
                });
                retrieveUser(context.userId, (error, user) => {
                    if (error) {
                        alert(error)
                        return;
                    }
                    setUser(user);
                });
                break;
            default:
                break;
        }
    }

    const handleDeletePost = () => {
        try {
            checkPostType()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleToggleLike = () => {
        try {
            checkPostType()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleRefreshPosts = () => {
        try {
            checkPostType()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleOpenEditModal = (id) => {
        onEditPostButtonClick(id)
    }
    const handletoggleSavePost = () => {
        try {
            checkPostType()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleHidePost = () => {
        try {
            checkPostType()
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
            onHidenPostClick={handleHidePost}
        />)}
    </section>
}
