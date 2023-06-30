import { useEffect, useState } from "react"
import { context } from "../../ui"
import ProfileSavedPost from "./ProfileSavedPost"
import './ProfileSavedPosts.css'
import retrieveSavedPosts from "../../logic/retrieveSavedPosts"
import { useContext } from "react"
import Context from "../../Context"
export default function ProfileSavedPosts() {

    const [savedPosts, setSavedPosts] = useState()
    const { generateToast } = useContext(Context)

    useEffect(() => {
        try {
            retrieveSavedPosts(context.token, (error, posts) => {
                if (error) {
                    generateToast(error.message, 'error')
                    console.log(error.stack)
                    return
                }
                setSavedPosts(posts)
            })
        } catch (error) {
            generateToast(error.message, 'error')
        }
    }, [])

    return <>
        {savedPosts && <div className="flex flex-wrap w-full h-fit gap-[8px] box-border">
            {savedPosts.map(post => <ProfileSavedPost key={post._id} post={post} />)}
        </div>}
    </>
}