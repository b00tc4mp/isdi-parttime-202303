const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

//modelo:
const user = new Schema({
    name: {
        Type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true // te crea un índice, y si ya existía, te lo mantiene

    },
    password: {
        Type: String,
        required: true,
        trim: true,
        minLength: 6

    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true,
        default: Date.now
    }
})

//creo la clase que me permite generar instancias de este modelo:

const User = model('User', user)
const Post = model('Post', post)

//esto nos devuelve una clase, y es lo que nos permite operar con usuarios conectados
// connection y collection ya no hacen falta, mongoose lo hace automaticamente.
mongoose.connect('mongodb://127.0.0.1:27017/data')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => {
        // const user = new User({ name: 'Usuario M', email: 'usuariom@email.com', password: 'Aa-1234' })
        // return user.save()

        // de una sola vez te ahorras la variable:

        return User.create({ name: 'Usuario M', email: 'usuariom@email.com', password: 'Aa-1234' })
    })
    .then(user => {
        //mongoose, convierte los id, sin necesidad de pasarlos a string ni volverlos a pasar a ObjectId
        return Post.create({ author: user.id, image: 'http://image.com/cool', text: 'cool image' })
    })

    // .then(user => {
    //     user.name = 'Usuario Modificated'

    //     return user.save()
    // })


    .catch(error => {
        console.log(error)
    })
    .finally(() => mongoose.disconnect())
