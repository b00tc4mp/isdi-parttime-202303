
export const users = () => 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

export const posts = () => {
    const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []

    posts.forEach(post => post.date = new Date(post.date))
    posts.forEach(post => {if ("dateLastModified" in post) post.dateLastModified = new Date(post.dateLastModified)})

    return posts
}

export function saveUsers(users) {
    localStorage.usersJson = JSON.stringify(users)
}

export function savePosts(posts) {
    localStorage.postsJson = JSON.stringify(posts)
}

export function saveUser(user) {
    const tmpUsers = users()

    const index = tmpUsers.findIndex(tmpUser => tmpUser.id === user.id)

    if (index < 0)
        tmpUsers.push(user)
    else
        tmpUsers.splice(index, 1,  user)

    saveUsers(tmpUsers)
}

export function savePost(post) {
    const tmpPosts = posts()

    const index = tmpPosts.findIndex(tmpPost => tmpPost.id === post.id)

    if (index < 0)
        tmpPosts.push(post)
    else
        tmpPosts.splice(index, 1, post)

    savePosts(tmpPosts)
}


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
