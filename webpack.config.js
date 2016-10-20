'use strict';

var path = require ('path');
var webpack = require ('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    context: path.join(__dirname, '/'),

    entry: {
        urochishche: './src/index.js'
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ngAnnotatePlugin({
            add: true
        }),
        new ExtractTextPlugin('urochishche.css'),
        new HtmlWebPackPlugin({
            favicon: './src/content/ico/favicon.ico',
            template: './src/index.html'
        })
    ],

    resolve: {
        root: __dirname,
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
        alias: {
            components: 'src/components'
        }
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    postcss: function() {
        return [
            autoprefixer({
                browsers: ['last 3 versions']
            })
        ];
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.html/, 
                loader: 'html'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css?minimize&sourceMap!postcss!less?sourceMap')
            },
            {
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract('css?minimize&sourceMap!postcss')
            }
        ]
    },

    noParse: [
        /\/node_modules\/(angular|bootstrap|jquery|font-awesome)/
    ]
};

