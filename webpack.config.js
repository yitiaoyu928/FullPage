const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugins = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    entry:'./index.js',
    output:{
        path:path.resolve(__dirname,'/bundle'),
        filename:'[name].js'
    },
    plugins:[
        new HtmlWebpackPlugins({
            template:path.resolve(__dirname,"index.html")
        }),
       new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        open:true,
        hot:true,
        port:2222,
        contentBase:'./'
    }
}