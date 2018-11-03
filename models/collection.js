const _ = require('lodash');
const fileUtils = require('../core/file');
const Partial = require('../models/partial');
const Layout = require('../models/layout');
const Content = require('../models/content');
const glob = require('glob');

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

    initPartials() {
        this.partials = _.map(glob.sync('partials/**/*.hbs', this._globOptions), (path) => {
            return new Partial({ path: path }, this);
        });
    }

    initLayouts() {
        this.layouts = _.map(glob.sync('layouts/**/*.html', this._globOptions), (path) => {
            let layout = new Layout({ path: path }, this);
            this._layoutNameCache[layout.name] = layout;
            return layout;
        });
    }

    initContent() {
        this.content = _.map(glob.sync('content/**/*.md', this._globOptions), (path) => {
            return new Content({ path: path }, this);
        });
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

module.exports = Collection;