const chokidar = require('chokidar');
const fileUtils = require('../core/file');

class FileWatcher {
  constructor(golaServer) {
    this.golaServer = golaServer;
    this._is_watching = false;
  }

  watch() {
    if(this._is_watching) return;
    this._is_watching = true;
    console.log('Watching files : ' + this.golaServer.gola.rootPath);
    this.watcher = chokidar.watch('.', {
      ignored: /(((^|[\/\\])\..)|((^|[\/\\])_site))/,
      persistent: true,
      depth: 30,
      cwd: this.golaServer.gola.rootPath
    });
  }

  on(listener,event = 'all'){
    this.watch();
    this.watcher.on(event, (event, path) => {
      listener(event, fileUtils.relPath(this.golaServer.gola, path));
    });
  }
}

module.exports = FileWatcher;