module.exports = function versionDetection(){

const shell = require('shelljs')

const version=shell.exec("node --version", {async: false}).stdout;

const ver=version.split('.');

return ver[0].substring(1);
}