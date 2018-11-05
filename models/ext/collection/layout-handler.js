const _ = require('lodash');
const glob = require('glob');

const Layout = require('../../layout');

const layoutHandler = {
    _layoutNameCache: {},
    getLayout(name) {
        return this._layoutNameCache[name];
    },
    
    setLayout(layout){
        this._layoutNameCache[layout.name] = layout;
    },

    initLayouts() {
        this.layouts = _.map(glob.sync('layouts/**/*.html', this._globOptions), (path) => {
            let layout = new Layout({ path: path }, this);
            this.setLayout(layout);
            return layout;
        });
    }
}
module.exports = layoutHandler;