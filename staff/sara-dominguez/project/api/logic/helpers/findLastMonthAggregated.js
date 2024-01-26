/**
 * Find the last month's aggregated value from an array of payroll annual aggregated values.
 *
 * @param {number} payrollAnnualAggregated - An array of payroll annual aggregated values.
 * @returns {number} - The last month's aggregated value.
 */

module.exports = function findLastMonthAggregated(payrollAnnualAggregated) {
    let lastMonthAggregated = payrollAnnualAggregated[0]

    for (let i = 0; i < payrollAnnualAggregated.length; i++) {
        if (payrollAnnualAggregated[i] > lastMonthAggregated) {
            lastMonthAggregated = payrollAnnualAggregated[i]
        }
    }
    return lastMonthAggregated
}