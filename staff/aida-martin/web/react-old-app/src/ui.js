export const openModal = () => {
  document.body.classList.add('scroll-lock')
}
export const hideModal = () => {
  document.body.classList.remove('scroll-lock')
}

export const context = sessionStorage
