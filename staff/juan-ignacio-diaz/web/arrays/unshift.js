export default function unshift(array, ...elements){
    for(let i = 0; i < array.length; i++)
        elements[elements.length] = array[i]

    for(let i = 0; i < elements.length; i++)
        array[i] = elements[i]

    return array.length
}