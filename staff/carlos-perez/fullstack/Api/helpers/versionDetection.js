const shell = require('shelljs')

module.exports = function versionDetection(){

const version=shell.exec("node --version", {async: false}).stdout;

const ver=version.split('.');

return ver[0].substring(1);
}