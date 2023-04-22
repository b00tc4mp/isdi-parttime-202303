import executeTests from "./curri.spec.js"
import { objectsList, methodsList } from "./fried-green-tomato.js"


(function showTestsFeed(){
    document.querySelector('.test-feed').innerHTML = ''

    executeTests()

    console.log(objectsList)
    console.log(methodsList)

    /*TODO:
    - for que recorre els objectes, amb un for que recorre els metodes per anar fer append a diferents divs
    */
})()