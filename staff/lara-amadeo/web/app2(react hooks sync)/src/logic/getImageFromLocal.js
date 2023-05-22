// import { validateUrlFormat } from "./helpers/validators.js"

/**
 * Transforms the url into a base64 image
 * @param {url} uploadedFile the url given by the file selector
 * @param {function} callback used for inserting the url in the database
 */

export const getImageFromLocal = (uploadedFile, callback) => {

        // validateUrlFormat(uploadedFile)

        const reader = new FileReader()
        const file = uploadedFile
        reader.onload = () => {
                callback(reader.result)
        } 
        reader.readAsDataURL(file)
}

