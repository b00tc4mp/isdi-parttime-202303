var users=[]

users.push({
    name: 'Rufus',
    email: 'rufus@rufus.es',
    password: '1234567'
})

users.push({
    name: 'Frida',
    email: 'frida@frida.es',
    password: '1234567'
})

users.push({
    name: 'Tigre',
    email: 'tigre@tigre.es',
    password: '1234567'
})

function findUserByEmail(email){

    var foundUser

    for(var i = 0; i< users.length; i++){
        var user = users[i]

        if(user.email === email){
            foundUser= user
        break
        }
    }
    return foundUser
}
