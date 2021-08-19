const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");

const { resolve } = require("path");

module.exports = {
    target:"web",
    mode: "development",
    entry:"./src/index.jsx",
    plugins: [
        new MiniCssExtractPlugin()
    ],
    // externals: [nodeExternals()],
    output: {
        filename: 'index.js',
        path: resolve(__dirname, "bin")
    },
    node: {
        __dirname: false
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        // "plugins":[
                            // "@babel/transform-runtime"
                        // ],
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ]
    },
    devServer: {

        static: resolve(__dirname, "public"),
        port: 7777
        
    }
};