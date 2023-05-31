export default function retrieveSavedCalendar(){
    const meals = JSON.parse(localStorage.currentCalendar)

    return meals
}