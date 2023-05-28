console.log('load retrievePost')

import { validateId, validateCallback } from "./helpers/validators.js"
import { loadPosts, findUserById, loadUsers } from "../data.js"

export default function retrievePosts(userId, callback) {
    validateId(userId)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        loadPosts(posts => {
            //los datos de forEach no estan modificando la base de datos porque no estoy haciendo un savePosts. Simplemente estoy llevando los datos al vuelo para renderizarlos en la capa de presentacion.
            loadUsers(users => {
                posts.forEach(post => {
                    post.fav = user.favs.includes(post.id)

                    const _user = users.find(user => user.id === post.author)

                    //populate == se llama llenar, covierto una variable en un array, la muto
                    post.author = {
                        id:  _user.id,
                        name: _user.name,
                        avatar: _user.avatar
                    }
                })

                callback(null, posts.toReversed())
            })
        })
    })
}