/**
 * Webpack configuration file.
 */

module.exports = {
    entry: [
        './src/index.jsx'
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        disableHostCheck: true
    },
    output: {
        path: __dirname,
        filename: 'public/js/main.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    }
}
