var users = []


users.push({
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
})

users.push({
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123'
})

var findUser = (users, authenticatedEmail) => {
    return users.find(user => user.email === authenticatedEmail)
 }