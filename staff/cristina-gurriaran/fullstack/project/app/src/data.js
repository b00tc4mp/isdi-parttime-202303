console.log('load data')
export const DEFAULT_AVATAR_URL = 'https://cdn-icons-png.flaticon.com/512/4925/4925754.png'
export const LOGO_URL = 'https://as2.ftcdn.net/v2/jpg/02/84/81/51/1000_F_284815181_Ouut7A9reaZWXGTH0HZvX1fUYSggXlwl.jpg'
const DELAY = 200

export const loadUsers = callback => setTimeout(() => {
    callback('usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : [])
}, DELAY)


export const saveUsers = (users,callback) => 
    setTimeout(() => {
        localStorage.usersJson = JSON.stringify(users)

        callback()
    }, DELAY)


export const saveUser = (user, callback) => 
    loadUsers(users => {
        const index = users.findIndex(_user => _user.id === user.id)

        if (index < 0)
            users.push(user)
        else
            users.splice(index, 1, user)

        saveUsers(users, callback)
    })


export const findUserByEmail = (email, callback) => 
    loadUsers(users => callback(users.find(user => user.email === email)))


export const findUserById = (userId, callback) => 
    loadUsers(users => callback(users.find(user => user.id === userId)))


export const loadPosts = callback => 
    setTimeout(() => {
        const posts = ('postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : [])
        posts.forEach(post => post.date = new Date(post.date))

        callback(posts)
}, DELAY)


export const savePosts = (posts, callback) => 
    setTimeout(() => {
        localStorage.postsJson = JSON.stringify(posts)
        callback()
    }, DELAY)


export const savePost = (post, callback) => 
    loadPosts(posts => {
        const index = posts.findIndex(_post => _post.id === post.id)

        if (index < 0)
            posts.push(post)
        else
            posts.splice(index, 1, post)
            
        savePosts(posts, callback)
    })

    
export const findPostById = (postId, callback) => 
    loadPosts(posts => callback(posts.find (post => post.id === postId))) 
