require('dotenv').config();
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4444;

const publicPath = NODE_ENV === 'development' ? `http://${host}:${port}/build/` : '/build/';

module.exports = {
    devtool: NODE_ENV === 'development' ? 'inline-source-map' : undefined,

    context: path.join(__dirname, 'src'),

    entry: {
        app: (NODE_ENV === 'development' ? [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://${host}:${port}`
        ] : []).concat([
            'babel-polyfill',
            './index'
        ])
    },

    output: {
        path: path.join(__dirname, NODE_ENV === 'development' ? './build' : './public/build'),
        publicPath,
        filename: NODE_ENV === 'development' ? '[name].js?hash=[hash]' : '[name].js',
        chunkFilename: NODE_ENV === 'development' ? '[name].js?hash=[chunkhash]' : '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /\/node_modules\//,
                use: (NODE_ENV === 'development' ? [
                    'react-hot-loader/webpack'
                ] : []).concat('babel-loader')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [
                                    path.resolve(__dirname, './src/assets')
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /.(png|jpg|gif|woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
                include: /\/node_modules\//,
                loader: 'file-loader?name=[1].[ext]?hash=[hash:6]&regExp=node_modules/(.*)'
            },
            {
                test: /.(png|jpg|gif|woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
                exclude: /\/node_modules\//,
                loader: 'file-loader?name=[path][name].[ext]?hash=[hash:6]'
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true // true outputs JSX tags
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: [
            '.js', '.jsx', '.json', '.html', '.scss', '.sass', '.css',
            'woff', 'woff2', 'eot', 'ttf', 'svg', 'png', 'jpg', 'gif'
        ],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@':   path.resolve(__dirname, 'src')
        },
        modules: ['node_modules']
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        //new webpack.IgnorePlugin(/moment\/min\/locales/),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: NODE_ENV === 'development',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                __CLIENT__: JSON.stringify(true),
                __DEVTOOLS__: JSON.stringify(true),
                NODE_ENV: JSON.stringify(NODE_ENV),
                API_URI: JSON.stringify(process.env.API_URI)
            }
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['ru']
        }),
        ...(NODE_ENV === 'development' ? [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
        ] : [])
    ],

    devServer: {
        proxy: {
            '/**': {
                target: '/index.html',
                secure: false,
                bypass: (req, res, opt) => '/index.html'
            }
        },
        contentBase: path.join(__dirname, 'public'),
        lazy: false,
        quiet: false,
        noInfo: false,
        inline: true,
        hot: true,
        stats: { colors: true },
        headers: { 'Access-Control-Allow-Origin': '*' },
        port,
        publicPath
    }
};
