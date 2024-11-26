const html = document.documentElement
const canvas = document.querySelector('canvas.my-canvas')
const context = canvas.getContext('2d')


const frameCount = 100

const currentFrame = index => (
    `img/img-${index.toString().padStart(3, '0')}.png`
)

const preloadImages = () => {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        img.src = currentFrame(i)
    }
}

const img = new Image()
img.src = currentFrame(1)
canvas.width=1500;
canvas.height=1500;

img.onload = function() {
    context.drawImage(img, 0, 0)
}

const updateImage = index => {
    img.src = currentFrame(index)
    context.drawImage(img, 0, 0)
}

window.onscroll = function() {
    const scrollTop = html.scrollTop
    const maxScrollTop = html.scrollHeight - window.innerHeight
    const scrollFraction = scrollTop / maxScrollTop
    const frameIndex = Math.min(
        frameCount -1,
        Math.floor(scrollFraction * frameCount)
    )
    requestAnimationFrame(() => updateImage(frameIndex + 1))
}

preloadImages()

// window.onscroll = function() {
//     canvas.classList.add('visible')
// }
// const checkCanvasIsVisible = (element) => {
//     const rect = element.getBoundingClientRect()
//     const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
//     return !(rect.bottom < 0 || rect.top >= 0)
// }
