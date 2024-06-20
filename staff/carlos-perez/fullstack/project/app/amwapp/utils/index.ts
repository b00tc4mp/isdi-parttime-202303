

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
