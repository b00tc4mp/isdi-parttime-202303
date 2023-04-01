const file = userAccount.querySelector('form.user-info input[name="file"]')
const img = userAccount.querySelector('form.user-info .image-profile')
const avatarHeader = menuHeader.querySelector('.avatar img.image-profile')

file.onchange = function (event) {
    const file = event.target.files[0]
    const image = new FileReader()
    image.onload = () => {
        const base64 = image.result
        img.src = base64
        avatarHeader.src = base64
    }
    image.readAsDataURL(file)

}