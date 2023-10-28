export default function retrievePosts(userId, postId, callback) {
   
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      const { status } = xhr
  
      if (status !== 200) {
        const { response: json } = xhr
        const { error } = JSON.parse(json)
  
        callback(new Error(error))
  
        return
      }
  
      const { response: json } = xhr
      const post = JSON.parse(json)
  
      callback(null, post)
    }
  
    xhr.onerror = () => {
      callback(new Error('Connection error'))
    }
  
    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/${postId}`)
  
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
  
    xhr.send()
}