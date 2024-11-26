// TODO steps
    // - input validations
    // - verify user exists in database
    // - verify post exists
    // - verify post belongs to user (post.author === userId)
    // - modify post with new data
    // - save posts
    
    import { posts, savePosts } from "../data.js";
    import { renderPosts } from "../pages/home-page.js";
    import { findUserById, findPostById } from "./helpers/data-managers.js"; 
    import { validateId, validatePostId, validatePostUrl, validateText } from "./helpers/validators.js";

    export function updatePost(userId, postId, imageUrl, text) {
        validateId(userId)
        validatePostId(postId)
        validatePostUrl(imageUrl) 
        validateText(text)
        
        const user = findUserById(userId)
        if (!user) throw new Error('user not found') 

        const post= findPostById(postId)
        if (!post) throw new Error('post not found') 

        if(post.author !== userId) throw new Error('Only author can update post')

        else{
            post.image = imageUrl;
            post.text = text;
            post.date = new Date()
            savePosts(post)
            

        }
    }