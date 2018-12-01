const _ = require('lodash');

const fileHandler = {
    _filesObservers: {},
    fileChange(event, file) {
        _.each(this._filesObservers[file],function(observer) {
           observer.compile(); 
        });
    },

    registerForChange(file,observer) {
        this._filesObservers[file] = this._filesObservers[file] || [];
        this._filesObservers[file].push(observer);
    }
}

module.exports = fileHandler;