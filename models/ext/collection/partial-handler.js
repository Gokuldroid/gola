const _ = require('lodash');
const glob = require('glob');

const Partial = require('../../partial');

const partialHandler = {
    initPartials() {
        this.partials = _.map(glob.sync('partials/**/*.hbs', this._globOptions), (path) => {
            return new Partial({ path: path }, this);
        });
    }
}
module.exports = partialHandler;