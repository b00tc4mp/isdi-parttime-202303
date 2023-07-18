// NOTE run this code in https://http.cat/ page

/*
fetch('https://http.cat/100.jpg')
    .then(res => res.text())
    .then(console.log)
*/

(async () => {
    const res = await fetch('https://http.cat/100.jpg')

    console.log(await res.text())
})()