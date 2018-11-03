const _ = require('lodash');
const fm = require('front-matter');
const fileUtils = require('../core/file');
const showdown  = require('showdown');
const converter = new showdown.Converter();
const handlebars = require('handlebars')


class Content {
    constructor(options, collection) {
        _.extend(this, options);
        this.collection = collection;
        this.parseOptions();
        this.compile();
    }

    parseOptions() {
        let markdownContent = fm(fileUtils.readFile(this.path));
        _.extend(this, markdownContent.attributes);
        this.body = new handlebars.SafeString(converter.makeHtml(markdownContent.body));
    }

    get name() {
        let relPath = this.path.substring(this.path.indexOf('/content/') + 9);
        return relPath.substring(0, relPath.length - 3);
    }

    htmlRelPath() {
        return this.collection.name + "/" + this.name + ".html";
    }

    compile() {
        return this.layoutHandler().compile(this);
    }

    layoutHandler() {
        return this.collection.getLayout(this.layout);
    }
}

module.exports = Content;