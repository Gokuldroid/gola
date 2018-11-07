const glob = require('glob');
const fileUtils = require('../core/file');

class Static {
    constructor(config) {
        this.config = config;
        this.gola = config.gola;
        this.filesPattern = /^(?!(collections|layouts|partials|config\.json)).+/g;
        this._globOptions = { cwd: this.gola.rootPath, absolute: true };
    }

    fileChange(event, file) {
        if (fileUtils.relPath(this.gola, file).match(this.filesPattern)) {
            this.copyStaicFile(file);
            return true;
        }
        return false;
    }

    compile() {
        glob.sync(this.filesPattern, this._globOptions).forEach((path) => {
            this.copyStaicFile(path);
        });
    }

    copyStaicFile(file) {
        let destionationPath = fileUtils.absPath(this.gola, '_site/' + fileUtils.relPath(this.gola, file));
        fileUtils.copyFile(file, destionationPath);
    }
}

module.exports = Static;