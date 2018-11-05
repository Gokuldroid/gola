
const fileHandler = {
    fileChange(event, path) {
        console.log(event + path);
    }
}

module.exports = fileHandler;