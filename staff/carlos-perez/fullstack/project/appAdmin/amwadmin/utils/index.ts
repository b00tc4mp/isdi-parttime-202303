import context from "./context"

function extractPayloadFromToken(token: string) {
  return JSON.parse(atob(token.split('.')[1]))
}

export function isTokenAlive(token: string) {
  const { iat, exp } = extractPayloadFromToken(token)
  const now = Date.now() / 1000

  return exp - iat > now - iat
}

export function returnToken(){
  return context.token;
}

export async function login(email: string, password: string){
  const res = await fetch('http://localhost:4321/admins/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })

  if (res.status === 200) {
    const token = await res.json()

    context.token = token

    return
  }
  else{
    const message = await res.json()
    alert(message);
  }

  

}

export async function fetchUpdates() {
  const res = await fetch(`${process.env.API_BASE_URL}updates`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export async function fetchUpdate(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}updates/${id}`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function fetchSongs() {
  const res = await fetch(`${process.env.API_BASE_URL}lyricPosts/`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function fetchSong(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}lyricPosts/${id}`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export function youTubeGetID(url: any) {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

export function youtubeGetThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export async function fetchEvents() {
  const res = await fetch(`${process.env.API_BASE_URL}events/`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function fetchEvent(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}events/${id}`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function postMessage(name: string, title: string, email: string, message: string) {
  const res = await fetch('http://localhost:4321/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      author: name,
      email: email,
      title: title,
      text: message,
      status: false
    })
  })

  if (res.status === 201) {
    alert('Message sent')
  }
  else{
    alert('Something went wrong. Please, try again');
  }
}

export async function postUpdate(title: string, image: string, text: string) {
  const res = await fetch('http://localhost:4321/updates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${context.token}`
    },
    body: JSON.stringify({
      title: title,
      image: image + '/media/?size=l',
      text: text,
      rsstext: text,
      visibility: true
    })
  })

  if (res.status === 201) {
    alert('Update sent')
  }
  else{
    alert('Something went wrong. Please, try again');
  }
}

export async function patchUpdate(id: string, title: string, image: string, text: string) {
  const url='http://localhost:4321/updates'+id
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${context.token}`
    },
    body: JSON.stringify({
      title: title,
      image: image + '/media/?size=l',
      text: text,
      rsstext: text,
      visibility: true
    })
  })

  if (res.status === 201) {
    alert('Update updated')
  }
  else{
    alert('Something went wrong. Please, try again');
  }
}

export async function deleteUpdate(id: string) {
  const url='http://localhost:4321/updates/'+id
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${context.token}`
    }
  })

  if (res.status === 202) {
    alert('Update deleted')
  }
  else{
    alert('Something went wrong. Please, try again');
  }
}
