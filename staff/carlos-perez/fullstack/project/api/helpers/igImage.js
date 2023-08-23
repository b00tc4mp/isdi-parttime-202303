const {validators: { validateUrl }} = require('com')

module.exports = function igImage(imageURL){
    validateUrl(imageURL)

    return imageURL+'/media/?size=l'
}