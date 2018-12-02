const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const fm = require('front-matter');
const md5 = require('md5');
const sass = require('node-sass');
const showdown = require('showdown');
const showdownHighlight = require("showdown-highlight")
const converter = new showdown.Converter({extensions: [showdownHighlight]});

converter.setOption('tables', true);
converter.setOption('ghCodeBlocks', true);
converter.setOption('parseImgDimensions', true);
converter.setFlavor('github');


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

const mdToHtml = function (file) {
    let fileContent = readFile(file);
    let markdownContent = fm(fileContent);
    let md5sum = md5(fileContent);
    markdownContent.md5sum = md5sum;
    markdownContent.html = converter.makeHtml(markdownContent.body);
    return markdownContent;
}

const compileScss = function(src, dest){
    let result = sass.renderSync({
        file: src,
        sourceMapEmbed: true
    });
    writeFile(dest, result.css);
}


module.exports = {
    absPath,
    relPath,
    readJson,
    readFile,
    copyFile,
    writeFile,
    mdToHtml
}