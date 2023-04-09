export function show(...containers){
    for (const container of containers)
    container.classList.remove('off')
}

export function hide(...containers){
    for  (const container of containers)
    container.classList.add('off')
}
export function toggle(...containers){
    for (const container of containers)
    container.classList.toggle('off')
}

export const context = {
    userId: null,
    userName: null,
    userAvatar: null
}

export const DEFAULT_AVATAR_URL = 'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='