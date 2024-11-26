function unshift(array, ...nums) {
    
    const numsArray = []
    for(i = 0; i < nums.length; i++) {
        numsArray[numsArray.length] = nums[i]
    }
    for(i = 1; i < array.length; i++) {
        array[i - 1] = array[i]
    } 
    array.length--
    for(i = 0; i < array.length; i++) {
        numsArray[numsArray.length] = array[i]
    }
    return numsArray 
}