import  filter  from "./filter.mjs";

const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"]


console.log(filter(words, (word) => word.length > 6))