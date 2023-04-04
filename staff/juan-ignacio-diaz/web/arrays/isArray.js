function isArray(objet) {
    if (typeof(objet) !== 'object')  return false
    if (objet.length === undefined) return false


    return true
}

export default isArray