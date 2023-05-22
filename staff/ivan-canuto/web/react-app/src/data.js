const DELAY = 500

export const loadUsers = callBack => { setTimeout(() => {
    callBack('usersJson' in localStorage? JSON.parse(localStorage.usersJson) : [])
}, DELAY)}

export const saveUsers = (users, callBack) => { setTimeout(() => {
    localStorage.usersJson = JSON.stringify(users)

    callBack()
}, DELAY)}

export const saveUser = (user, callBack) => {
    loadUsers(users => {

        const index = users.findIndex(oldUser => oldUser.id === user.id)
    
        if(index < 0) {
            users.push(user)
        } else {
            users.splice(index, 1, user)
        }
    
        saveUsers(users, callBack)
    })
}

export const findUserByEmail = (email, callBack)=> {
    loadUsers((users) => {
        let user = users.find(_user => _user.email === email)
        
        callBack(user)
    })
}

export const findUserById = (userId, callBack)=> {
    loadUsers((users) => {
        let user = users.find(_user => _user.id === userId)

        callBack(user)
    })
}


export const loadPosts = callBack => { setTimeout( () => {
    callBack('postsJson' in localStorage? JSON.parse(localStorage.postsJson) : [])
}, DELAY)}

export const savePosts = (posts, callBack) => { setTimeout(() => {
    localStorage.postsJson = JSON.stringify(posts)

    callBack()
}, DELAY)}

export const savePost = (post, callBack) => {
    
    loadPosts(posts => {

        const index = posts.findIndex(oldPost => oldPost.id === post.id)
    
        if(index < 0) {
            posts.push(post)
        } else {
            posts.splice(index, 1, post)
        }
    
        savePosts(posts, callBack)
    })
}

export const findPostById = (postId, callback) => {
    loadPosts(posts => {
        const post = posts.find(_post => _post.id === postId)

        callback(post)
    })
}