// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");

const { resolve } = require("path");

module.exports = {
    target:"web",
    mode: "development",
    entry:"./src/index.jsx",
    plugins: [
        // new MiniCssExtractPlugin()
    ],
    output: {
        filename: 'index.js',
        path: resolve(__dirname, "bin")
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
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.yaml$/,
                use: 'js-yaml-loader',
            }
        ]
    },
    devServer: {

        static: resolve(__dirname, "public"),
        port: 7777
        
    }
};