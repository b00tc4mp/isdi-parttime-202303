const DELAY = 1000

export const loadUsers = callback => 
    setTimeout(() =>
        callback('usersJson' in localStorage? JSON.parse(localStorage.usersJson) : [])
        , DELAY
    )

export const saveUsers = (users, callback) =>
    setTimeout(() => {
            localStorage.usersJson = JSON.stringify(users)

            callback()
        }
        , DELAY
    )

export const saveUser = (user, callback) =>
    loadUsers(users => {
            const index = users.findIndex(tmpUser => tmpUser.id === user.id)

            if (index < 0)
                users.push(user)
            else
                users.splice(index, 1,  user)
        
            saveUsers(users, callback)
        }
    )

export const newUserId = callback => 
    loadUsers(users => {
            let userId = 'user-1'

            const lastUser = tmpUser[users.length - 1]

            if (lastUser)
                userId = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
        
            callback(userId)
        }
    )

export const findUserById = (userId, callback) =>
    loadUsers(users =>        
        callback(users.find(user => user.id === userId))
    )

export const findUserByEmail = (email, callback) =>
    loadUsers(users =>        
        callback(users.find(user => user.email === email))
    )

export const loadPosts = callback => 
    setTimeout(() => {
            const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []

            posts.forEach(post => post.date = new Date(post.date))
            posts.forEach(post => {if ("dateLastModified" in post) post.dateLastModified = new Date(post.dateLastModified)})
        
            callback(posts)
        }
        , DELAY
    )


export const savePosts = (posts, callback) =>
    setTimeout(() => {
            localStorage.postsJson = JSON.stringify(posts)

            callback()
        }
        , DELAY
    )

export const savePost = (post, callback) =>
    loadPosts(posts => {
        const index = posts.findIndex(tmpPost => tmpPost.id === post.id)

        if (index < 0)
            posts.push(post)
        else
            posts.splice(index, 1, post)
    
        savePosts(posts, callback)
    })

export const  newPostId = callback =>
    loadPosts(posts => {
        let postId = 'post-1'

        const lastPost = posts[posts.length - 1]

        if (lastPost)
            postId = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

        callback(postId)
    })


export const findPostById = (postId, callback) => 
    loadPosts(posts => 
        callback(posts.find(post => post.id === postId))
    )


export const postsAuction = () => {
    const posts = 'postsAuctionJson' in localStorage? JSON.parse(localStorage.postsAuctionJson) : []

    posts.forEach(postAuction => postAuction.dateEnd = new Date(postAuction.dateEnd))

    return postsAuction
}

export function savePostsAuction(postsAuction) {
    localStorage.postsAuctionJson = JSON.stringify(postsAuction)
}

export function savePostAuction(postAuction) {
    const tmpPostsAuction = postsAuction()

    const index = tmpPostsAuction.findIndex(tmpPostAuction => tmpPostAuction.id === postAuction.id)

    if (index < 0)
        tmpPostsAuction.push(postAuction)
    else
        tmpPostsAuction.splice(index, 1, postAuction)

    savePostsAuction(tmpPostsAuction)
}

export function findPostAuctionById(postId) {
    return postsAuction().find(postAuction => postAuction.id === postId)
}

/*
///////////////////////////////////
const users2 = JSON.parse(localStorage.usersJson)

users2.forEach(user => {
    if (!user.favs) 
        user.favs = []
})

localStorage.usersJson = JSON.stringify(users2)

const posts2 = JSON.parse(localStorage.postsJson)

posts2.forEach(post => {
    if (!post.likes) 
        post.likes = []
})

localStorage.postsJson = JSON.stringify(posts2)
/////////////////////////////////////
*/

/*
//carga de vacio
if (users().length === 0) {
    const tmpUsers = []
    tmpUsers.push({
        id: 'user-1',
        name: "Wendy Darling",
        email: "wendy@darling.com",
        password: "123123123"
    })

    tmpUsers.push({
        id: 'user-2',
        name: "Peter Pan",
        email: "peter@pan.com",
        password: "123123123",
    })

    tmpUsers.push({
        id: 'user-3',
        name: "Pepito Grillo",
        email: "pepito@grillo.com",
        password: "123123123"
    })

    saveUsers(tmpUsers)
}

if (posts().length === 0) {
    const tmpPosts = []
    tmpPosts.push({
        id: 'post-1',
        author: 'user-1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png',
        text: 'Smile!',
        date: new Date()
    })

    tmpPosts.push({
        id: 'post-2',
        author: 'user-1',
        image: 'https://img.icons8.com/color/512/avatar.png',
        text: 'I ♥️ Avatars!',
        date: new Date()
    })

    tmpPosts.push({
        id: 'post-3',
        author: 'user-2',
        image: 'https://img.icons8.com/color/512/avatar.png',
        text: 'I ♥️ Avatars too!',
        date: new Date()
    })

    savePosts(tmpPosts)
}
*/