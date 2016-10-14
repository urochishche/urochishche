var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.debug.config');

var options = {
    publicPath: config.output.publicPath
};

new WebpackDevServer(webpack(config), options).listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});
