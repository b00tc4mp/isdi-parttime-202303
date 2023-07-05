require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { helloApiController, registerUserController, retrieveUserController, authenticateUserController, updateUserImageController, updateUserNameController, updateUserEmailController, updateUserPasswordController, createPostController, editPostController, deletePostController, retrievePostsController, retrieveLikedPostsController, retrieveSavedPostsController, retrievePostByPostIdController, toggleLikePostController, toggleSavePostController } = require('./controllers')
const { MongoClient } = require('mongodb')
const context = require('./logic/context')
const ImageKit = require('imagekit');


const client = new MongoClient(process.env.MONGODB_URL)

const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/mklhds/',
    publicKey: 'public_KXJOz0g5Xp6gAlhANXjoCNjKLPs=',
    privateKey: 'private_PZ61mBGO1+6tP+Wny4KqsZ7XT0Q='
});

client.connect()
    .then(connection => {
        const users = connection.db().collection('users')
        const posts = connection.db().collection('posts')

        context.users = users
        context.posts = posts

        const jsonBodyParser = bodyParser.json()
        const api = express()

        api.use(cors())

        api.post('/', helloApiController)
        api.post('/users', jsonBodyParser, registerUserController)
        api.get('/users', retrieveUserController)
        api.post('/users/auth', jsonBodyParser, authenticateUserController)

        api.patch('/users/image', jsonBodyParser, updateUserImageController)
        api.patch('/users/username', jsonBodyParser, updateUserNameController)
        api.patch('/users/email', jsonBodyParser, updateUserEmailController)
        api.patch('/users/password', jsonBodyParser, updateUserPasswordController)

        api.post(`/posts`, jsonBodyParser, createPostController)
        api.patch(`/posts/update/:postId`, jsonBodyParser, editPostController)
        api.delete(`/posts/:postId`, deletePostController)
        api.get('/posts', retrievePostsController)
        api.get('/posts/liked', retrieveLikedPostsController)
        api.get('/posts/saved', retrieveSavedPostsController)
        api.get('/posts/:postId', retrievePostByPostIdController)
        api.patch('/posts/:postId/likes', toggleLikePostController)
        api.patch('/posts/:postId/saves', toggleSavePostController)

        api.get('/auth', function (req, res) {
            var result = imagekit.getAuthenticationParameters();
            res.send(result);
        });

        // debugger
        // api.get('/image/:image', (req, res) => {
        //     debugger
        //     const { image } = req.params
        //     console.log(image)
        //     imagekit.getFileDetails(image, function (error, result) {
        //         if (error) console.log(error);
        //         else {
        //             console.log(result)
        //             imagePath = result
        //             res.send(result);
        //         }
        //     });

        // });


        api.listen(`${process.env.PORT}`, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)