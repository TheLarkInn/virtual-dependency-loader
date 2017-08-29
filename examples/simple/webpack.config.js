const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'example_dist'),
    filename: '[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.thisfile$/,
        use: [
          {
            loader: 'inline-loader',
            options: {
              code: 'console.log("hello world")u',
              filename: 'sofake.reallyfake.thisfile',
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    alias: {
      'inline-loader': require.resolve('../../dist/index.js'),
    },
  },
};
