const _ = require('lodash');
const glob = require('glob');

const Content = require('../../content');

const contentHandler = {
    initContent() {
        this.content = _.map(glob.sync('content/**/*.md', this._globOptions), (path) => {
            let content = new Content({ path: path }, this);
            this.registerForChange(path, content);
            return content;
        });
    }
}

module.exports = contentHandler;