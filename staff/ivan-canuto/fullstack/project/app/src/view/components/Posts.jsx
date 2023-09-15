import Post from "./Post";
import { useState, useEffect } from "react";
import { retrievePosts, retrieveSavedPosts, retrieveUserPosts, getUserId, retrieveSeenPosts, retrieveSearchedPosts } from "../../logic";
import { useAppContext, useHandleErrors } from "../hooks"

export default function Posts({ lastPostsUpdate, view, handleTogglePostModal, textToSearch }) {
    const { freeze, unfreeze } = useAppContext()
    const handleErrors = useHandleErrors()

    const [posts, setPosts] = useState(null)

    useEffect(() => handleRefreshPosts(), [])

    const handleRefreshPosts = () => {
        try {
            if (view === 'posts') {
                handleErrors(async () => {
                    freeze()

                    console.debug('Postsss -> render')

                    const _posts = await retrievePosts('Show all')

                    setPosts(_posts)

                    unfreeze()
                })
            }
            else if (view === 'savedPosts') {
                handleErrors(async () => {
                    freeze()

                    console.debug('Saved postsss -> render')

                    const _posts = await retrieveSavedPosts()

                    setPosts(_posts)

                    unfreeze()
                })
            }
            else if (view === 'userPosts') {
                handleErrors(async () => {
                    freeze()

                    console.debug('Own postsss -> render')

                    const _posts = await retrieveUserPosts()

                    setPosts(_posts)

                    unfreeze()
                })
            }
            else if (view === 'seenPosts') {
                handleErrors(async () => {
                    freeze()

                    console.debug('Seen postsss -> render')

                    const _posts = await retrieveSeenPosts()

                    setPosts(_posts)

                    unfreeze()
                })
            }
        } catch (error) {
            alert(error, 'error')
            console.debug(error)
        }
    }

    useEffect(() => {
        console.debug('Posts -> "ComponentWillRecieveProps" with hooks.');

        if (lastPostsUpdate) {
            console.log('Post -> last render');

            handleRefreshPosts()
        }
    }, [lastPostsUpdate])

    return <section className="pb-12 flex flex-col items-center gap-6 absolute top-28 left-0 w-full">
        <h1 className="w-full text-center text-5xl font-thin underline mb-4">{view === 'posts' ? 'Home page' : view === 'savedPosts' ? 'Saved posts' : view === 'userPosts' ? 'My posts' : view === 'seenPosts' ? 'Seen lately' : ''}</h1>
        
        {posts && posts.map(post => (post.author.id !== getUserId() && !post.visible) ? '' : <Post
            key={post.id.toString()}
            post={post}
            handleTogglePostModal={handleTogglePostModal}
        />)}
        {(!posts || !posts.length) && <h2 className="text-2xl my-10 border border-gray-600 p-4 rounded-lg">There is no posts availabe!</h2>}
    </section>
}