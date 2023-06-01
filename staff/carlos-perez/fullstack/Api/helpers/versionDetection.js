module.exports = function versionDetection(callback){

const shell = require('shelljs')

let version;

try{
   version = shell.exec("node --version", {async: false}).stdout;
}
catch(e)
{
    callback(e.message)
    return
}

const ver=version.split('.');

return ver[0].substring(1);
}