const fs = require('fs');
const fileUtils = require('../core/file');
const _ = require('lodash');
const ToJson = require('../core/json');
const Collection = require('../models/collection');


class Config {
    constructor(gola) {
        this.gola = gola;
        _.extend(this, fileUtils.readJson(fileUtils.relPath(gola, 'config.json')));
        this.initCollections();
    }

    initCollections() {
        let collections = this.collections;
        this.collections = _.map(collections, (itr) => { return new Collection(itr, this.gola) });
    }

    fileChange(event, file) {
        //TODO : Optimize this;
        this.compile();
    }

    compile() {
        this.collections.forEach(collection => {
            collection.compile();
        });
    }
}

module.exports = Config;