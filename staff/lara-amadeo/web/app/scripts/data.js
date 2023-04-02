var users = []


users.push({
    username: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
})

users.push({
    username: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123'
})

var findUser = (users, authenticatedEmail) => {
    return users.find(user => user.email === authenticatedEmail)
 }