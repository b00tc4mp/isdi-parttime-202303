export default function join(array, separator) {
    if (separator === undefined) separator = ','
    const arrayJoin = array[0]

    for (let i = 1; i < array.length; i++)
        arrayJoin += separator+array[i]

    return arrayJoin
}