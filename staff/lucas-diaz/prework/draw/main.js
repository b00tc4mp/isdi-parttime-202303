

const karaokeSign = document.querySelector(".karaoke");
const windows1 = [...document.querySelectorAll(".top-window2")];
const windows2 = [...document.querySelectorAll(".bottom-window2")];
const neon = document.querySelector(".neon")



const setEvents = (windows1, windows2) => {
    karaokeSign.addEventListener("click", () => {
        windows1.forEach((window) => {
            window.classList.toggle("neon");
        })
        windows2.forEach((window) => {
            window.classList.toggle("neon");
        })
    })
}





setEvents(windows1, windows2);