const _ = require('lodash');
const handlebars = require('handlebars');
const fileUtils = require('../core/file');

class Layout {
    constructor(options = {}, collection) {
        _.extend(this, options);
        this.collection = collection;
        this.gola = collection.gola;
    }

    get name() {
        return this.path.substring(this.path.indexOf('/layouts/') + 9, this.path.length - 5);
    }

    get layout() {
        return this._layout = this._layout || handlebars.compile(fileUtils.readFile(this.path));
    }

    compile(options) {
        return this.layout(options);
    }
}

module.exports = Layout;