export function changePassword(oldpass, newpass, passcheck) {
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      const { status } = xhr
  
      if (status !== 204) {
        const { response: json } = xhr
        const { error } = JSON.parse(json)
  
        callback(new Error(error))
  
        return
      }
  
      callback(null)
    }
  
    xhr.onerror = () => {
      callback(new Error('Connection error'))
    }
  
    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/password`)
  
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
  
    const data = { oldpass, newpass, passcheck }
    const json = JSON.stringify(data)
  
    xhr.send(json)
}

export function changeMail(oldmail, newmail, mailcheck) {
    //ToDo
}