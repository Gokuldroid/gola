const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const absPath = function (gola, file) {
    return gola.rootPath + `/${file}`
}

const relPath = function (gola, file) {
    return file.replace(`${gola.rootPath}/`, '');
}

const readJson = function (file) {
    return JSON.parse(readFile(file))
}

const readFile = function (file) {
    return fs.readFileSync(file).toString()
}

const copyFile = function (sourcePath, destPath) {
    if (fs.statSync(sourcePath).isFile()) {
        mkdir(destPath);
        fs.copyFileSync(sourcePath, destPath);
    }
}

const writeFile = function (file, content) {
    mkdir(file);
    return fs.writeFileSync(file, content);
}

const mkdir = function (file) {
    let dir = path.dirname(file);
    !fs.existsSync(dir) && mkdirp.sync(dir)
}
module.exports = {
    absPath,
    relPath,
    readJson,
    readFile,
    copyFile,
    writeFile,
}