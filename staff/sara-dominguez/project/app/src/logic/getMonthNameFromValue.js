export default function getMonthNameFromMonthNumber(monthNumber) {
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
    ];

    return monthName[monthNumber - 1];
}
