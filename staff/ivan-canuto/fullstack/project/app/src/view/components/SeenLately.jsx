import { useEffect } from "react"
import { useHandleErrors } from "../hooks"
import { retrieveSeenPosts } from "../../logic"

export default function SeenLately() {
    const handleErrors = useHandleErrors()

    const [posts, setPosts] = useState()

    useEffect(() => {
        handleErrors(async () => {
            const seenPosts = await retrieveSeenPosts()

            setPosts(seenPosts)
        })
    },[])

    return <section className="absolute top-14 right-0 w-full h-full flex flex-col gap-2">
        <h1>Last 15 seen posts</h1>
        {posts && <div>
            {posts.map(post => {
                
            })}    
        </div>}
    </section>
}