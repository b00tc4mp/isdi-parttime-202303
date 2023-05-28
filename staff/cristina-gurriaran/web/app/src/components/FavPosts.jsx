import retrieveFavPosts from "../logic/retrieveFavPosts";
import FavPost from "./FavPost"
import { context } from "../ui";
import { useState, useEffect, useContext } from "react";
import Context from '../Context'


export default function FavPosts(){
    const { alert } = useContext(Context)
    const [favPosts, setFavPosts] = useState()

    useEffect(() => renderFavPosts(), [])

    const renderFavPosts = () => {

        try{ 
            retrieveFavPosts(context.userId, (error, posts) => {
                if(error){
                    alert(error.message)
                    return
                }
                setFavPosts(posts)    
            })
            
        } catch(error) {
            alert(error.message)
        }
    }

    return <section>
    {favPosts && favPosts.map(post => <FavPost 
        key={post.id} 
        post={post} 

    />)}
    </section> 
}