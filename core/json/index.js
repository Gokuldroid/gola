const _ = require('lodash')

exports.toJson = function (object) {
    const jsonObj = Object.assign({}, object);
    const proto = Object.getPrototypeOf(object);
    for (const key of Object.getOwnPropertyNames(proto)) {
        const desc = Object.getOwnPropertyDescriptor(proto, key);
        const hasGetter = desc && typeof desc.get === 'function';
        if (hasGetter) {
            jsonObj[key] = object[key];
        }
    }
    return _.omit(jsonObj, ['gola'])
}