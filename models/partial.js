const handlebars = require('handlebars');
const _ = require('lodash');
const fileUtils = require('../core/file');

class Partial {
    constructor(options, collection) {
        _.extend(this, options);
        this.collection = collection;
        this.gloa = collection.gloa;
        this.compile();
    }

    get name() {
        let absPath = this.path.substring(this.path.indexOf('/partials/') + 1);
        return absPath.substring(0, absPath.length - 4);
    }

    compile() {
        handlebars.registerPartial(this.name, fileUtils.readFile(this.path));
    }
}

module.exports = Partial