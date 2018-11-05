const express = require('express');
const serveStatic = require('serve-static');
const fileUtils = require('../core/file');
const _ = require('lodash');
const FileWatcher = require('./file-watcher');
class GloaServer {
    constructor(options = {}, gola) {
        this.gola = gola;
        _.extend(this, options);
    }

    serve() {
        this.watchFiles();
        let port = this.port || 4000;
        console.log(`Serving files from :: ${fileUtils.relPath(this.gola, '_site')} at http://localhost:${port}`);
        var app = express();
        app.use(serveStatic(fileUtils.relPath(this.gola, '_site'), { 'index': [this.index || 'index.html'] }))
        app.listen(port);
    }

    watchFiles() {
        this.file_watcher = new FileWatcher(this);
        this.file_watcher.on((event, path) => {
            this.gola.fileChange(event, path);
        })
    }
}

module.exports = GloaServer