require('babel-core/register')
require('babel-polyfill')
require('css-modules-require-hook')({ extensions: ['.scss'] })
require('./server')
