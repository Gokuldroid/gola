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
        this.compile();
    }

    parseOptions() {
        let markdownContent = fm(fileUtils.readFile(this.path));
        _.extend(this, markdownContent.attributes);
        this.body = new handlebars.SafeString(converter.makeHtml(markdownContent.body));
    }

    initDefaults(){
        this.layout = this.layout || 'index';
        this.title = this.title || this.collection.gola.title;
    }

    get name() {
        let relPath = this.path.substring(this.path.indexOf('/content/') + 9);
        return relPath.substring(0, relPath.length - 3);
    }

    htmlRelPath() {
        return this.collection.name + "/" + this.name + ".html";
    }

    compile() {
        this.parseOptions();
        this.initDefaults();
        this.writeHtmlToFile(this.layoutHandler().compile(this));
    }

    writeHtmlToFile(htmlContent) {
        let htmlPath = fileUtils.relPath(this.collection.gola, '_site/' + this.htmlRelPath());
        fileUtils.writeFile(htmlPath, htmlContent);
    }

    layoutHandler() {
        return this.collection.getLayout(this.layout);
    }
}

module.exports = Content;