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
        console.log('complie scss');
        const sassOptions = {
            file: fileUtils.absPath(this.gola, '_site/static/css/main.scss'),
            sourceMapEmbed: true
        };
        let result = sass.renderSync(sassOptions);
        fileUtils.writeFile(fileUtils.absPath(this.gola, '_site/static/css/main.css'), result.css);
    }
}

module.exports = Styles