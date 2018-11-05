const _ = require('lodash');
const fm = require('front-matter');
const md5 = require('md5');

const fileUtils = require('../core/file');
const showdown = require('showdown');
const converter = new showdown.Converter();
const handlebars = require('handlebars')


class Content {
    constructor(options, collection) {
        _.extend(this, options);
        this.collection = collection;
        this._md5sum = null;
        this.compile();
    }

    parseOptions() {
        let fileContent = fileUtils.readFile(this.path);
        let markdownContent = fm(fileContent);
        let newmd5sum = md5(fileContent);
        if (newmd5sum != this._md5sum) {
            _.extend(this, markdownContent.attributes);
            this.body = new handlebars.SafeString(converter.makeHtml(markdownContent.body));
            this._md5sum = newmd5sum;
            return true;
        }
        return false;
    }

    initDefaults() {
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
        if (this.parseOptions()) {
            console.log("Compling file :" + this.name);
            this.initDefaults();
            this.writeHtmlToFile(this.layoutHandler().compile(this));
        }
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