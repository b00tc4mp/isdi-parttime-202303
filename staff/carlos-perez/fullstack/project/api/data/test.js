const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { validators: { validateUrl } } = require('com')

const { Administrator, Update, Event, LyricPost, Message, UsersData, SocialNetworks } = require('./models')

function igImage(imageURL) {
    validateUrl(imageURL)

    return imageURL + '/media/?size=l'
}

mongoose.connect('mongodb://127.0.0.1:27017/amw')
    .then(() => Promise.all([Administrator.deleteMany(), Update.deleteMany(), Event.deleteMany(), LyricPost.deleteMany(), Message.deleteMany(), UsersData.deleteMany(), SocialNetworks.deleteMany()]))
    .then(() => {
        const pass = bcrypt.hashSync('12345678', 10);
        const admin = new Administrator({ name: 'Carlos Perez', email: 'a@a.com', password: pass })
        const update = new Update({ author: admin.id, title: 'Nueva web', image: igImage('https://www.instagram.com/p/CBgxy50h0tM'), text: 'Bienvenidos a la nueva web. Espero que os guste', rsstext: 'Nueva web', visibility: true })
        const update2 = new Update({ author: admin.id, title: 'Novedades....', image: igImage('https://www.instagram.com/p/CpyVShjI1ui'), text: 'Vienen novedades.......', rsstext: 'Novedades', visibility: true })
        const update3 = new Update({ author: admin.id, title: 'Tiempo', image: igImage('https://www.instagram.com/p/CJYuwImBeoK'), text: 'Cupidatat fugiat minim non esse tempor ad sint anim enim. Commodo nostrud cupidatat cupidatat tempor aliquip dolor eiusmod irure nisi Lorem occaecat aute. Cillum sint do exercitation commodo aute exercitation.', rsstext: 'Novedades', visibility: true })
        const update4 = new Update({ author: admin.id, title: 'Tiempo', image: igImage('https://www.instagram.com/p/CVLknA_obBI'), text: 'Est duis veniam eu nisi mollit laboris laboris nulla sint mollit consequat commodo cillum. Officia eiusmod reprehenderit cupidatat elit do nostrud aliqua id in proident. Nisi sunt sint labore consequat reprehenderit amet eu ea anim esse ullamco excepteur et pariatur. Cillum exercitation eiusmod nostrud amet quis eiusmod adipisicing officia reprehenderit quis velit. Elit ullamco mollit non anim fugiat qui. Aute deserunt aliquip fugiat consectetur enim minim officia laborum pariatur exercitation nostrud eu minim incididunt. Veniam ullamco officia minim eu do minim. Velit in commodo voluptate excepteur ea eiusmod nisi nisi est id. Elit qui laboris cupidatat Lorem laboris elit sit. Irure consequat voluptate eiusmod ut irure exercitation elit. Do duis magna ad exercitation consectetur officia et. Tempor labore ipsum anim elit dolore anim non officia. Proident sunt consectetur aliqua mollit officia consectetur dolor aliquip eu laboris mollit aute consectetur. Ex Lorem minim velit minim proident quis incididunt laborum cillum cillum occaecat nostrud. Ex qui adipisicing magna irure sunt. Ex duis do laboris esse adipisicing proident occaecat. Duis dolore irure labore veniam ipsum aute et excepteur elit adipisicing id culpa exercitation aliquip.', rsstext: 'Novedades', visibility: true })
        const evento = new Event({ author: admin.id, title: 'Lanzamiento nueva web', location: 'Huelva', text: '¡Estrenamos la nueva web!', links: ['https://www.youtube.com/@alex__maybe', 'https://www.twitch.tv/alex__maybe'], visibility: false })
        const evento2 = new Event({ author: admin.id, title: 'Directo en Twitch y Youtube', location: 'Huelva', text: '¡Directo de Sábado!', links: ['https://www.youtube.com/@alex__maybe', 'https://www.twitch.tv/alex__maybe'], visibility: true })
        const evento3 = new Event({ author: admin.id, title: 'Directo en TikTok', location: 'Huelva', text: '¡Directo de Sábado!', links: ['https://www.youtube.com/@alex__maybe', 'https://www.twitch.tv/alex__maybe'], visibility: true })
        const evento4 = new Event({ author: admin.id, title: 'Concierto con All Time Low', location: 'Huelva', text: '¡Directo de Sábado!', links: ['https://www.youtube.com/@alex__maybe', 'https://www.twitch.tv/alex__maybe'], visibility: true })
        const evento5 = new Event({ author: admin.id, title: 'Directo con Mati Cordaro', location: 'Huelva', text: '¡Directo de Sábado!', links: [], visibility: true })
        const song = new LyricPost({ author: admin.id, title: '1Si te tuviera delante', media: 'https://youtu.be/uQDwRdoE67k', text: 'Cantabas......', songInfo: 'Autores: Alejandro Lorenzo Botello, Julio Darío De La Rosa Asencio', visibility: true })
        const song2 = new LyricPost({ author: admin.id, title: '2Si te tuviera delante', media: 'https://youtu.be/uQDwRdoE67k', text: 'Cantabas......', songInfo: 'Autores: Alejandro Lorenzo Botello, Julio Darío De La Rosa Asencio', visibility: true })
        const song3 = new LyricPost({ author: admin.id, title: '3Si te tuviera delante', media: 'https://youtu.be/uQDwRdoE67k', text: 'Cantabas......', songInfo: 'Autores: Alejandro Lorenzo Botello, Julio Darío De La Rosa Asencio', visibility: false })
        const song4 = new LyricPost({ author: admin.id, title: 'Si te tuviera delante', media: 'https://youtu.be/uQDwRdoE67k', text: 'Cantabas \nCuando todo el mundo callaba \nTe daban igual las miradas \n\nCantabas \nCuando todo el mundo callaba \nTe daban igual las miradas \n\nEra darme la vuelta y darme cuenta \nQue eras algo más \nQue una voz que canta una canción \nAlgo más que el color que me pinta el corazón \nLa adicción de un actor al guión \nTú y yo \nSi te tuviera delante esta vez no sé dejarte \nY es que el lugar que me das ya no está \nNo sé dónde buscar mi parte \nY sé que por un beso no moriré \nAunque me arrepentiré \nSi te tuviera delante esta vez \nNo sé qué hacer', songInfo: 'Autores: Alejandro Lorenzo Botello, Julio Darío De La Rosa Asencio', visibility: true })
        const song5 = new LyricPost({ author: admin.id, title: '5Si te tuviera delante', media: 'https://youtu.be/uQDwRdoE67k', text: 'Cantabas Cuando todo el mundo callaba Te daban igual las miradas Cantabas Cuando todo el mundo callaba Te daban igual las miradas', songInfo: 'Autores: Alejandro Lorenzo Botello, Julio Darío De La Rosa Asencio', visibility: false })
        const mensaje = new Message({ author: 'Carlos Perez', email: 'a@a.com', title: 'Testing1', text: 'TESTING' })
        const mensaje2 = new Message({ author: 'Carlos Perez', email: 'b@a.com', title: 'Testing2', text: 'TESTING' })
        const mensaje3 = new Message({ author: 'Carlos Perez', email: 'c@a.com', title: 'Testing3', text: 'TESTING' })
        const mensaje4 = new Message({ author: 'Carlos Perez', email: 'd@a.com', title: 'Testing4', text: 'TESTING' })
        const mails = new UsersData({ usersMail: 'b@b.com' })
        const redes = new SocialNetworks({ name: 'TikTok', link: 'https://www.tiktok.com/@alex__maybe' })

        return Promise.all([admin.save(), 
            update.save(), update2.save(), update3.save(), update4.save(), 
            evento.save(), evento2.save(), evento3.save(), evento4.save(), evento5.save(),
            song.save(),song2.save(), song3.save(),song4.save(), song5.save(), 
            mensaje.save(),mensaje2.save(),mensaje3.save(),mensaje4.save(), mails.save(), redes.save()])
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => mongoose.disconnect())