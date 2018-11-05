
const fileHandler = {
    _filesObserver: {},
    fileChange(event, file) {
        this._filesObserver[file] && this._filesObserver[file].compile();
    },

    registerForChange(file,observer) {
        this._filesObserver[file] = observer;
    }
}

module.exports = fileHandler;