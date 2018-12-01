const _ = require('lodash');

const fileHandler = {
    _filesObservers: {},
    fileChange(event, file) {
        _.each(this._filesObservers[file],function(observer) {
           observer.compile(); 
        });
    },

    registerForChange(file,observer) {
        this._filesObserver[file] = this._filesObserver[file] || [];
        this._filesObserver[file].push(observer);
    }
}

module.exports = fileHandler;