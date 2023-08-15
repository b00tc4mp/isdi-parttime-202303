export default function calculateTotalAmount(totalAmount) {
    let sum = 0

    for (let i = 0; i < totalAmount.length; i++) {
        sum += totalAmount[i]
    }
    console.log(sum)
    return sum
}