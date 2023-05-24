import retrievePosts from "../logic/retrievePosts.js"
import Post from "./Post.jsx";
import { context } from "../ui.js";
import retrieveUser from "../logic/retrieveUser.js";
import { useState, useEffect } from "react";
import retrieveSavedPosts from "../logic/retrieveSavedPosts.js";


export default function Posts({ onEditPostButtonClick, lastPostsUpdate, view }) {
    console.log("Posts -> render")

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState()
    const [isInitialRun, setIsInitialRun] = useState(true)



    useEffect(() => {
        try {
            chechWeatherPostsOrSavedPosts();
        } catch (error) {
            alert(error.message);
        }
    }, [context.userId, view]);


    const chechWeatherPostsOrSavedPosts = () => {
        if (view === "savedPosts") {

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

        } else {
            
            retrievePosts(context.userId, (error, _posts) => {
                if (error) {
                    alert(error)
                    return;
                }
                setPosts(_posts)
            })
        }

        retrieveUser(context.userId, (error, user) => {
            if (error) {
                alert(error)
                return;
            }

            setUser(user);
        });

    }


    const handleDeletePost = () => {
        try {
            chechWeatherPostsOrSavedPosts()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleToggleLike = () => {
        try {
            chechWeatherPostsOrSavedPosts()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleRefreshPosts = () => {
        try {
            chechWeatherPostsOrSavedPosts()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleOpenEditModal = (id) => {
        onEditPostButtonClick(id)
    }
    const handletoggleSavePost = () => {
        try {
            chechWeatherPostsOrSavedPosts()
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
