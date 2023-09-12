import mongoose from 'mongoose'
import { User, Project, Track } from '../data/models'
import dotenv from 'dotenv'
import addMember from './addMember'

dotenv.config()
;
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data-test-project')
        await Promise.all([User.deleteMany(), Project.deleteMany(), Track.deleteMany()])
        const user = await User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123' })
        const project = await Project.create({name: 'example', owners: [user.id]})
        const user2 = await User.create({ name: 'wendy.darling', email: 'wendy@darling.com', password: '123123123'})
        await addMember(user.id, project.id, user2.email)
        const _project = await Project.findById(project.id)
        console.log(_project.owners)
    } catch(error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()