import Post from "./Post";
import { useState, useEffect } from "react";
import { retrievePosts, retrieveSavedPosts, retrieveUserPosts, getUserId, retrieveSeenPosts, retrieveSearchedPosts } from "../../logic";
import { useAppContext, useHandleErrors } from "../hooks"
import { Input, Button } from "../library";

export default function Posts({ lastPostsUpdate, view, handleTogglePostModal, textToSearch, handleSearch }) {
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

                    const _posts = await retrievePosts()

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
            else if (view === 'searchedPosts') {
                handleErrors(async () => {
                    freeze()

                    console.debug('Searched postsss -> render')

                    const _posts = await retrieveSearchedPosts(textToSearch)

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
        <h1 className="w-full text-center text-5xl font-thin underline mb-4">{view === 'posts' ? 'Home page' : view === 'savedPosts' ? 'Saved posts' : view === 'userPosts' ? 'My posts' : view === 'seenPosts' ? 'Seen lately' : view === 'searchedPosts' ? ' Searched posts' : ''}</h1>
        {view === 'posts' && <>
            <form className='search-form w-full flex justify-center rounded-lg' onSubmit={handleSearch}>
                <div className="border-2 border-slate-300 flex rounded-lg gap-1">
                    <Input className='border-none w-60' placeholder='Search some topics' name='textToSearch'></Input>
                    <Button><span className="material-symbols-outlined">search</span></Button>
                </div>
            </form>
        </>}
        {posts && posts.map(post => (post.author.id !== getUserId() && !post.visible) ? '' : <Post
            key={post.id.toString()}
            post={post}
            handleTogglePostModal={handleTogglePostModal}
        />)}
        {(!posts || !posts.length) && <h2 className="text-2xl my-10 border border-gray-600 p-4 rounded-lg">There is no posts availabe!</h2>}
    </section>
}