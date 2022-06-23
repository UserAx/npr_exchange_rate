const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv').config({path: './config/dev.env'});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// if(process.env.NODE_ENV === 'development'){
//     require('dotenv').config({path: './config/dev.env'});
// }

module.exports = (env) => {
    //env is object that contains any value we pass
    //when running webpack --env isProduction

    const {isProduction} = env;
    //isProduction = true
    
    return {
        // entry:['babel-polyfill', './src/index.js'],
        entry: './src/index.tsx',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
            // filename: '[name].bundle.js',
            // chunkFilename: '[name].bundle.js'
        },
        // optimization: {
        //     splitChunks: {
        //         chunks: 'all',
        //     },
        // },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            fallback: { path: false, fs: false },
            alias: {
              // helps to import files from assets folder using ~assets/image on css files.
              // this gives me a absolute path to my image file.
              assets: path.resolve(__dirname, 'src/assets'),
            },
          },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // resolve: {
                //     extensions: [".js", ".jsx"]
                //   },
            },
            {
                //For webpack to process typescript file
                test: /\.(ts|tsx)$/,  
                exclude: /node_modules/,
                use: ["ts-loader"], 
                // resolve: {
                //     extensions: [".ts", ".tsx"]
                //   },
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }]
            },
            {
                test: /\.(pdf|jpg|png|svg)/,
                type: 'asset/resource',
              },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles_bundle.css',
                // chunkFilename: "styles/[id].css"
            }),

            //For webpack loading baseurl values 
            //from our environment dev file or env values while deploying.

            new webpack.DefinePlugin({
                'process.env.APIURL': JSON.stringify(process.env.APIURL),
                'process.env.APIKEY': JSON.stringify(process.env.APIKEY), 
            })
            //here, first one is the name given to the value. 
            //Second is the converting the value taken from the dev.env file to string and assigning it to the first.
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            // contentBase: path.join(__dirname, 'public'),

            //For redirect to / on 404.
            historyApiFallback: true,

            static: {
                directory: path.join(__dirname, 'public'),

                //our baseurl to which we want to serve our bundle:
                // publicPath: '/dist/',

                // publicPath: '/',
            },
            // compress: true,
            // devMiddleware: {
            //     index: true,
            //     publicPath: '/dist/',
            //     writeToDisk: true,
            //   },
            // port: 3000,
        },
        mode: isProduction ? "production" : "development",
    }
}