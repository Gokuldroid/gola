const _ = require('lodash');
const glob = require('glob');

const Content = require('../../content');

const contentHandler = {
    initContent() {
        this.content = _.map(glob.sync('content/**/*.md', this._globOptions), (path) => {
            return new Content({ path: path }, this);
        });
    }
}

module.exports = contentHandler;