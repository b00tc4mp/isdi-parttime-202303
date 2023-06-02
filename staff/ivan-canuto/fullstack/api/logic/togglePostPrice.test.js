const { setPostPrice, unsetPostPrice } = require('./togglePostPrice')

setPostPrice('post-1', '900', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Post price setted.')
})

// unsetPostPrice('post-1', (error) => {
//   if(error) {
//     console.error(error)

//     return
//   }

//   console.log('Post removed from sale.')
// })