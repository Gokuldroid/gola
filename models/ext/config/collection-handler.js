const _ = require('lodash');
const Collection = require('../../collection');

const collectionHandler = {
    initCollections() {
        let collections = this.collections;
        this.collections = _.map(collections, (itr) => { return new Collection(itr, this) });
    }
}

module.exports = collectionHandler;