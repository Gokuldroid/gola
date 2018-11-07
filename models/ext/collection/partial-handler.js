const _ = require('lodash');
const glob = require('glob');

const Partial = require('../../partial');

const partialHandler = {
    initPartials() {
        this.partials = _.map(glob.sync('partials/**/*.hbs', this._globOptions), (path) => {
            let partial = new Partial({ path: path }, this);
            this.registerForChange(path, partial);
            return partial;
        });
    }
}
module.exports = partialHandler;