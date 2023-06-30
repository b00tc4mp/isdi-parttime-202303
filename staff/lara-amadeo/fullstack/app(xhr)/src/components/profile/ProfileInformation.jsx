import retrieveUser from "../../logic/retrieveUser"
import { context } from "../../ui"
import './ProfileInformation.css'
import { useEffect, useState } from "react"
import retrievePosts from "../../logic/retrievePosts"
import { useContext } from "react"
import Context from "../../Context"
export default function ProfileInformation() {

    const [user, setUser] = useState()
    const [posts, setPosts] = useState()
    const { generateToast } = useContext(Context)

    useEffect(() => {
        try {
            retrieveUser(context.token, (error, user) => {
                if (error) {
                    generateToast(error.message, 'error')
                    console.log(error.stack)
                    return
                }
                setUser(user)

                retrievePosts(context.token, (error, posts) => {
                    if (error) {
                        generateToast(error.message, 'error')
                        console.log(error.stack)
                        return
                    }
                    setPosts(posts)
                })
            })
        } catch (error) {
            generateToast(error.message, 'error')
            console.log(error.stack)
        }
    }, [])

    return <div className="w-full flex gap-[64px] items-start justify-start mb-[80px] max-[480px]:flex-col max-sm:gap-[24px]">
        {user && <img className="w-[160px] h-[160px] rounded-3xl object-cover max-sm:w-[72px] max-sm:h-[72px] max-sm:rounded-xl" src={user.avatar} alt="" />}
        <div className="flex flex-col gap-[48px] max-sm:gap-[16px]">
            <div>
                {user && <p className="title">{user.username}</p>}
                <p className="body-text">Very long biography of this person or avatar</p>
            </div>

            <div className="w-full flex justify-between">
                <div className="flex gap-[4px]">
                    {posts && <>
                        <p className="body-text-bold">{posts.reduce((num, post) => (post.author.id === context.token ? num + 1 : num), 0)}</p>
                    </>}
                    <p className="body-text">posts</p>
                </div>

                <div className="flex gap-[4px]">
                    <p className="body-text-bold">23</p>
                    <p className="body-text">followers</p>
                </div>

                <div className="flex gap-[4px]">
                    <p className="body-text-bold">23</p>
                    <p className="body-text">following</p>
                </div>
            </div>
        </div>
    </div>
}