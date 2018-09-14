const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = (env) => {
    const isProduction = env === 'production';
    return {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname,'public'),
        filename: 'bundle.js'
    },
    module: {
        rules:[{
            loader:'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer:{
        contentBase: path.join(__dirname,'public'),
        historyApiFallback: true,
        publicPath: '/public/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'public/index.html'
        })
      ]

}};