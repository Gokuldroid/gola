const glob = require('glob');
const path = require('path');

const extendAll = function (objectPrototype, filesGlob) {
    filesGlob.forEach(function (file) {
        let extensionModule = require(path.resolve(file));
        Object.assign(objectPrototype, extensionModule);
    });
}


module.exports = {
    extendAll
}