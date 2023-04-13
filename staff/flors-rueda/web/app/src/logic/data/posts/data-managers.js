import posts from './data'

export const savePosts = () => {
    localStorage.postsJson = JSON.stringify(posts)
}