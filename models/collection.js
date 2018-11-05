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
        this._layoutNameCache = {};
        this.initPartials();
        this.initLayouts();
        this.initContent();
    }

    compile() {
        this.content.forEach((con) => {
            this.writeHtmlToFile(con);
        });
    }

    writeHtmlToFile(content) {
        let htmlContent = content.compile();
        let htmlPath = fileUtils.relPath(this.gola, '_site/' + content.htmlRelPath());
        fileUtils.writeFile(htmlPath, htmlContent);
    }

    getLayout(name) {
        return this._layoutNameCache[name];
    }
}

extendHelper.extendAll(Collection.prototype, glob.sync('ext/collection/**/*.js', { cwd: __dirname, absolute: true }));
module.exports = Collection;