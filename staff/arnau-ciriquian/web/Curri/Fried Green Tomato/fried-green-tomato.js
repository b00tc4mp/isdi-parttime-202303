const version = '1.0.0'
const testVersion = document.createElement('p')
testVersion.innerText = `v: ${version}`
const testTittle = document.querySelector('.test-tittle')
testTittle.append(testVersion)
const testFeed = document.querySelector('.test-feed')

let lastItem
let objectContainer
let methodContainer


export function describe (description, callback) {
    
    if (!lastItem) {
        lastItem = 'describe'
        
        objectContainer = document.createElement('article')
        objectContainer.classList.add('test-feed__object')
        
        const objectName = document.createElement('h1')
        objectName.innerText = description
        
        objectContainer.append(objectName)
        testFeed.append(objectContainer)
    } else if (lastItem === 'describe' || lastItem === 'it') {
        lastItem = 'describe'
        
        methodContainer = document.createElement('article')
        methodContainer.classList.add('test-feed__method')

        const methodName = document.createElement('h2')
        methodName.innerText = description

        methodContainer.append(methodName)
        objectContainer.append(methodContainer)
    }

    callback()
}

export function it (description, callback) {
    const itContainer = document.createElement('article')
    itContainer.classList.add('test-feed__it')
                
    const itName = document.createElement('h3')
    itName.innerText = description

    itContainer.append(itName)

    try {
        lastItem = 'it'

        callback()
    } catch(error) {
        const itError = document.createElement('h5')
        itError.innerText = error.stack

        itContainer.append(itError)

        itError.classList.add('error')
        itName.classList.add('error')
    }

    methodContainer.append(itContainer)
}

export function expect (value) {
    return {
        toBe(expectedValue) {
            if (value !== expectedValue) throw new Error(`Expected ${value} to be ${expectedValue}`)
        }, 

        toBeInstanceOf(expectedValue) {
            if (!(value instanceof expectedValue)) throw new Error(`Expected instance of ${value.constructor.name} to be an instance of ${expectedValue.name}`)
        }
    }
}

/*export function renderTests() {
    testFeed.innerHTML = ''

    objectsList.forEach(object => {
        const objectContainer = document.createElement('article')
        objectContainer.classList.add('test-feed__object')

        const objectName = document.createElement('h1')
        objectName.innerText = object

        objectContainer.append(objectName)

        methodsList.forEach(method => {
            const methodContainer = document.createElement('article')
            methodContainer.classList.add('test-feed__method')

            const methodName = document.createElement('h2')
            methodName.innerText = method

            methodContainer.append(methodName)
            
            itsList.forEach(it => {

                const itContainer = document.createElement('article')
                itContainer.classList.add('test-feed__it')
                
                const itName = document.createElement('h3')
                itName.innerText = it[0]

                itContainer.append(itName)

                if (it[1] === 'red' && it[2]) {
                    const itError = document.createElement('h5')
                    itError.innerText = it[2]

                    itContainer.append(itError)

                    itError.classList.add('error')
                    itName.classList.add('error')
                }
    

                //expect
                console.log(itsList)
                methodContainer.append(itContainer)
            })

            console.log(methodsList)
            objectContainer.append(methodContainer)
        })

        testFeed.appendChild(objectContainer)
    })
}*/