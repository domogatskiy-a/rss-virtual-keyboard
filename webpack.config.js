const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/assets/scripts/app.js',
    output: {
        //filename: '[hash].js',
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    mode: 'development',
    //mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'rss virtual keyboard',
            filename: 'index.html',
            template: 'src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devServer: {
        static: './dist',
    },
}

console.log(__dirname)
