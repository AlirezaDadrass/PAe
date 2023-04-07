const webpack = require("webpack");
const monacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = function override(config, env) {
  config.optimization = {
    chunkIds: false,
    concatenateModules: true,
    splitChunks: false,
  };
  config.devtool = false;
  config.plugins.push(
    new webpack.ids.DeterministicChunkIdsPlugin({
      maxLength: 5,
    })
  );
  config.plugins.push(
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000000, // Minimum number of characters
    })
  );
  config.plugins.push(
    new monacoWebpackPlugin()
  );

  return config;
};
