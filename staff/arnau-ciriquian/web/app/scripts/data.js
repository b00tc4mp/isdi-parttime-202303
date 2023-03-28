var users = [];

users.push({
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123',
})

users.push({
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123',
})

users.push({
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123',
})

var loggedUser = {}

function findUserByEmail(email) {
    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

    return foundUser
}