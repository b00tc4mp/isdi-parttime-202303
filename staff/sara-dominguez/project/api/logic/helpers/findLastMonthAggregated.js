module.exports = function findLastMonthAggregated(payrollAnnualAggregated) {
    let lastMonthAggregated = payrollAnnualAggregated[0]

    for (let i = 0; i < payrollAnnualAggregated.length; i++) {
        if (payrollAnnualAggregated[i] > lastMonthAggregated) {
            lastMonthAggregated = payrollAnnualAggregated[i]
        }
    }
    return lastMonthAggregated
}