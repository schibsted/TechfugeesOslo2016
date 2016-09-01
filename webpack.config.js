var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: __dirname + '/_assets/scripts/main.js',
    output: {
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-1']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js'],
        root: [path.resolve(__dirname, './_assets')]
    }
}
