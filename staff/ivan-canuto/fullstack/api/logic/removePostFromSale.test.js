const removePostFromSale = require('./removePostFromSale')

removePostFromSale('post-1', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Post removed from sale.')
})