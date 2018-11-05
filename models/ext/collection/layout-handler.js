const _ = require('lodash');
const glob = require('glob');

const Layout = require('../../layout');

const layoutHandler = {
    initLayouts() {
        this.layouts = _.map(glob.sync('layouts/**/*.html', this._globOptions), (path) => {
            let layout = new Layout({ path: path }, this);
            this._layoutNameCache[layout.name] = layout;
            return layout;
        });
    }
}
module.exports = layoutHandler;