// import { validateUrlFormat } from "./helpers/validators.js"

export const getImageFromLocal = (uploadedFile, callback) => {

        // validateUrlFormat(uploadedFile)

        const reader = new FileReader()
        const file = uploadedFile
        reader.onload = () => {
                callback(reader.result)
        } 
        reader.readAsDataURL(file)
}

