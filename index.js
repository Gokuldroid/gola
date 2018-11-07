var Config = require('./models/config')
var ToJson = require('./core/json')

class Gola {
    constructor(rootPath) {
        this.rootPath = rootPath
    }

    get config() {
        return this._config = this._config || new Config(this)
    }

    getGlobals(){
        return {};
    }

    fileChange(event, file) {
        this.config.fileChange(event,file);
    }

    build() {
        this.config;
    }
}
module.exports = Gola