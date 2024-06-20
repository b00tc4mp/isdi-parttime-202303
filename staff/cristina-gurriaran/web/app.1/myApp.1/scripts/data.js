users = []

users.push({
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123',
    avatar: 'https://cdn-icons-png.flaticon.com/512/4927/4927515.png'
})

users.push({
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123',
    avatar: 'https://cdn-icons-png.flaticon.com/512/4925/4925803.png'
})

users.push({
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123',
    avatar:'https://cdn-icons-png.flaticon.com/512/4925/4925812.png'
})



function findUserByEmail(email, password){

    var foundUser 

    for ( var i = 0; i < users.length; i++){
        var user = users[i]

        if (user.email === email){
            foundUser = user

            break
        }
    }

    return foundUser
}
