/*
 * @Author: ZHW
 * @LastEditors: ZHW
 * @Description:
 * @Date: 2019-04-21 21:54:34
 * @LastEditTime: 2019-04-23 22:41:34
 */

let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let webpack = require("webpack");
let CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        home: "./src/index.js",
        other: "./src/a.js"
    },
    output: {
        filename: "main.[hash:8].js",
        path: path.resolve(__dirname, "dist")
    },

    module: {
        noParse: /jquery|echarts|vue|axios/,
        // loader 特点 : 功能单一，可以组合使用，需要主义顺序 右==>左 下==>上
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            minify: {
                // removeAttributeQuotes: true
            },
            hash: true
        })
    ],
    devServer: {
        port: 9009,
        proxy: {
            '/api': {
                target: 'http://localhost:5005',
                pathRewrite: {'^/api' : ''}
              }
        }
    }
};
