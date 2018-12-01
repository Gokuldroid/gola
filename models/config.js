const fs = require('fs');
const _ = require('lodash');
const glob = require('glob');

const extendHelper = require('../core/ext-helper');
const fileUtils = require('../core/file');
const Static = require('./static');
const Styles = require('./styles');

class Config {
    constructor(gola) {
        this.gola = gola;
        _.extend(this, fileUtils.readJson(fileUtils.absPath(gola, 'config.json')));
        this.static = new Static(this);
        this.styles = new Styles(this);
        this.initCollections();
    }


    getGlobals() {
        return this._globals = this._globals || _.merge({}, this.gola.getGlobals(), {
            config: this
        });
    }

    fileChange(event, file) {
        this.static.fileChange(event, file);
        this.styles.fileChange(event, file);
        this.collections.forEach(collection => {
            collection.fileChange(event, file);
        });
    }

    compile() {
        this.collections.forEach(collection => {
            collection.compile();
        });
    }
}

extendHelper.extendAll(Config.prototype, glob.sync('ext/config/**/*.js', { cwd: __dirname, absolute: true }));
module.exports = Config;