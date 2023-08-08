const mongoose = require('mongoose')

const {Administrator, Update, Event, LyricPost, Message, UsersData, SocialNetworks} = require('./models')



mongoose.connect('mongodb://127.0.0.1:27017/amw')
    .then(() => Promise.all([Administrator.deleteMany(), Update.deleteMany(), Event.deleteMany(), LyricPost.deleteMany(), Message.deleteMany(), UsersData.deleteMany(), SocialNetworks.deleteMany()]))
    .then(() => {
        const admin = new Administrator({name: 'Carlos Perez', email: 'a@a.com', password: '12345678'})
        const update = new Update({ author: admin.id, title: 'Nueva web', image: '', text: 'Bienvenidos a la nueva web. Espero que os guste', rsstext: 'Nueva web', visibility: true})
        const evento = new Event({author: admin.id, title: 'Lanzamiento nueva web', location: 'Huelva', text: '¡Estrenamos la nueva web!', links: ['link1', 'link2'], visibility: true})
        const song = new LyricPost({author: admin.id, title: 'Si te tuviera delante', media: 'https://youtu.be/uQDwRdoE67k', text: 'Cantabas......', songInfo:'Autores: Alejandro Lorenzo Botello, Julio Darío De La Rosa Asencio', visibility: false})
        const mensaje = new Message({author: 'Carlos Perez', email: 'a@a.com', title: 'Testing', text: 'TESTING'})
        const mails = new UsersData({usersMail: 'b@b.com'})
        const redes = new SocialNetworks({name: 'TikTok', link: 'https://www.tiktok.com/@alex__maybe'})

        return Promise.all([admin.save(), update.save(), evento.save(), song.save(), mensaje.save(), mails.save(), redes.save()])
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => mongoose.disconnect())