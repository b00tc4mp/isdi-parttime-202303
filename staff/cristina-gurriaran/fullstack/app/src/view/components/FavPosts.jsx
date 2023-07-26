import retrieveFavPosts from '../../logic/retrieveFavPosts'
import FavPost from "./FavPost"
import { useState, useEffect } from "react";
import { useAppContext, useHandleErrors } from '../hooks'


export default function FavPosts(user){
    const { alert, freeze, unfreeze } = useAppContext()
    const handleErrors = useHandleErrors()

    const [favPosts, setFavPosts] = useState()

    useEffect(() => renderFavPosts(), [])

    const renderFavPosts = () => {
        try{ 
            freeze()

            handleErrors(async () => {  
                const posts = await retrieveFavPosts()
                setFavPosts(posts)
                unfreeze()
            })

        } catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    return  <section>
    {favPosts && favPosts.map((post) => <FavPost 
        key={post.id} 
        post={post} 
        user={user} 
    />)}
    </section> 
}