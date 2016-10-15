'use strict';

var path = require ('path');
var extend = require('extend');
var webpack = require ('webpack');
var config = require('./webpack.config.js');

config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            drop_console: true,
            unsafe: true
        }
    })
);

config.module.loaders.unshift({
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ['ng-annotate']
});

module.exports = extend({}, config, {
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath:  './',
        filename: 'bundle.js'
    },

    htmlLoader: {
        minimize: true
    }
});
