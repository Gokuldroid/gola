const _ = require('lodash');
const glob = require('glob');

const fileUtils = require('../core/file');
const extendHelper = require('../core/ext-helper');

class Collection {
    constructor(options = {}, gola) {
        this.gola = gola;
        _.extend(this, options);
        this.collectionPath = options['collectionPath'] || fileUtils.relPath(gola, `collections/${this.name}/`);
        this._globOptions = { cwd: this.collectionPath, absolute: true };
        this.initPartials();
        this.initLayouts();
        this.initContent();
    }

    compile() {
        this.content.forEach((con) => {
            con.compile();
        });
    }
}

extendHelper.extendAll(Collection.prototype, glob.sync('ext/collection/**/*.js', { cwd: __dirname, absolute: true }));
module.exports = Collection;