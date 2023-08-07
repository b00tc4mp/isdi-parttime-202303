import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Pop } from '../../../data/models'
import registerUser from './registerUser'

dotenv.config()
;(async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`
    )

    await Promise.all([User.deleteMany(), Pop.deleteMany()])

    await registerUser({
      name: 'Peter Pan',
      email: 'peter@pan.com',
      password: '123123123',
      repeatPassword: '123123123',
    })

    const user = await User.findOne({ email: 'peter@pan.com' })

    console.log(user)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.disconnect()
  }
})()
