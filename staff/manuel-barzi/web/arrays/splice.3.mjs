export default function splice(array, start, deleteCount, item1) {
    if (deleteCount === 0)  {
        for (let i = array.length - 1; i >= start; i--) {
            const element = array[i]
    
            array[i + 1] = element
        }
    
        array[start] = item1
    
        return []
    } else if (deleteCount === 1) {
        const extracted = array[start]

        array[start] = item1

        return [extracted]
    } else if (deleteCount === 2) {
        // TODO steps
        // - extract elements to be deleted into returning array
        // - move elements backwards 1 position from start + deleteCount
        // - shorten array 1 position
        // - replace start position with the item

        const extracted = []

        for (let i = start; i < start + deleteCount; i++) {
            const elem = array[i]

            extracted[extracted.length] = elem
        }

        for (let i = start + deleteCount; i < array.length; i++) {
            const elem = array[i]
            
            array[i - 1]  = elem
        }

        array.length--

        array[start] = item1

        return extracted
    } else if (deleteCount === 3) {
        const extracted = []

        for (let i = start; i < start + deleteCount; i++) {
            const elem = array[i]

            extracted[extracted.length] = elem
        }

        for (let i = start + deleteCount; i < array.length; i++) {
            const elem = array[i]
            
            array[i - (deleteCount - 1)]  = elem
        }

        // array.length = array.length - (deleteCount - 1)
        array.length -= (deleteCount - 1)

        array[start] = item1

        return extracted
    }
}