export const users = 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

export function saveUsers () {
    localStorage.usersJson = JSON.stringify(users)
}



export const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []
posts.forEach(post => post.date = new Date (post.date))

export function savePosts () {
    localStorage.postsJson = JSON.stringify(posts)
}