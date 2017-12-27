const webpack = require('webpack');
const path = require('path');
const outputPath = path.resolve(__dirname, './dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = {
    entry: {
        app: [
            path.resolve(__dirname, './src/index.js')
        ]
    },
    output: {
        path: outputPath,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './assets/index.html'),
            filename: 'index.html',
            path: outputPath
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
const devServer = {
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 8080,
        historyApiFallback: true,
        inline: true,
        hot: true,
    }
};
module.exports = function(env) {
    if (env ==='development') {
        return {...common, ...devServer}
    }
    if (env ==='production') {
        return {...common}
    }
}