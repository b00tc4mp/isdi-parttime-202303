import retrievePosts from './retrievePosts.js'
import { context } from '../ui.js'

export default function Posts() {
    try {
        const posts = retrievePosts(context.userId)

        return <section></section>

    } catch (error){
        throw new Error(error.message)
    }
  
}