export const file = document.querySelector('.section.user-account').querySelector('form.user-info input[name="file"]')
export const img = document.querySelector('.section.user-account').querySelector('form.user-info .image-profile')
export const avatarHeader = document.querySelector('header .menu').querySelector('.avatar img.image-profile')

export const printImage = file.onchange = function (event) {
    debugger
    const file = event.target.files[0]
    const image = new FileReader()
    image.onload = () => {
        const base64 = image.result
        img.src = base64
        avatarHeader.src = base64
    }
    image.readAsDataURL(file)

}



export function imageToBase64(fileSelector, fileTarget) {

    const file = fileSelector
    
    const printImage = file.onchange = function (event) {
        const file = event.target.files[0]
        const image = new FileReader()
        image.onload = () => {
            const base64 = image.result
            fileTarget = base64
        }
         image.readAsDataURL(file)
         return fileTarget
    
    }

}

