const _ = require('lodash');
const glob = require('glob');

const fileUtils = require('../core/file');
const extendHelper = require('../core/ext-helper');

class Collection {
    constructor(options = {}, config) {
        this.config = config;
        this.gola = config.gola;
        _.extend(this, options);
        this.collectionPath = options['collectionPath'] || fileUtils.absPath(gola, `collections/${this.name}/`);
        this._globOptions = { cwd: this.collectionPath, absolute: true };
        this.initPartials();
        this.initLayouts();
        this.initContent();
    }

    getGlobals(){
        return this._globals = this._globals || _.merge({}, this.config.getGlobals(), {
            collection: this 
        });
    }

    compile() {
        this.content.forEach((con) => {
            con.compile();
        });
    }
}

extendHelper.extendAll(Collection.prototype, glob.sync('ext/collection/**/*.js', { cwd: __dirname, absolute: true }));
module.exports = Collection;