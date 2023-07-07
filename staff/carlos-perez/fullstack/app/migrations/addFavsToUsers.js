const users = JSON.parse(localStorage.usersJson)

users.forEach(user => {
    if (!user.favs) 
        user.favs = []
})

localStorage.usersJson = JSON.stringify(users)