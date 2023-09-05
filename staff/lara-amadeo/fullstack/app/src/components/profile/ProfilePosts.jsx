import ProfilePost from "./ProfilePost"
import { context } from "../../logic/context"
import retrievePosts from "../../logic/retrievePosts"
import './ProfilePosts.css'
import { useEffect, useState } from "react"
import { useContext } from "react"
import Context from "../../Context"
import { extractSubFromToken } from "../../logic/helpers/utils"
export default function ProfilePosts() {

    const [posts, setPosts] = useState()
    const { generateToast } = useContext(Context)

    const userId = extractSubFromToken(context.token)

    useEffect(() => {
        try {
            retrievePosts()
                .then(({ posts }) => {
                    const userPosts = posts.filter(post => post.author.id === userId)
                    setPosts(userPosts)
                })
                .catch(error => generateToast(error.message, 'error'))
        } catch (error) {
            generateToast(error.message, 'error')
            console.log(error.stack)
        }
    }, [])

    return <>
        {posts && <div className="flex flex-wrap w-full h-fit gap-[8px] box-border">
            {posts.map(post => <ProfilePost key={post.id} post={post} />)}
        </div>}</>
}