// import { validateUrlFormat } from "./helpers/validators.js"

export const getImageFromLocal = (uploadedFile) => {

        // validateUrlFormat(uploadedFile)

        const reader = new FileReader()
        const file = uploadedFile
        reader.onload = () => {
                    reader.result
        } 
        reader.readAsDataURL(file)
        return URL.createObjectURL(file)
}

