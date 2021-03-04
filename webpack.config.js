const WebpackCopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const {description} = require('./package.json');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: description,
            template: path.resolve(__dirname, './assets/index.html')
        }),
        // new WebpackCopyPlugin({
        //     patterns: [
        //         {
        //             from: './assets/*.png',
        //             to: '[name].[ext]',
        //         }
        //     ]
        // })
    ]
}