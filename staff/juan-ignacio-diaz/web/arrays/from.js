export default function from(...objects){
    const items = objects[0]
    let newArray = new Array()
    if (typeof(items) === 'string')  
        for (let i =0 ; i < items.length; i++)
            newArray[newArray.length] = items.charAt(i)

    else if (typeof(objects[1]) === 'function' && typeof(items) === 'object' && items.length !== undefined)
        for (let i =0 ; i < items.length; i++)
            newArray[newArray.length] = objects[1](items[i])
            
    return newArray
}