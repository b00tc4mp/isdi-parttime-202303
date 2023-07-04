var a = function() { 
    console.log('call a')
    
    return false
}

var b = function() { 
    console.log('call b')
    
    return false
}

if (a() && b()) console.log('yes')
// VM5298:2 call a
// undefined

var a = function() { 
    console.log('call a')
    
    return true
}

var b = function() { 
    console.log('call b')
    
    return false
}

if (a() && b()) console.log('yes')
// VM5371:2 call a
// VM5371:8 call b
// undefined

var a = function() { 
    console.log('call a')
    
    return true
}

var b = function() { 
    console.log('call b')
    
    return true
}

if (a() && b()) console.log('yes')
// VM5414:2 call a
// VM5414:8 call b
// VM5414:13 yes
// undefined