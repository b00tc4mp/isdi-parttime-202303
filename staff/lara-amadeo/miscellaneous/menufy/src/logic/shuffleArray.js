

export function shuffleArray(array) {

  let newArray = []
  if (array.length < 14) {
    for (let i = 0; i < 14; i++) {
      if (i < array.length) {
        newArray[i] = array[i]
      } else { newArray[i] = array[(Math.floor(Math.random() * array.length))] }
    }

    const result = randomizeArray(newArray)
    return result
  } else {
    randomizeArray(array)

    return array
  }
}

function randomizeArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}