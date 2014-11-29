var path = require('path');

var jsx = { main: './js/main.jsx' }

module.exports = {
  entry: jsx,

  output: {
    filename: '[name].jsx',
    chunkFilename: '[id].chunk.js',
    path: path.join(__dirname, 'build'),
    publicPath: '../build/'
  },

  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader'}
    ]
  }
};
