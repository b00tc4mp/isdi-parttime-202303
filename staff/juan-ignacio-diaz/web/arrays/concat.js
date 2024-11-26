export default function concat(array1, array2) {
    let newArray = new Array()
    for (const element of array1)
        newArray[newArray.length] = element
    for (const element of array2)
        newArray[newArray.length] = element

    return newArray
}