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
        test: /\.js$/,
        include: [
          /static-esm-module/,
        ],
        use: [
          {
            loader: 'inline-loader',
            options: {
              code: 'export default "virtual";',
              filename: 'sofake.reallyfake.js',
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    alias: {
      'inline-loader': require.resolve('../../src/'),
    },
  },
};
