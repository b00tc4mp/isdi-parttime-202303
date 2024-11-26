var a = function() { 
    console.log('call a')
    
    return true 
}

var b = function() { 
    console.log('call b')
    
    return false 
}

if (a() || b()) console.log('yes')
// VM4965:2 call a
// VM4965:13 yes
// undefined

var a = function() { 
    console.log('call a')
    
    return false
}

var b = function() { 
    console.log('call b')
    
    return true
}

if (a() || b()) console.log('yes')
// VM5036:2 call a
// VM5036:8 call b
// VM5036:13 yes
// undefined

var a = function() { 
    console.log('call a')
    
    return false
}

var b = function() { 
    console.log('call b')
    
    return false
}

if (a() || b()) console.log('yes')
// VM5159:2 call a
// VM5159:8 call b
// undefined