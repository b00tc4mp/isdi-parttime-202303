//TODO validators
// import { validators} from 'com'
// const { validateEmployeeNumber, validateEmployeePassword } = validators

/**
* Calculate total amount of net salary payrolls month to be paid
* 
* @param {number} totalAmount  Array of net salary value of payrolls month to be paid
*
* @returns {Promise}  Sum of element of array TotalAmount
*
// * @throws {TypeError} On  //TODO validators
 */

export default function calculateTotalAmount(totalAmount) {

    let sum = 0

    for (let i = 0; i < totalAmount.length; i++) {
        sum += totalAmount[i]
    }
    return sum
}