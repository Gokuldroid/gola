var Config = require('./models/config')
var ToJson = require('./core/json')

class Gola {
    constructor(rootPath) {
        this.rootPath = rootPath
    }

    get config() {
        return this._config = this._config || new Config(this)
    }

    build(){
        this.config;
    }
}
module.exports = Gola