const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const relPath = function (gola, file) {
    return gola.rootPath + `/${file}`
}

const readJson = function (file) {
    return JSON.parse(readFile(file))
}

const readFile = function (file) {
    return fs.readFileSync(file).toString()
}

const writeFile = function (file, content) {
    mkdir(file);
    return fs.writeFileSync(file, content);
}

const mkdir = function(file){
    let dir = path.dirname(file);
    !fs.existsSync(dir) && mkdirp.sync()
}
module.exports = {
    relPath,
    readJson,
    readFile,
    writeFile,
}