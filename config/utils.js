'use strict';

module.exports = exports = {
  require_safe: require_safe
}

function require_safe(modulePath) {
  try {
    return require(modulePath)
  } catch(e) {
    return null;
  };
}
