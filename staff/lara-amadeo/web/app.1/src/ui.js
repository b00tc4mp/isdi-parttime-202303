

export const context = sessionStorage

export const DEFAULT_AVATAR_URL = 'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='

// let toastContainer
export const successToast = '#4CAF50'
export const errorToast = '#F44336'

// function initToast(){
//     document.body.insertAdjacentHTML('afterbegin', `<div className="toast-container"></div>`)

//     toastContainer = document.querySelector('.toast-container')
// }
// initToast()

export function generateToast({
    message, 
    type = '#8F8F8F',
    length = '3000ms'
}){
    let toastContainer = document.body.querySelector('.toast-container')
    toastContainer.insertAdjacentHTML('beforeend', `<p class="toast" style="background-color: ${type}; animation-duration: ${length}"> ${message}</p>`)

    const toast = toastContainer.lastElementChild
    toast.addEventListener('animationend', () => toast.remove())
}