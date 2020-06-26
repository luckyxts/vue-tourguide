/**
 * Created by Administrator on 2020/6/21.
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'tourguide.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            // vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    sourceMap: true,
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loaders: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: "[name].[ext]",
                            esModule: false,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            '@': resolve('src')
        }
    }
}