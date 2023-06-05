import createNewPost from "./createNewPost.js"

createNewPost('user-1', 'https://static.wikia.nocookie.net/criticalrole/images/c/cd/VexTLOVM.png/revision/latest?cb=20220204041409', 'Hello World Too', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('posted!')
})