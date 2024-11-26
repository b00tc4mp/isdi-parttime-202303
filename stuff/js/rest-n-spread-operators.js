function add(...nums) {
    var res = 0

    for (var i = 0; i < nums.length; i++)
        res += nums[i]

    return res
}

console.log(add(1, 2)) // 3
console.log(add(1, 2, 3)) // 6
console.log(add(1, 2, 3, 4)) // 10

var values = [10, 20, 30]

console.log(add(...values))




// VM10520:10 3
// VM10520:11 6
// VM10520:12 10
// VM10520:16 60