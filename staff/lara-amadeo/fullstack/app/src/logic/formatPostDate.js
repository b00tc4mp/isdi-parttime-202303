/**
 * Formats the date so that it has a user friendly structure
 * @param {date} postDate a date you want to format
 * @returns {string} A date formatted by day, month and year o hours ago
 */

export default function formatPostDate(postDate){

    const currentDate = new Date()
    const currentDateDay = currentDate.getDate()
    const currentDateMonth = currentDate.toLocaleString('default', {month: 'long'})
    const day =  postDate.getDate()
    const currentHour = currentDate.getHours()

   const month = postDate.toLocaleString('default', {month: 'long'})
   const year = postDate.getFullYear()
   const hour = postDate.getHours()

   if(currentDateDay === day && currentDateMonth === month){
        const hoursAgo = currentHour - hour
        if(hoursAgo === 0) return `less than an hour ago`
        else return `${hoursAgo}h ago`
   } else {
    return `${day} ${month} ${year}`
   }
}