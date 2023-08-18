/**
 * Get the name of a month from its corresponding month number.
 *
 * @param {number} monthNumber - The month number (1 to 12) for which to retrieve the name.
 * @returns {string} - The name of the month corresponding to the provided month number.
 */

module.exports = function getMonthNameFromMonthNumber(monthNumber) {
    if (typeof monthNumber !== "number" || monthNumber < 1 || monthNumber > 12) {
        throw new Error("Invalid month value")
    }
    const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    return monthName[monthNumber - 1]
}
