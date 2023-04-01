function join(newString, joinWith , elements) {
    const newString = []
    for(let i = 0; i < elements.length; i++) {
        const element = elements[i];
        newString[newString.length] = `${element[i]}${joinWith}`
    }
    return newString
}

