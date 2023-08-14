console.log('load data')
export const DEFAULT_AVATAR_URL = 'https://cdn-icons-png.flaticon.com/512/4925/4925754.png'
export const LOGO_URL = 'https://lh3.googleusercontent.com/pw/AIL4fc92x7gkms6uHvkMBtxfS7T0FDBeVc5w8jaHCASnS9TSR8H_-FxH04bEV57FIRCxX917I0YBEQnQt-XixbJYL6Whtv1K1w3rAQhBA2wJvpjnbDbACDJYnbC7Lpkg4YdQgkqOcFiqDPoO1s-EeFmW1QWwggU62sC-HaDwLBKmoAuBz_cRX6IoDf08BZkQTj3V7o2AAudDTWFJY8JuYW6Df2UER6FswNs0KUu9WjWT6ZaFE7I1PJPM-A6EaY7rQgJO6BGhf35Iw_sI41j1Id9wtbCi2k3-Oa6unkkdP0GIOphWaPK5XKIxHEk_ArDZDfBSey-I5fiTasxdkTwyMPjM35ZZDb5lqrh8430edw7IyfyOnZZ00tD3vlT4NkpIKAibJUzw-1yDcOMAVbdaOC3h1ZcSIwLxJlZqHojxkByQxu-kj9PRbaBKcqVLEPaPheRmRAJcDj2QBHpzaUwUlC47wHmSVigAqrqEvDKBxrvIhwu7YvkszTosGzMf7CSmXz8s7fR7sDb1z4XlaEVBUxXLBoUQ_AhyEe_I0CxqEnm-sCyiRodmuYvUKlmupzduiEJBut_QIq6hBnyMKUepzfGkUz5NhqeUg1e07r1rVdrXn6bIzyFRAy7sE5hakO1tZ6yLzSjSpI_sHRo_Vbs9xqxb73UlRuICUKrEz5cqPV0SDkbjdKH-zEWK4vSmyglum0VYsislx5KcCGq09wWfC4mP7RH1den1r4rxSBR6U3b0lA0NItCsQTfMUpDT4TZvdsuw9E0mp1OaUTNZmI2NVMGaE_sxjXihXs9HXp1qU28lVBjQv6NXVO53oJVz1oAXt87u65P65txdUYUl1w5ZWqvLQBoRUqqjSBylArT8LzXHw24-fes6rmJDWZr6KnCG40Cuva1XeJA56KcIo0OVTW6a96M=w768-h1010-s-no?authuser=0'
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
