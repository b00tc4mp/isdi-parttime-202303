function block(millis) {
    console.log('block start', new Date)
    
    var before = Date.now()

    while(Date.now() - before < millis);

    console.log('block end', new Date)
}

// BEFORE

// data

var payments = []

// business

function pay1(userId, orderId) {
    var paymentId = Date.now()
    
    payments.push({ paymentId, userId, orderId })

    return paymentId
}

// presentation

console.log('BEFORE')
console.log(pay1('user-1', 'order-123'))
block(1000)
console.log('...')
    
// AFTER

// data

var payments = []

// business

function pay2(userId, orderId, callback) {
    setTimeout(() => {
        var paymentId = Date.now()
        
        payments.push({ paymentId, userId, orderId })
    
        callback(paymentId)
    }, 0)
}

// presentation

console.log('AFTER')
pay2('user-1', 'order-123', paymentId => console.log(paymentId))
block(1000)
console.log('...')

// VM3638:29 BEFORE
// VM3638:30 1684348076657
// VM3638:2 block start Wed May 17 2023 20:27:56 GMT+0200 (Central European Summer Time)
// VM3638:8 block end Wed May 17 2023 20:27:57 GMT+0200 (Central European Summer Time)
// VM3638:32 ...
// VM3638:54 AFTER
// VM3638:2 block start Wed May 17 2023 20:27:57 GMT+0200 (Central European Summer Time)
// VM3638:8 block end Wed May 17 2023 20:27:58 GMT+0200 (Central European Summer Time)
// VM3638:57 ...
// undefined
// VM3638:55 1684348078658