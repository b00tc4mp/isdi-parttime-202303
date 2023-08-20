function box(secret, password) {
    let __secret__ = secret
    let __password__ = password

    return {
         open(password) {
             if (password === __password__) return __secret__

             throw new Error('wrong password')
         },
         updatePassword(password, newPassword, newPasswordConfirm) {
             if (password !== __password__) throw new Error('wrong password')

             if (newPassword !== newPasswordConfirm) throw new Error('new password and its confirmation do not match')

             if (newPassword === password) throw new Error('new password is equal to current password')

             __password__ = newPassword
         }
    }
}

const b = box('me asustan las lagartijas', '123123123')
const c = box('css sometimes scares me like 666', '123123123') 

console.log(b.open('123123123'))
console.log(c.open('123123123'))