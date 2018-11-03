const handlebars = require('handlebars');
const _ = require('lodash');
const fileUtils = require('../core/file');

class Partial {
    constructor(options, collection) {
        _.extend(this, options);
        this.collection = collection;
        this.registerPartial();
    }

    get name() {
        let relPath = this.path.substring(this.path.indexOf('/partials/') + 1);
        return relPath.substring(0, relPath.length - 4);
    }

    registerPartial() {
        handlebars.registerPartial(this.name, fileUtils.readFile(this.path));
    }
}

module.exports = Partial