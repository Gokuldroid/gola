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
        this.gola = collection.gola;
        this._md5sum = null;
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

    getGlobals(){
        return _.merge({}, this.collection.getGlobals(), {
            content: this
        });
    }

    initDefaults() {
        this.layout = this.layout || 'index';
        this.title = this.title || this.collection.gola.config.title;
    }

    get name() {
        let absPath = this.path.substring(this.path.indexOf('/content/') + 9);
        return absPath.substring(0, absPath.length - 3);
    }

    htmlabsPath() {
        return this.collection.name + "/" + this.name + ".html";
    }

    compile() {
        if (this.parseOptions()) {
            console.log("Compling file :" + this.name);
            this.initDefaults();
            this.writeHtmlToFile(this.layoutHandler().compile(this.getGlobals()));
        }
    }

    writeHtmlToFile(htmlContent) {
        let htmlPath = fileUtils.absPath(this.collection.gola, '_site/' + this.htmlabsPath());
        fileUtils.writeFile(htmlPath, htmlContent);
    }

    layoutHandler() {
        return this.collection.getLayout(this.layout);
    }
}

module.exports = Content;