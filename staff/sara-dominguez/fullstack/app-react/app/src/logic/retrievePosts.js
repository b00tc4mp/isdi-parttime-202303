console.debug('load retrievePost')

// import { validateId, validateCallback } from "./helpers/validators.js"
import { validators } from 'com'

const { validateId, validateCallback } = validators

export default function retrievePosts(userId, callback) {
    validateId(userId)
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        const { response: json } = xhr
        const posts = JSON.parse(json)

        callback(null, posts)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${userId}`)

    xhr.send()
}



    // findUserById(userId, user => {
    //     if (!user) {
    //         callback(new Error(`user with id ${userId} not found`))

    //         return
    //     }

    //     loadPosts(posts => {
    //         //los datos de forEach no estan modificando la base de datos porque no estoy haciendo un savePosts. Simplemente estoy llevando los datos al vuelo para renderizarlos en la capa de presentacion.
    //         loadUsers(users => {
    //             posts.forEach(post => {
    //                 post.fav = user.favs.includes(post.id)

    //                 const _user = users.find(user => user.id === post.author)

    //                 //populate == se llama llenar, covierto una variable en un array, la muto
    //                 post.author = {
    //                     id:  _user.id,
    //                     name: _user.name,
    //                     avatar: _user.avatar
    //                 }
    //             })

    //             callback(null, posts.toReversed())
    //         })
    //     })
    // })
