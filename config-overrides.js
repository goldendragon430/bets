const webpack = require('webpack');
module.exports = function override(config, env) {
  return { ...config, ignoreWarnings: [/Failed to parse source map/] };
};
