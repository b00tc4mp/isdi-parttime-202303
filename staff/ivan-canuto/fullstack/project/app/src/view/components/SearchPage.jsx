import { retrievePosts, getUserId, retrieveSearchedPosts } from "../../logic";
import { useHandleErrors, useAppContext } from "../hooks";
import { useState, useEffect } from "react";
import { Post, PostModalWindow } from ".";
import { Input, Button } from "../library";

export default function SearchModal({
    handleOpenEditPost,
    handleOpenDeletePost,
    handleToggleVisibility,
    handleLastPostsUpdate,
    lastPostsUpdate,
    handleOpenProfile
}) {
    const handleErrors = useHandleErrors()
    const { freeze, unfreeze } = useAppContext()

    const [posts, setPosts] = useState(null)
    const [subjectModal, setsubjectModal] = useState(true)
    const [subject, setSubject] = useState(null)
    const [postModal, setPostModal] = useState(false)

    useEffect(() => {
        if(subject)
            handleErrors(async () => {
                freeze()

                const _posts = await retrievePosts(subject)

                setPosts(_posts)

                unfreeze()
            })
    }, [subject])
    
    const handleSelectSubject = (subject) => {
        setSubject(subject)
        setsubjectModal(false)
    }

    const handleTogglePostModal = () => {
        setPostModal(!postModal)

        document.body.classList.toggle('overflow-hidden')
    }

    const handleSearch = event => {
        event.preventDefault()
        
        handleErrors(async () => {
            freeze()

            const textToSearch = event.target.textToSearch.value

            if(!textToSearch.length) return

            const _posts = await retrieveSearchedPosts(subject, textToSearch)

            setPosts(_posts)

            event.target.textToSearch.value = ''

            unfreeze()
        })
    }

    const handleToggleSubjectModal = () => {
        setsubjectModal(true)

        setSubject(null)
    }

    return <section className="w-full absolute top-28 left-0 overflow-scroll">

        <div className="w-full h-full flex flex-col gap-6 items-center overflow-scroll pb-20">
            <h1 className="w-full text-center text-5xl font-thin underline mb-4">{`${subject} posts`}</h1>

            <form className='search-form w-full flex justify-center rounded-lg' onSubmit={handleSearch}>
                <div className="border-2 border-slate-300 flex rounded-lg gap-1">
                    <Input className='border-none w-60' placeholder='Search some topics' name='textToSearch'></Input>
                    <Button><span className="material-symbols-outlined">search</span></Button>
                </div>
            </form>

            {posts && posts.map(post => (post.author.id !== getUserId() && !post.visible) ? '' : <Post
                key={post.id.toString()}
                post={post}
                handleTogglePostModal={handleTogglePostModal}
            />)}
            {(!posts || !posts.length) && <h2 className="text-2xl my-10 border border-gray-600 p-4 rounded-lg">There is no posts availabe!</h2>}

            <Button className='fixed bottom-4 border border-black' onClick={handleToggleSubjectModal}>Search by different subjects</Button>
        </div>

        {postModal && <PostModalWindow
            handleOpenEditPost={handleOpenEditPost}
            handleOpenDeletePost={handleOpenDeletePost}
            handleToggleVisibility={handleToggleVisibility}
            handleLastPostsUpdate={handleLastPostsUpdate}
            handleTogglePostModal={handleTogglePostModal}
            lastPostsUpdate={lastPostsUpdate}
            handleOpenProfile={handleOpenProfile}
        />}

        {subjectModal && <section className="w-full h-full fixed top-24 left-0 z-10 bg-white overflow-scroll">
            <div className="w-full h-1/5 flex">
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Language and literature')}>Language and literature</div>
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Mathematics')}>Mathematics</div>
            </div>
            <div className="w-full h-1/5 flex">
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Natural sciences')}>Natural sciences</div>
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Social Sciences')}>Social Sciences</div>
            </div>
            <div className="w-full h-1/5 flex">
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Geography')}>Geography</div>
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('History')}>History</div>
            </div>
            <div className="w-full h-1/5 flex">
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Physics')}>Physics</div>
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Biology')}>Biology</div>
            </div>
            <div className="w-full h-1/5 flex">
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Chemistry')}>Chemistry</div>
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Biology')}>Philosophy</div>
            </div>
            <div className="w-full h-1/5 flex">
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Others')}>Others</div>
                <div className="w-1/2 h-full border border-slate-300 flex justify-center items-center" onClick={() => handleSelectSubject('Show all')}>Show all</div>
            </div>
            <div className="w-full h-24"></div>
        </section>}
    </section>
}