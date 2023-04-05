// demo 1

// logic

function wtf() {
    var error = new Error('memory error', { cause: 'stack overflow' })
    error.code = 'E0001'
    throw error
}

// presentation

var lang = 'ca'

var i18n = {
    E0001: {
        es: 'error de memoria',
        ca: 'error de memòria',
        en: 'memory error'
    },
    E0002: {
        es: 'error de disco',
        ca: 'error de disc',
        en: 'disk error'
    }
}

try {
    wtf()
} catch (error) {
    var { code } = error

    var message = i18n[code][lang]

    console.log(message)
}

// VM1619:33 error de memòria

// demo 2

undefined
// logic

function wtf() {
    var error = new Error('disk error', { cause: 'stack overflow' })
    error.code = 'E0002'
    throw error
}

// presentation

var lang = 'es'

var i18n = {
    E0001: {
        es: 'error de memoria',
        ca: 'error de memòria',
        en: 'memory error'
    },
    E0002: {
        es: 'error de disco',
        ca: 'error de disc',
        en: 'disk error'
    }
}

try {
    wtf()
} catch (error) {
    var { code } = error

    var message = i18n[code][lang]

    console.log(message)
}

// VM1793:33 error de disco
// undefined