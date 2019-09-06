const webpack = require('webpack');
const path = require('path');
const cssnano = require("cssnano");
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const AUTOPREFIXER_BROWSERS = [
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];

module.exports = {
    entry: {
       'bitcoin': './src/bitcoin.js',
       'kiwi': './src/kiwi.js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'vender',
      }
    },
    output: {
       filename: '[name].[contenthash].js',
       path: path.resolve(__dirname, 'dist'),
       publicPath: '',
    },
    mode: 'production',
    module: {
       rules: [
         {
           test: /\.(jpe?g|png)$/,
           use: [
             {
               loader: 'file-loader'
             },
             {
               loader: 'image-webpack-loader',
               options: {
                 mozjpeg: {
                   progressive: true,
                   quality: 35
                 },
                 optipng: {
                   optimizationLevel: 3,
                 },
                 pngquant: {
                   quality: '65-90',
                   speed: 4
                 },
                 gifsicle: {
                   interlaced: false,
                 }
               }
             },
           ]
         },
         {
           test: /\.css$/,
           use: [
              MiniCssExtractPlugin.loader,
             'css-loader'
           ]
         },
         {
           test: /\.scss$/,
           use: [ MiniCssExtractPlugin.loader,'css-loader',
           {
             loader: 'postcss-loader',
             options: {
               ident: 'postcss',
               plugins: (loader) => [
                 cssnano(),
                 autoprefixer({
                   browsers: AUTOPREFIXER_BROWSERS
                 })
               ]
             }
           }, 'sass-loader']
         },
         {
           test: /\.js/,
           exclude: /node-modules/,
           use: [
             {
               loader: 'babel-loader',
               options: {
                 presets: ['@babel/preset-env'],
                 plugins: ['transform-class-properties'],
               },
             }
           ]
         }
       ],
    },
    plugins: [
       new TerserPlugin({}),
       new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
       }),
       new OptimizeCSSAssetsPlugin({
          cssProcessor: cssnano,
          cssProcessorOptions: {
            discardComments: {
              removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
          },
          canPrint: true,
      }),
      new HtmlWebpackPlugin({
          chunks: ['vender', 'vendors~hello-word~kiwi','kiwi'],
          filename: './index.html',
          template: './index.html',
          inject: true,
          hash: false,
          title: 'kiwi',
      }),
      new HtmlWebpackPlugin({
          chunks: ['vender', 'vendors~hello-word~kiwi','hello-word'],
          filename: './hello-word.html',
          template: './index.html',
          inject: true,
          hash: false,
          title: 'hello word',
      }),
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin(),
    ],
}
