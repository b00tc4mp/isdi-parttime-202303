import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import retrieveCategory from './retrieveCategory'

dotenv.config()
;(async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`
    )

    await Promise.all([
      User.deleteMany(),
      Category.deleteMany(),
      Pop.deleteMany(),
    ])

    await Category.create({
      name: 'Disney',
      slug: 'disney',
      imageList: '/categories/Disney.svg',
      imageDetail: '/categories/Header-Disney.svg',
    })

    await Category.create({
      name: 'Anime',
      slug: 'anime',
      imageList: '/categories/Anime.svg',
      imageDetail: '/categories/Header-Anime.svg',
    })

    const category = await Category.findOne({ slug: 'disney' })

    const _category = await retrieveCategory({ slug: category.slug })

    console.log(_category)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.disconnect()
  }
})()