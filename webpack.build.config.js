const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode:'production',
    devtool:'source-map',
    entry:'./index.js',
    output:{
        path:path.resolve(__dirname,'bundle'),
        filename:'[name].js'
    }
}