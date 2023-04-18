const box = (() => {
    let __secret__
    let __password__
    
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
         },
         save(password, secret) {
             if (password !== __password__) throw new Error('wrong password')

             __secret__ = secret
         }
    }
})()

box.save(undefined, 'hola mundo')
// undefined
box.open()
// 'hola mundo'
box.updatePassword(undefined, '123123123', '123123123')
// undefined
box.open()
// VM7513:9 Uncaught Error: wrong password
//     at Object.open (<anonymous>:9:20)
//     at <anonymous>:1:5
// open @ VM7513:9
// (anonymous) @ VM7689:1
box.open('123123123')
// 'hola mundo'