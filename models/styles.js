const _ = require('lodash');
const sass = require('node-sass');

const fileUtils = require('../core/file');

class Styles {
    constructor(config) {
        this.config = config;
        this.gola = config.gola;
        this.compileSass = _.debounce(this._compileSass, 2000, { 'maxWait': 5000 })
    }

    fileChange(event, file) {
        if (fileUtils.relPath(this.gola, file).match(/^(static\/css).+(\.scss)/g)) {
            this.compileSass();
        }
    }

    _compileSass() {
        console.log('compiling scss');
        fileUtils.compileSass(fileUtils.absPath(this.gola, '_site/static/css/main.scss'),fileUtils.absPath(this.gola, '_site/static/css/main.css'));
    }
}

module.exports = Styles