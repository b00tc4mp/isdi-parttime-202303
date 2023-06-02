const http = require('http')

module.exports = function retrieveRandomMotivationalQuote(callBack) {
  

  fetch('https://api.quotable.io/random')
    .then(response => {
      if(!response.ok) {
        callBack(new Error('Connection error.'))

        return
      }
      
      return response.json()
    })

    .then(data => {
      callBack(null, data.content)
    })

    .catch(error => {
      callBack(error)
    })

    
  // http.get('https://api.quotable.io/random', (res) => {
  //   let data = '';

  //   res.on('data', (chunk) => {
  //     data += chunk
  //   })

  //   res.on('end', () => {
  //     callBack(null, data)
  //   })
    
  // }).on('error', (error) => {
  //   callBack(error)
  // })
}