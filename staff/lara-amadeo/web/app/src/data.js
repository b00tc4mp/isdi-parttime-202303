export const users = "usersJSON" in localStorage? JSON.parse(localStorage.usersJSON) : []
    
export const posts = "postsJSON" in localStorage? JSON.parse(localStorage.postsJSON) : []

export const likedPosts = "likedPostsJSON" in localStorage? JSON.parse(localStorage.likedPostsJSON) : []

posts.forEach(post => post.date = new Date(post.date))

export function saveUsersInStorage() {
    
    localStorage.usersJSON = JSON.stringify(users)
}

export function savePostsInStorage() {
    localStorage.postsJSON = JSON.stringify(posts)
}

export function saveLikedPostsInStorage() {
    localStorage.likedPostsJSON = JSON.stringify(likedPosts)
}